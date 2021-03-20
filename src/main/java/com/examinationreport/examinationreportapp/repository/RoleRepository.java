package com.examinationreport.examinationreportapp.repository;

import com.examinationreport.examinationreportapp.entity.Module;
import com.examinationreport.examinationreportapp.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role,Long> {
}
