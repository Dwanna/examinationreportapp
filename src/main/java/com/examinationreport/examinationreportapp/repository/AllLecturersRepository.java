package com.examinationreport.examinationreportapp.repository;

import com.examinationreport.examinationreportapp.entity.AllLecturers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface AllLecturersRepository extends PagingAndSortingRepository<AllLecturers,Integer> {

}
