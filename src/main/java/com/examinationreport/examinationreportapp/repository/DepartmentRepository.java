package com.examinationreport.examinationreportapp.repository;

import com.examinationreport.examinationreportapp.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<Department,Integer> {
}
