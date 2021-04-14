package com.examinationreport.examinationreportapp.controller;

import com.examinationreport.examinationreportapp.config.TokenProvider;
import com.examinationreport.examinationreportapp.entity.Grade;
import com.examinationreport.examinationreportapp.entity.Module;
import com.examinationreport.examinationreportapp.entity.ModuleGrades;
import com.examinationreport.examinationreportapp.entity.User;
import com.examinationreport.examinationreportapp.service.UserService;
import com.examinationreport.examinationreportapp.validation.ShowGrade;
import com.examinationreport.examinationreportapp.validation.ValidateGrade;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;

import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Set;


@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/lecturer")
public class LecturerController {


    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenProvider jwtTokenUtil;

    @Autowired
    private UserService userService;





    @PreAuthorize("hasAnyRole('ADMIN','LECTURER')")
    @RequestMapping(value="/searchLecturer/modules", method = RequestMethod.GET)
    public List<String> findModule(@RequestParam("username")String username){

        return userService.findUserModules(username);

    }


    @PreAuthorize("hasAnyRole('ADMIN','LECTURER')")
    @RequestMapping(value="/module", method = RequestMethod.GET)
    public List<Module> findUserModule(@RequestParam("name")String name){
        //System.out.println(username+" this is my username");
        return userService.findModule(name);

    }



    @PreAuthorize("hasAnyRole('LECTURER', 'ADMIN')")
    @RequestMapping(value="/studentModule", method = RequestMethod.GET)
    public List<Object> findStudentModule(@RequestParam("name")String modulename){



        return userService.findAllStudentsModule(modulename);
    }


    @PreAuthorize("hasAnyRole('LECTURER')")
    @RequestMapping(value="/postGrades", method = RequestMethod.POST)
    public Grade uploadGrades(@Valid @RequestBody ValidateGrade validateGrade){

//        System.out.println(validateGrade.getUsername()+validateGrade.getName()+validateGrade.getGrade());


        return userService.postOrUploadGrades(validateGrade.getUsername(), validateGrade.getName(), validateGrade.getGrade());
    }


    @PreAuthorize("hasAnyRole('LECTURER', 'ADMIN')")
    @RequestMapping(value="/findGrade", method = RequestMethod.GET)
    public ShowGrade getGrade(@RequestParam("username")String username, @RequestParam("module")String module){


        return userService.findStudentGradeForAModule(username,module);

  }


    @PreAuthorize("hasAnyRole('LECTURER', 'ADMIN')")
    @RequestMapping(value="/getGradesForModule", method = RequestMethod.GET)
    public List<ModuleGrades> getGradesForModule(){


        return userService.listStudentGradesForModule("");

    }

//
//    @PreAuthorize("hasRole('LECTURER')")
//    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
//    public ResponseEntity<?> register(@RequestBody LoginUser loginUser) throws AuthenticationException {
//
//        final Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(
//                        loginUser.getUsername(),
//                        loginUser.getPassword()
//                )
//        );
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//        final String token = jwtTokenUtil.generateToken(authentication);
//
//        System.out.println(loginUser.getUsername()+loginUser.getPassword());
//        return ResponseEntity.ok(new AuthToken(token,authentication.getPrincipal().toString()));
//    }











}
