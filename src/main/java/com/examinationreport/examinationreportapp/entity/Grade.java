package com.examinationreport.examinationreportapp.entity;


import io.swagger.annotations.ApiModel;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Table(name="grade")
@ApiModel(value = "Grade Class",description = "Grade for a student user type")
public class Grade {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private int id;

    private int gradePercentage;

    private String gradeType;


    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @NotNull
    @Column(nullable = false)
    private String moduleName;

    public Grade(){

    }
    public Grade(User user,String moudleName,int gradePercentage){
        this.user= user;this.gradePercentage=gradePercentage;this.moduleName=moudleName;
    }


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


    public String getModuleName() {
        return moduleName;
    }

    public void setModuleName(String moduleName) {
        this.moduleName = moduleName;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
