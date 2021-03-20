package com.examinationreport.examinationreportapp.entity;


import javax.persistence.*;
import javax.validation.constraints.NotNull;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Table(name="grade")
public class Grade {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private int id;

    private int gradePercentage;

    private String gradeType;


    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")

    private User user;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "module_id", referencedColumnName = "id")
    private Module module;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getGradePercentage() {
        return gradePercentage;
    }

    public void setGradePercentage(int gradePercentage) {
        this.gradePercentage = gradePercentage;
    }

    public String getGradeType() {
        return gradeType;
    }

    public void setGradeType(String gradeType) {
        this.gradeType = gradeType;
    }



    public Module getModule() {
        return module;
    }

    public void setModule(Module module) {
        this.module = module;
    }


    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
