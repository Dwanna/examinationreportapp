package com.examinationreport.examinationreportapp.repository;

import com.examinationreport.examinationreportapp.entity.Grade;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GradeRepository extends JpaRepository<Grade,Integer> {
}
