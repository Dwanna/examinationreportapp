package com.examinationreport.examinationreportapp.repository;

import com.examinationreport.examinationreportapp.entity.AllAdmins;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AllAdminsRepository  extends PagingAndSortingRepository<AllAdmins,Integer> {
}
