package com.examinationreport.examinationreportapp.service;

import com.examinationreport.examinationreportapp.entity.Grade;
import com.examinationreport.examinationreportapp.entity.Module;
import com.examinationreport.examinationreportapp.entity.ModuleGrades;
import com.examinationreport.examinationreportapp.entity.User;
import com.examinationreport.examinationreportapp.validation.ShowGrade;
import com.examinationreport.examinationreportapp.validation.ValidateUpdateUser;
import com.examinationreport.examinationreportapp.validation.ValidateUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


import java.util.List;
import java.util.Set;

public interface UserService {

    User createStudent(User user);
    User createLecturer(User user);
    User createAdmin(User user);

    List<User> findAllUsers();


    Page<User> getAllLectures(int pageNumber,int pageSize,String sortBy,String sortDir);
    Page<User> getAllStudents(int pageNumber,int pageSize,String sortBy,String sortDir);
    Page<User> getAllAdmins(Pageable pageable);




    Object searchAdmin(String username);
    Object searchLecturer(String username);
    Object searchStudent(String username);

    Object updateUser(ValidateUpdateUser user);

    Boolean deleteUser(String username);
    List<Module> findModule(String name);

    List<String>findUserModules(String username);

    List<Object> findAllStudentsModule(String username);

    Grade postOrUploadGrades(String username,String moduleName,int grade);

    List<Object> studentGrades(String username);

    ShowGrade findStudentGradeForAModule(String username, String module);

    List<ModuleGrades> listStudentGradesForModule(String module);

}
