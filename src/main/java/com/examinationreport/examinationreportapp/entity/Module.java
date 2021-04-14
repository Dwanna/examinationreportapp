package com.examinationreport.examinationreportapp.entity;

import io.swagger.annotations.ApiModel;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Table(name="module")
@ApiModel(value = "Module Class",description = "Module for student and lecturer user role")
public class Module {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private int id;

    @Column(nullable = false)
    private String moduleName;


    @ManyToOne(cascade=CascadeType.ALL)
    @JoinColumn(name = "course_id")
    private Course course;




    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getModuleName() {
        return moduleName;
    }

    public void setModuleName(String moduleName) {
        this.moduleName = moduleName;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }


}
