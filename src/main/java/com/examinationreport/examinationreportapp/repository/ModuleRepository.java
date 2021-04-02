package com.examinationreport.examinationreportapp.repository;

import com.examinationreport.examinationreportapp.entity.Module;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ModuleRepository extends JpaRepository<Module,Integer> {
    List<Module> findByModuleName(String username);


    @Query(nativeQuery = true,value="Select u.name,u.username,m.module_name from user u  INNER JOIN user_modules um ON um.user_id=u.id INNER JOIN module m ON m.id=um.module_id INNER JOIN user_roles ur ON ur.user_id=u.id INNER JOIN role r ON r.id=ur.role_id where m.module_name=? and r.name='STUDENT';")
    List<Object> findStudentToModule(String username);
}
