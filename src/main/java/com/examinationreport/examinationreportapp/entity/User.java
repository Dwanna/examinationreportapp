package com.examinationreport.examinationreportapp.entity;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Table(name = "user")
@ApiModel(value = "User Class",description = "User Class")
public class User  {


    @ApiModelProperty(
            value = "Id of the user",
            name = "id",
            dataType = "Integer",
            example = "test_model")
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private int id;


    @ApiModelProperty(
            value = "Username of the user",
            name = "username",
            dataType = "String",
            example = "test_model")
    @NotNull
    @Column(nullable = false)
    private String username;


    @ApiModelProperty(
            value = "Password of the user",
            name = "password",
            dataType = "String",
            example = "test_model")
    @NotNull
    @Column(nullable = false)
    private String password;

    @ApiModelProperty(
            value = "Name of the user",
            name = "name",
            dataType = "String",
            example = "test_model")
    @NotNull
    @Column(nullable = false)
    private String name;


    @ApiModelProperty(
            value = "Email of the user",
            name = "email",
            dataType = "String",
            example = "test_model")
    private String email;


    @ApiModelProperty(
            value = "PhoneNumber of the user",
            name = "phonenumber",
            dataType = "String",
            example = "test_model")
    private String phonenumber;

//    @Tra
//    private boolean enabled=true;


    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(
            name = "user_roles",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "role_id")})
    Set<Role> roles;


    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(
            name = "user_modules",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "module_id")})
    Set<Module> modules;


    @OneToMany(mappedBy="user", cascade=CascadeType.ALL)
    private List<Grade> gradeList;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

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

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public Set<Module> getModules() {
        return modules;
    }

    public void setModules(Set<Module> modules) {
        this.modules = modules;
    }

    public List<Grade> getGradeList() {
        return gradeList;
    }

    public void setGradeList(List<Grade> gradeList) {
        this.gradeList = gradeList;
    }

    //    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        Set<GrantedAuthority> authorities = new HashSet<>();
//        getRoles().forEach(role -> {
//            //authorities.add(new SimpleGrantedAuthority(role.getName()));
//            authorities.add(new Authority("ROLE_" + role.getName()));
//        });
//        return authorities;
//    }
//    @Override
//    public boolean isAccountNonExpired() {
//        // TODO Auto-generated method stub
//        return true;
//    }
//    @Override
//    public boolean isAccountNonLocked() {
//        // TODO Auto-generated method stub
//        return true;
//    }
//    @Override
//    public boolean isCredentialsNonExpired() {
//        // TODO Auto-generated method stub
//        return true;
//    }
//
//    @Override
//    public boolean isEnabled() {
//        return enabled;
//    }

}
