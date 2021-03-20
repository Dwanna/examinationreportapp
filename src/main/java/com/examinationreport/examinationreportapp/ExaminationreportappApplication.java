package com.examinationreport.examinationreportapp;

import com.examinationreport.examinationreportapp.entity.Role;
import com.examinationreport.examinationreportapp.entity.User;
import com.examinationreport.examinationreportapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class ExaminationreportappApplication implements CommandLineRunner {

    @Autowired
    private UserService userservice;

    public static void main(String[] args) {
        SpringApplication.run(ExaminationreportappApplication.class, args);
    }
    @Override
    public void run(String... args) throws Exception {

        for(int i=0;i<500;i++) {
            User user1 = new User();
            user1.setName("LS"+i);
            user1.setUsername("MrLec"+i);
            user1.setPassword("Daniel");
            user1.setEmail("LS@gmail.com"+i);
            user1.setPhonenumber("089976253");


           // userservice.createLecturer(user1);


        }


    }

}
