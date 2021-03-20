package com.examinationreport.examinationreportapp.validation;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class ValidateUser {

    @NotNull
    @Size(min=5,max=15, message="Username should be between 5 to 15")
    private String username;


    @NotNull
    @Size(min=5,max=15, message="Password should be between 5 to 15")
    private String password;


    @NotNull
    @Size(min=2,max=17, message="Name should be between 2 to 17")
    private String name;


    @NotNull
    @Email(message="Email should be valid")
    private String email;

    @NotNull
    @Size(min=8,max=12, message="Phone number should be 8-12")
    private String phonenumber;


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhonenumber() {
        return phonenumber;
    }

    public void setPhonenumber(String phonenumber) {
        this.phonenumber = phonenumber;
    }
}
