package com.examinationreport.examinationreportapp.controller;

import com.examinationreport.examinationreportapp.config.TokenProvider;
import com.examinationreport.examinationreportapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.authentication.AuthenticationManager;

import org.springframework.web.bind.annotation.CrossOrigin;


@CrossOrigin("http://localhost:3000")
public class LecturerController {


    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenProvider jwtTokenUtil;

    @Autowired
    private UserService userService;

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
