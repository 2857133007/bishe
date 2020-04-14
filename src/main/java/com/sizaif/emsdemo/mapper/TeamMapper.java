package com.sizaif.emsdemo.mapper;


import com.sizaif.emsdemo.dto.TeamVO;
import com.sizaif.emsdemo.pojo.Team;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface TeamMapper {

    int deleteByPrimaryKey(Integer id);

    int insert(Team record);

    int insertSelective(Team record);

    Team selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Team record);

    int updateByPrimaryKey(Team record);

    /**
     *  查询所有队伍列表
     * @return
     */
    List<Team> getAllTeam();


    /**
     *  通过teamid 查找所有队员信息
     * @param teamid
     * @return
     */
    List<TeamVO> findTeamInfo(Integer teamid);
}
