package com.examinationreport.examinationreportapp.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import java.util.List;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Table(name = "course")
public class Course {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private int id;

    @NotNull
    @Column(nullable = false)
    private String courseName;


    @ManyToOne
    @JoinColumn(name="department_id")
    private Department department;





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
