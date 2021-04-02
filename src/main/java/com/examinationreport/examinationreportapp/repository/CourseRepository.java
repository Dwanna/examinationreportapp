package com.examinationreport.examinationreportapp.repository;

import com.examinationreport.examinationreportapp.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;




public interface CourseRepository extends JpaRepository<Course,Integer> {
}
