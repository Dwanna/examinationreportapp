package com.examinationreport.examinationreportapp.validation;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class ValidateGrade {

    @NotNull
    @Size(min=5,max=15, message="username should be between 5 to 15")
    private String username;

    @NotNull
    @Size(min=2,max=17, message="Name should be between 2 to 17")
    private String name;


    @NotNull
    @Min(value=0, message="must be equal or greater than 0")
    @Max(value=100, message="must be equal or less than 100")
    private int grade;


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getGrade() {
        return grade;
    }

    public void setGrade(int grade) {
        this.grade = grade;
    }
}
