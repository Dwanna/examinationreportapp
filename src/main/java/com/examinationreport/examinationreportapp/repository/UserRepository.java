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

    User findById(int id);



    User findByEmail(String s);

//    @Query(nativeQuery = true,value="SELECT * from alllecturers")
//     List<User> findAllLecturers();

    @Query(nativeQuery = true,value="Select user_id as id, user.name,user.email,user.username,user.phonenumber from examsystem.user inner join user_roles on user_roles.user_id=user.id inner join role on role.id=user_roles.role_id where role.name='STUDENT' and user.username= ?;")
    Object searchStudent(String username);

    @Query(nativeQuery = true,value="Select user_id as id, user.name,user.email,user.username,user.phonenumber from examsystem.user inner join user_roles on user_roles.user_id=user.id inner join role on role.id=user_roles.role_id where role.name='LECTURER' and user.username= ?;")
    Object searchLecturer(String username);

@Query(nativeQuery = true,value="Select user_id as id, user.name,user.email,user.username,user.phonenumber from examsystem.user inner join user_roles on user_roles.user_id=user.id inner join role on role.id=user_roles.role_id where role.name='ADMIN' and user.username= ?;")
    Object searchAdmin(String username);





}
