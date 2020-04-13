package com.sizaif.emsdemo.TestController;

import com.sizaif.emsdemo.dto.PermissionVO;
import com.sizaif.emsdemo.mapper.MemberMapper;
import com.sizaif.emsdemo.mapper.UserMapper;
import com.sizaif.emsdemo.pojo.Member;
import com.sizaif.emsdemo.pojo.Users;
import com.sizaif.emsdemo.service.AuthService;
import com.sizaif.emsdemo.service.MemberService;
import com.sizaif.emsdemo.service.UsersService;
import com.sizaif.emsdemo.utils.DateUtils;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.Date;
import java.util.HashMap;
import java.util.List;


@SpringBootTest
public class TestUserMapper {

    @Autowired
    private UsersService usersService;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private MemberMapper memberMapper;
    @Autowired
    private MemberService memberService;

    @Autowired
    private AuthService authService;
    @Autowired
    private WebApplicationContext wac;

    private MockMvc mockMvc;



    @Test
    public void Test3(){

        List<PermissionVO> permissionVOList = authService.findPerms();
        for (PermissionVO permissionVO : permissionVOList) {
            System.out.println(permissionVO.toString());
        }
    }

    @Test
    public void Test2() throws Exception{

//        HashMap<String,Object> hashMap = new HashMap<>();
//        hashMap.put("userName","root");
//        Users users = usersService.queryUserByName(hashMap);
//        System.out.println(users.toString());
        Member member = userMapper.queryOneUserMemberById(1);
        System.out.println(member.toString());
    }
    @Test
    public void Test() throws Exception {


        HashMap<String, Object> hashMap = new HashMap<>();
//        createDate, modifyDate, isEnabled, isLocked, lastLoginDate, lastLoginIp, lockDate, name, encodePassword
        Users users = new Users();

        users.setCreateDate(new DateUtils().DatetoString(new Date()));
        users.setModifyDate(new DateUtils().DatetoString(new Date()));
        users.setIsEnabled(1);
        users.setIsLocked(0);
        users.setLastLoginDate(new DateUtils().DatetoString(new Date()));
        users.setLockDate(new DateUtils().DatetoString(new Date()));
        users.setLastLogIp("null");
        users.setName("test07");
        users.setPassword("test");
        hashMap.put("createDate",users.getCreateDate());
        hashMap.put("modifyDate",users.getModifyDate());
        hashMap.put("isEnabled","1");
        hashMap.put("isLocked","0");
        hashMap.put("lastLoginDate",new DateUtils().DatetoString(new Date()));
        hashMap.put("lastLoginIp","127.0.0.1");
        hashMap.put("lockDate",new DateUtils().DatetoString(new Date()));
        hashMap.put("name",users.getName());
        hashMap.put("encodePassword",users.getPassword());

//        userMapper.addUser(hashMap);
//
//        System.out.println(users.getId());
//        System.out.println(hashMap.get("id").toString());
//        int id = Integer.parseInt(hashMap.get("id").toString());
        Member member2 = new Member(5,1,"china",new DateUtils().DatetoString(new Date()),"test2@test.com",0,"1234567891","徐文昌","烟台大学","null");
//        memberService.AddOneMember(member2);
        List<Member> members2 = memberService.QueryAllMemberInfo();
        for (Member member : members2) {
            System.out.println(member.toString());
        }
        List<Member> members = usersService.queryAllUserMemberList();
        for (Member user : members) {
            System.out.println(user.toString());
        }
        
    }
}
