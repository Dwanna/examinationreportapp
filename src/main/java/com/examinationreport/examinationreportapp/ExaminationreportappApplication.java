package com.examinationreport.examinationreportapp;

import com.examinationreport.examinationreportapp.entity.*;
import com.examinationreport.examinationreportapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import springfox.documentation.RequestHandler;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
@EnableSwagger2
public class ExaminationreportappApplication implements CommandLineRunner {

    @Autowired
    private UserService userservice;



    public static void main(String[] args) {
        SpringApplication.run(ExaminationreportappApplication.class, args);
    }
    @Override
    public void run(String... args) throws Exception {


            User user1 = new User();
            user1.setName("Dank donald");
            user1.setUsername("Danky");
            user1.setPassword("Daniel");
            user1.setEmail("danky@gmail.com");
            user1.setPhonenumber("089976251");

//            Uncomment this and run the application to add an admin
           // userService.createAdmin(user1);




        for(int i=1;i<21;i++) {
            User user2 = new User();
            user2.setName("MyStudent");
            user2.setUsername("Student" + i);
            user2.setPassword("Daniel");
            user2.setEmail("student"+i+"@gmail.com");
            user2.setPhonenumber("089976251");
            //            Uncomment this and run the application to add list of students, make sure to comment this after running the application so it doesnt add the objects again
            //userservice.createStudent(user2);
        }


    }




    @Bean
    public Docket docket(){
        return new Docket (DocumentationType.SWAGGER_2).select().paths(PathSelectors.ant("/**"))
                .apis(RequestHandlerSelectors.basePackage("com.examinationreport.examinationreportapp")).build().apiInfo(getApiInfo());
    }

    private ApiInfo getApiInfo() {
        return new ApiInfoBuilder()
                .title("Examination Report App")
                .version("1.0")
                .description("This exam result application allows different users to perform particular function.The users are grouped into Admin, Lecturer and Student.\n" +
                        "Admin:Oversees all users actions\n" +
                        "Lecturer: Post and view students grades.\n" +
                        "Student:Can only view grades")

                .license("Apache License Version 2.0")
                .build();
    }

}
