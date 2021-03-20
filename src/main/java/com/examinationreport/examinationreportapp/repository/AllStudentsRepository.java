package com.examinationreport.examinationreportapp.repository;

import com.examinationreport.examinationreportapp.entity.AllAdmins;
import com.examinationreport.examinationreportapp.entity.AllStudents;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface AllStudentsRepository extends PagingAndSortingRepository<AllStudents,Integer> {
}
