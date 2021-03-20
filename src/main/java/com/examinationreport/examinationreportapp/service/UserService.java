package com.examinationreport.examinationreportapp.service;

import com.examinationreport.examinationreportapp.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


import java.util.List;

public interface UserService {

    User createStudent(User user);
    User createLecturer(User user);
    User createAdmin(User user);

    List<User> findAllUsers();


    Page<User> getAllLectures(Pageable pageable);
    Page<User> getAllStudents(Pageable pageable);
    Page<User> getAllAdmins(Pageable pageable);
}
