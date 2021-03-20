package com.examinationreport.examinationreportapp.repository;

import com.examinationreport.examinationreportapp.entity.AllAdmins;
import com.examinationreport.examinationreportapp.entity.AllStudents;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AllStudentsRepository extends JpaRepository<AllStudents,Integer> {
}
