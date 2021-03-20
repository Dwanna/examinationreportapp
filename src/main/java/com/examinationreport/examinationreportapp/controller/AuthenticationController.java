package com.examinationreport.examinationreportapp.controller;

import com.examinationreport.examinationreportapp.config.TokenProvider;
import com.examinationreport.examinationreportapp.entity.AuthToken;
import com.examinationreport.examinationreportapp.entity.LoginUser;
import com.examinationreport.examinationreportapp.entity.User;
import com.examinationreport.examinationreportapp.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Collection;
import java.util.List;

//import static edu.ait.jwtrolesdemo.model.Constants.TOKEN_PREFIX;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/users")

public class AuthenticationController {

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private TokenProvider jwtTokenUtil;

  @Autowired
  private UserService userService;

  @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
  public ResponseEntity<?> register(@RequestBody LoginUser loginUser) throws AuthenticationException {

    final Authentication authentication = authenticationManager.authenticate(
              new UsernamePasswordAuthenticationToken(
                      loginUser.getUsername(),
                      loginUser.getPassword()
              )
    );
    SecurityContextHolder.getContext().setAuthentication(authentication);
    final String token = jwtTokenUtil.generateToken(authentication);


    ///String Manipulation to get Username and Role
    String role= authentication.getAuthorities().toString().replace("[","").replace("]","").split("_")[1];
   System.out.println("Authen"+role);

   String userUsername= authentication.getPrincipal().toString().split(" ")[1]
           .split("=")[1].replace(",","");

    return ResponseEntity.ok(new AuthToken(token, userUsername,role));
  }

  @PreAuthorize("hasRole('ADMIN')")
  @RequestMapping(value="/users", method = RequestMethod.GET)
  public List<User> listUser(){
      return userService.findAllUsers();
  }

//  @PreAuthorize("hasRole('USER')")
//  //@PreAuthorize("hasAnyRole('USER', 'ADMIN')")
//  @RequestMapping(value = "/users/{id}", method = RequestMethod.GET)
//  public User getOne(@PathVariable(value = "id") Long id){
//      return userService.findById(id);
//  }
//
//  @RequestMapping(value="/register", method = RequestMethod.POST)
//  public User saveUser(@RequestBody UserDto user){
//      return userService.save(user);
//  }

  @RequestMapping(value = "/userroles", method = RequestMethod.GET)
  public Collection<? extends GrantedAuthority> currentUserName(Authentication authentication) {
    return authentication.getAuthorities();
  }

  @RequestMapping(value = "/userdetails", method = RequestMethod.GET)
  public Authentication currentUserDetails(Authentication authentication) {
    return authentication;
  }

}