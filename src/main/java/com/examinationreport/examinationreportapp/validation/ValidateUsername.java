package com.examinationreport.examinationreportapp.validation;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class ValidateUsername {

    @NotNull
    @Size(min=5,max=15, message="username should be between 5 to 15")
    private String username;


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
