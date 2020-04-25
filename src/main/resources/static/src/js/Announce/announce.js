$(function(){
    layui.use(['layer','form','laydate'], function(){
        var layer = layui.layer;
        var form  = layui.form;
        var laydate = layui.laydate;





        //监听提交
        form.on('submit(ContestSumbit)', function(data){

            layer.confirm('确定提交么？', {
                btn: ['确认','返回'] //按钮
            },function(){
                // layer.closeAll();//关闭所有弹框
                console.log("data--"+data);
                formSubmit(data);
            },function() {
                layer.closeAll();
            });
            return false;
        });


        form.render();
    });
});


//提交数据
function formSubmit(obj) {

    if(checkRole()){
        if($("#flag").val() == "update"){
            // console.log($("#UserForm").serialize());
            $.ajax({
                type: "POST",
                data: $("#UserForm").serialize(),
                url: "/users/updateUMRInfo",
                success: function (data) {
                    if (data == "200") {
                        layer.alert("操作成功",function(){
                            layer.closeAll();
                            // load();
                        });
                    } else {
                        layer.alert("SSSS");
                    }
                },
                error: function (data) {
                    layer.alert("操作请求错误，请您联系技术人员");
                }
            });
        }else if($("#flag").val() == "add"){
            console.log($("#UserForm").serialize());
            $.ajax({
                type: "POST",
                data: $("#UserForm").serialize(),
                url: "/users/addUMRInfo",
                success: function (data) {
                    console.log(data);
                    if (data == "200") {
                        layer.alert("添加成功!", function () {
                            layer.closeAll();
                        });
                    } else if(data == "100"){
                        layer.alert("账户已存在,请重试", function () {
                            layer.closeAll();
                        });
                    }
                    else if(data == "101"){
                        layer.alert("邮箱已存在,请重试", function () {
                            layer.closeAll();
                        });
                    }
                },
                error: function (data) {
                    layer.alert("操作请求错误，请您联系技术人员");
                }
            });
        }
    }

}
// 切换是否启用
function switchEnable(id,name,flag) {

    var isEnabled = flag;
    console.log(isEnabled);
    var state = isEnabled == true ? "启用":"未启用";
    layer.confirm('您确定要把用户：<font style=\'font-weight:bold;\' color=\'blue\'>'+name+'</font>设置为 <font style=\'font-weight:bold;\' color=\'red\'>'+state+'</font> 状态吗？', {
        btn: ['确认','返回'] //按钮
    }, function(){
        $.post("/users/setEnabled",{"id":id,"isEnabled":isEnabled},function(data){

            if(data=="200"){
                //回调弹框
                layer.alert("操作成功！",function(){
                    layer.closeAll();
                    //加载load方法
                    parent.location.reload();
                });
            }else{
                layer.alert(data,function(){
                    layer.closeAll();
                    //加载load方法
                    parent.location.reload();
                });
            }

        });
    }, function(){
        layer.closeAll();
        //加载load方法
        parent.location.reload();
    });

}

// 修改
function edit(obj) {

    console.log(obj);
    var isLocked = obj.users.locked;
    if(isLocked){
        layer.msg("该用户已经被锁定，不可进行编辑；</br>  如需编辑，请设置为<font style='font-weight:bold;' color='green'>未锁定</font>状态。", {icon: 2});
    }else{

        $("#id2").val(obj.users.id==null?'':obj.users.id);
        $("#id").val(obj.users.id==null?'':obj.users.id);
        $("#truename").val(obj.truename==null?'':obj.truename);
        $("#school").val(obj.school==null?'':obj.school);
        $("#mobile").val(obj.users.mobile==null?'':obj.users.mobile);
        $("#email").val(obj.email==null?'':obj.email);
        $("#email2").val(obj.email==null?'':obj.email);
        $("#telephone").val(obj.phone==null?'':obj.phone);
        $("#address").val(obj.address==null?'':obj.address);
        $("#username").val(obj.users.name==null?'':obj.users.name);

        $("#flag").val("update");

        // start 初始化 全部角色信息 全部角色信息 显示角色数据
        var existRole='';
        if(obj.users.userRoles !=null ){
            existRole+=obj.users.userRoles.roleId+',';
            // console.log("item.roleid->"+existRole);

        }
        // console.log("existRole->" +existRole);
        $("#roleDiv").empty();
        $.get("/auth/getRoles",function(data){
            // console.log(data);

            var jsonobj= eval('(' + data + ')');
            $.each(jsonobj,function (index, item) {

                var div=$("<option  name='roleId' value="+item.id+" title="+item.descpt+">"+
                    "<span>"+item.descpt+"</span>"+
                    "</option>");
                if(existRole!='' && existRole.indexOf(item.id)>=0){

                    div=$("<option   name='roleId' value="+item.id+" title="+item.descpt+" selected >"+
                        "<span>"+item.descpt+"</span>"+
                        "</option>");
                }
                $("#roleDiv").append(div);
            });

            // start 初始化 性别
            if(obj.gender == 0){
                // console.log(obj.gender);
                $("#men").removeAttr("checked");
                $("#women").attr("checked","checked");
            }
            layui.form.render('radio');
            // end 初始化 性别

            layui.form.render('select');
        });
        // end 初始化 全部角色信息

        // start  初始化 出生日期 弹窗
        layui.use(['laydate','layer'], function(){
            var laydate = layui.laydate;
            var layer =layui.layer;
            laydate.render({
                elem: '#birth',
                type: 'datetime',
                value:obj.birth
            });
            layer.open({
                type:1,
                title: "编辑用户详细信息",
                fixed:false,
                resize :false,
                offset:'auto',
                shadeClose: true,
                btn: '关闭',
                area: ['600px', '720px'],
                content:$('#eidtUser'),
                end: function(){
                    location.reload();
                }
            });
        });
        // end  初始化 出生日期 弹窗

    }
}

// 添加
function add(obj) {

    $("#flag").val("add");
    $("#id").remove();
    var existRole='';
    // start 全部角色信息 显示角色数据
    $("#roleDiv").empty();

    $.get("/auth/getRoles",function(data){
        console.log(data);

        var jsonobj= eval('(' + data + ')');
        $.each(jsonobj,function (index, item) {

            var div=$("<option  name='roleId' value="+item.id+" title="+item.descpt+">"+
                "<span>"+item.descpt+"</span>"+
                "</option>");
            if(existRole!='' && existRole.indexOf(item.id)>=0){

                div=$("<option   name='roleId' value="+item.id+" title="+item.descpt+" selected >"+
                    "<span>"+item.descpt+"</span>"+
                    "</option>");
            }
            $("#roleDiv").append(div);
        });
        layui.form.render('select');
    });
    // end 全部角色信息 显示角色数据

    // start 初始化出生日期 和弹窗
    layui.use(['laydate','layer'], function(){
        var laydate = layui.laydate;
        var layer =layui.layer;
        laydate.render({
            elem: '#birth'
            ,type: 'datetime'
        });
        layer.open({
            type:1,
            title: "添加一个用户以及信息",
            fixed:false,
            resize :false,
            offset:'auto',
            shadeClose: true,
            btn: '关闭',
            area: ['600px', '740px'],
            content:$('#eidtUser'),
            end: function(){
                location.reload();
            }
        });
    });
    // end 初始化出生日期 和弹窗

}

// 删除

function del(id,name) {
    if(null!=id){
        layer.confirm('您确定要 <font style=\'font-weight:bold;\' color=\'red\'>删除: </font><font style=\'font-weight:bold;\' color=\'blue\'>'+name+'</font> 用户么?', {
            btn: ['确认','返回'] //按钮
        },  function(){
            $.get("/users/toDeleteUser",{"id":id},function(data){
                console.log(data)
                if(data == "200"){
                    //回调弹框
                    layer.alert("删除成功！",function(){
                        layer.closeAll();
                        window.location.reload();
                        //加载load方法
                        // load();//自定义
                    });
                }else{
                    layer.alert(data);//弹出错误提示
                }
            });
        }, function(){
            layer.closeAll();
        });
    }
}