package com.examinationreport.examinationreportapp.repository;

import com.examinationreport.examinationreportapp.entity.Module;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ModuleRepository extends JpaRepository<Module,Integer> {
}
