package com.examinationreport.examinationreportapp.service.impl;

import com.examinationreport.examinationreportapp.entity.AllLecturers;
import com.examinationreport.examinationreportapp.entity.Role;
import com.examinationreport.examinationreportapp.entity.User;
import com.examinationreport.examinationreportapp.exception.ExceptionHandler;
import com.examinationreport.examinationreportapp.repository.AllAdminsRepository;
import com.examinationreport.examinationreportapp.repository.AllLecturersRepository;
import com.examinationreport.examinationreportapp.repository.AllStudentsRepository;
import com.examinationreport.examinationreportapp.repository.UserRepository;
import com.examinationreport.examinationreportapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.HashSet;
import java.util.List;
import java.util.Set;
@Service(value = "userService")
public class UserServiceImpl implements UserService, UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AllLecturersRepository allLecturersRepository;

    @Autowired
    private AllAdminsRepository allAdminsRepository;

    @Autowired
    private AllStudentsRepository allStudentsRepository;

    @Autowired
    private BCryptPasswordEncoder bcryptEncoder;

    @Override
    public User createStudent(User user) {

        User newUser = new User();
        newUser.setUsername(user.getUsername());
        newUser.setPassword(bcryptEncoder.encode(user.getPassword()));;
        newUser.setEmail(user.getEmail());
        newUser.setName(user.getName());
        newUser.setPhonenumber(user.getPhonenumber());


        // add default role of 'USER'
        Role role = new Role();
        role.setName("STUDENT");
        role.setDescription("This is a student role");
        Set<Role> roleSet = new HashSet<>();
        roleSet.add(role);
        newUser.setRoles(roleSet);

        return userRepository.save(newUser);


    }

    @Override
    public User createLecturer(User user) {
        User newUser = new User();
        newUser.setUsername(user.getUsername());
        newUser.setPassword(bcryptEncoder.encode(user.getPassword()));;
        newUser.setEmail(user.getEmail());
        newUser.setName(user.getName());
        newUser.setPhonenumber(user.getPhonenumber());


        // add default role of 'USER'
        Role role = new Role();
        role.setName("LECTURER");
        role.setDescription("This is a lecturer role");
        Set<Role> roleSet = new HashSet<>();
        roleSet.add(role);
        newUser.setRoles(roleSet);

        return userRepository.save(newUser);
    }

    @Override
    public User createAdmin(User user) {

        if(userRepository.findByUsername(user.getUsername())!=null){
            throw new ExceptionHandler("Admin with this username already exist");

        }

        else if(userRepository.findByEmail(user.getEmail())!=null){
            throw new ExceptionHandler("Admin with this email already exist");
        }
        else {

            User newUser = new User();
            newUser.setUsername(user.getUsername());
            newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
            ;
            newUser.setEmail(user.getEmail());
            newUser.setName(user.getName());
            newUser.setPhonenumber(user.getPhonenumber());


            // add default role of 'USER'
            Role role = new Role();
            role.setName("ADMIN");
            role.setDescription("This is an admin role");
            Set<Role> roleSet = new HashSet<>();
            roleSet.add(role);
            newUser.setRoles(roleSet);

//            return userRepository.save(newUser);
            return user;
        }

    }

    @Override
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public Page<User> getAllLectures(Pageable pageable) {
        return (Page)allLecturersRepository.findAll(pageable);
    }

    @Override
    public Page<User> getAllStudents(Pageable pageable) {
        return  (Page)allStudentsRepository.findAll(pageable);
    }

    @Override
    public Page<User> getAllAdmins(Pageable pageable) {
        return  (Page)allAdminsRepository.findAll(pageable);
    }

    private Set<SimpleGrantedAuthority> getAuthority(User user) {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        user.getRoles().forEach(role -> {
            //authorities.add(new SimpleGrantedAuthority(role.getName()));
            authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getName()));
        });
        return authorities;
        //return Arrays.asList(new SimpleGrantedAuthority("ROLE_ADMIN"));
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {

        User user = userRepository.findByUsername(s);
        //System.out.println(s);
        if(user == null){
            throw new UsernameNotFoundException("Invalid username or password.");

        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), getAuthority(user));

    }






}
