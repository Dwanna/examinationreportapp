package com.examinationreport.examinationreportapp.repository;


import com.examinationreport.examinationreportapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
//@RepositoryRestResource(collectionResourceRel="users",path="users")
public interface UserRepository extends JpaRepository<User,Integer> {
    User findByUsername(String s);

    User findById(int id);


    User findByEmail(String s);


    @Query(nativeQuery = true,value="call searchStudent(?);")
    Object searchStudent(String username);

    @Query(nativeQuery = true,value="call searchLecturer(?);")
    Object searchLecturer(String username);

@Query(nativeQuery = true,value="call searchAdmin(?);")
    Object searchAdmin(String username);


@Query(nativeQuery = true,value="Select grade.module_name,grade.grade_percentage from user inner join grade on user.id=grade.user_id where user.username= ?;")
    List<Object> studentGrades(String username);






}
