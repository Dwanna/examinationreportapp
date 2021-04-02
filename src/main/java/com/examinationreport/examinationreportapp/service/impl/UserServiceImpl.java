package com.examinationreport.examinationreportapp.service.impl;

import com.examinationreport.examinationreportapp.entity.*;
import com.examinationreport.examinationreportapp.exception.ExceptionHandler;
import com.examinationreport.examinationreportapp.repository.*;
import com.examinationreport.examinationreportapp.service.UserService;
import com.examinationreport.examinationreportapp.validation.ShowGrade;
import com.examinationreport.examinationreportapp.validation.ValidateUpdateUser;
import com.examinationreport.examinationreportapp.validation.ValidateUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
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

    @Autowired
    private ModuleRepository moduleRepository;

    @Autowired
    private GradeRepository gradeRepository;

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



        Module mod= new Module();
        mod.setModuleName("RIA");

        Module mod1= new Module();
        mod1.setModuleName("Software Design");

        Set<Module> ms= new HashSet<>();
        ms.add(mod);ms.add(mod1);

        newUser.setModules(ms);

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

        Module mod= new Module();
        mod.setModuleName("RIA");



        Set<Module> ms= new HashSet<>();
        ms.add(mod);

        newUser.setModules(ms);

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





            return userRepository.save(newUser);

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
    public Page<User> getAllStudents(int pageNumber,int pageSize,String sortBy,String sortDir) {
        return  (Page)allStudentsRepository.findAll(
                PageRequest.of(pageNumber,pageSize,sortDir.equalsIgnoreCase("asc")? Sort.by(sortBy).ascending() :Sort.by(sortBy).descending())
                );
    }

    @Override
    public Page<User> getAllAdmins(Pageable pageable) {
        return  (Page)allAdminsRepository.findAll(pageable);
    }

    @Override
    public Object searchAdmin(String username) {
        Object admin= userRepository.searchAdmin(username);
        if(admin==null){
            throw new ExceptionHandler("This admin doesn't exist, make sure you");
        }
        else{
            return userRepository.searchAdmin(username);
        }

    }

    @Override
    public Object searchLecturer(String username) {
        Object lecturer= userRepository.searchLecturer(username);
        if(lecturer==null){
            throw new ExceptionHandler("This lecturer doesn't exist, make sure you entered the correct username type");
        }
        else{
            return userRepository.searchLecturer(username);
        }


    }

    @Override
    public Object searchStudent(String username) {
        Object student= userRepository.searchStudent(username);



        if(student==null){
            throw new ExceptionHandler("This student doesn't exist, make sure you entered the correct username type");
        }
        else{
            return userRepository.searchStudent(username);
        }
    }

    @Override
    public Object updateUser(ValidateUpdateUser user) {
        User user1= userRepository.findByUsername(user.getUsername());

        if(user1==null){

            throw new ExceptionHandler("Username doesnt exist");
        }
        else{

            user1.setPhonenumber(user.getPhoneNumber());
            user1.setEmail(user.getEmail());
            user1.setName(user.getName());

            return userRepository.save(user1);

        }
    }

    @Override
    public List<Module> findModule(String name) {
        List<Module> module=  moduleRepository.findByModuleName(name);
        if(module==null){
            throw new ExceptionHandler("Module with this id doesnt exist");
        }
        else{
            return module;
        }

    }

    @Override
    public User findUserModules(String username) {
        User u= userRepository.findByUsername(username);
        if(u==null){

        }
        else{
            return u;
        }
        return null;
    }

    @Override
    public List<Object> findAllStudentsModule(String username) {

        return moduleRepository.findStudentToModule(username);
    }

    @Override
    public Grade postOrUploadGrades(String username, String moduleName,int gradePercentage) {
        User user= userRepository.findByUsername(username);

        Grade grade= gradeRepository.findByUserAndModuleName(user,moduleName);


        if(grade==null){
            Grade grade1= new Grade();

            grade1.setGradePercentage(gradePercentage);
            grade1.setUser(user);
            grade1.setModuleName(moduleName);

            return gradeRepository.save(grade1);
        }
        else{
            grade.setGradePercentage(gradePercentage);

            return gradeRepository.save(grade);

        }






    }

    @Override
    public List<Object> studentGrades(String username) {
        User user= userRepository.findByUsername(username);



        List<Object> newGradeList= userRepository.studentGrades(user.getUsername());
//        for(int i=0;i<user.getGradeList().size();i++){
//            newGradeList.add(user.getGradeList().get(i));
//        }



        return newGradeList;
    }

    @Override
    public ShowGrade findStudentGradeForAModule(String username, String module) {
        User user= userRepository.findByUsername(username);
        Grade grade= gradeRepository.findByUserAndModuleName(user,module);

        ShowGrade sg= new ShowGrade();

        sg.setUsername(user.getUsername());
        sg.setGradePercentage(grade.getGradePercentage());

        return sg;

    }

    @Override
    public Boolean deleteUser(String username) {

       // System.out.println(username);

        User user1= userRepository.findByUsername(username);

        if(user1==null){

            throw new ExceptionHandler("Username doesnt exist, make sure there is a user with that username");
        }
        else{

            userRepository.delete(user1);
            return true;

        }

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
