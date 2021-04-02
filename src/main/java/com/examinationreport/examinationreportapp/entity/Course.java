package com.examinationreport.examinationreportapp.entity;

import io.swagger.annotations.ApiModel;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import java.util.List;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Table(name = "course")
@ApiModel(value = "Course Class",description = "Course of each student user role")
public class Course {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private int id;

    @NotNull
    @Column(nullable = false)
    private String courseName;


    @ManyToOne(cascade=CascadeType.ALL)
    @JoinColumn(name="department_id")
    private Department department;

    @OneToMany(mappedBy="course", cascade=CascadeType.ALL)
    private List<Module> moduleList;


    public List<Module> getModuleList() {
        return moduleList;
    }

    public void setModuleList(List<Module> moduleList) {
        this.moduleList = moduleList;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }



    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }
}
