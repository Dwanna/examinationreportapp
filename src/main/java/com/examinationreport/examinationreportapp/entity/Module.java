package com.examinationreport.examinationreportapp.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Table(name="module")
public class Module {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private int id;

    private String moduleName;


    @ManyToOne
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
