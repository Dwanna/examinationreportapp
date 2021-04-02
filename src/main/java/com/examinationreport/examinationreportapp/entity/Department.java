package com.examinationreport.examinationreportapp.entity;

import io.swagger.annotations.ApiModel;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import java.util.List;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Table(name="department")
@ApiModel(value = "Department Class",description = "The department linked courses")
public class Department {

    @Id
    @GeneratedValue(strategy=IDENTITY)
    private int id;

    @NotNull
    @Column(nullable = false)
    private String departmentName;

    @OneToMany(mappedBy="department", cascade=CascadeType.ALL)
    private List<Course> courseList;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public List<Course> getCourseList() {
        return courseList;
    }

    public void setCourseList(List<Course> courseList) {
        this.courseList = courseList;
    }
}
