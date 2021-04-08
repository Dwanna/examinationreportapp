package com.examinationreport.examinationreportapp.repository;

import com.examinationreport.examinationreportapp.entity.Grade;
import com.examinationreport.examinationreportapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GradeRepository extends JpaRepository<Grade,Integer> {

    Grade findByUserAndModuleName(User user,String name);

    List<Grade> findByUser(User user);

    List<Grade> findByModuleName(String name);
}
