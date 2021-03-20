package com.examinationreport.examinationreportapp.controller;

import com.examinationreport.examinationreportapp.config.TokenProvider;
import com.examinationreport.examinationreportapp.entity.AuthToken;
import com.examinationreport.examinationreportapp.entity.LoginUser;
import com.examinationreport.examinationreportapp.entity.User;
import com.examinationreport.examinationreportapp.service.UserService;

import com.examinationreport.examinationreportapp.validation.ValidateUser;

import com.examinationreport.examinationreportapp.exception.ExceptionHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collection;
import java.util.List;


@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/admin")
public class AdminController {


    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenProvider jwtTokenUtil;

    @Autowired
    private UserService userService;



    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping(value="/allLecturers", method = RequestMethod.GET)
    public Page<User> listLecturers(Pageable pageable){
        return userService.getAllLectures(pageable);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping(value="/allAdmins", method = RequestMethod.GET)
    public Page<User> listAdmins(Pageable pageable){
        return userService.getAllAdmins(pageable);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping(value="/allStudents", method = RequestMethod.GET)
    public Page<User> listUser(Pageable pageable){
        return userService.getAllStudents(pageable);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/createAdmin")
    public ResponseEntity<?>  createAdmin(@Valid @RequestBody ValidateUser validateUser, BindingResult bindingresult) throws ExceptionHandler{

        User user= new User();
        user.setUsername(validateUser.getUsername());
        user.setPassword(validateUser.getPassword());
        user.setName(validateUser.getName());
        user.setEmail(validateUser.getEmail());
        user.setPhonenumber(validateUser.getPhonenumber());

        if(bindingresult.hasErrors()){
            //System.out.println("Invalid fields number"+bindingresult.getErrorCount() +"The first error"+bindingresult.getFieldError().getField());
            return ResponseEntity.badRequest().body("Error Count:"+bindingresult.getErrorCount() +", an error has occured on field "+bindingresult.getFieldError().getField());        }
        else{
            try{
                userService.createAdmin(user);
                return ResponseEntity
                        .ok(user);
            }
            catch(ExceptionHandler e){

                return ResponseEntity.badRequest().body(e.getMessage());
            }
        }




//        System.out.println(validateUser.getUsername()+""+validateUser.getPassword()+""+validateUser.getName()+""+validateUser.getEmail()+""+validateUser.getPhonenumber());
//
//        return "";

//        return ResponseEntity.ok(new AuthToken(token, userUsername,role));
//        return userService.getAllStudents(pageable);

    }





}
