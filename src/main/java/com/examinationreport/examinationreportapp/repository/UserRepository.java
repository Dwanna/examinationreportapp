package com.examinationreport.examinationreportapp.repository;

import com.examinationreport.examinationreportapp.entity.Module;
import com.examinationreport.examinationreportapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import javax.websocket.server.PathParam;
import java.util.List;

@Repository
//@RepositoryRestResource(collectionResourceRel="users",path="users")
public interface UserRepository extends JpaRepository<User,Integer> {
    User findByUsername(String s);

    @Query(nativeQuery = true,value="SELECT * from alllecturers")
     List<User> findAllLecturers();
}
