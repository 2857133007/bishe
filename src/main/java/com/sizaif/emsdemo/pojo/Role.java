package com.sizaif.emsdemo.pojo;

import java.util.Date;

public class Role {
    private Integer id;

    private String roleName;

    private String descpt;

    private String code;

    private Integer insertUid;

    private String insertTime;

    private String updateTime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName == null ? null : roleName.trim();
    }

    public String getDescpt() {
        return descpt;
    }

    public void setDescpt(String descpt) {
        this.descpt = descpt == null ? null : descpt.trim();
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code == null ? null : code.trim();
    }

    public Integer getInsertUid() {
        return insertUid;
    }

    public void setInsertUid(Integer insertUid) {
        this.insertUid = insertUid;
    }

    public String getInsertTime() {
        return insertTime;
    }

    public void setInsertTime(String insertTime) {
        this.insertTime = insertTime;
    }

    public String getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(String updateTime) {
        this.updateTime = updateTime;
    }

    @Override public String toString() {
        return "Role{" + "id=" + id + ", roleName='" + roleName + '\''
                + ", descpt='" + descpt + '\'' + ", code='" + code + '\''
                + ", insertUid=" + insertUid + ", insertTime=" + insertTime
                + ", updateTime=" + updateTime + '}';
    }
}