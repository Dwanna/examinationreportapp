import logo from './logo.svg';
import './App.css';
import LoginPage from "./components/LoginPage";
import Register from "./components/Register";

import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";

import {Tabs,Container,Tab,Navbar,Nav} from 'react-bootstrap'
import AdminHomePage from "./components/AdminHomePage";
import StudentHomePage from "./components/StudentHomePage";
import LecturerHomePage from "./components/LecturerHomePage";
import StudentLogin from "./components/StudentLogin";
import LecturerLogin from "./components/LecturerLogin";
import AdminLecturerView from "./components/AdminLecturerView";
import AdminStudentView from "./components/AdminStudentView";
import AdminAddAdmin from "./components/AdminAddAdmin";
import LecturerType from "./components/LecturerType";


import React, {Component} from "react";

import AuthService from "./service/auth.service"
import SearchUser from "./components/SearchUser";
import LecturerStudentView from "./components/LecturerStudentView";
import LecturerStudentGrade from "./components/LecturerStudentGrade";
import NumberUsers from "./components/NumberUsers";
import DepartmentType from "./components/DepartmentType";
import SearchModule from "./components/SearchModule";


class App extends Component {

    constructor(props){
        super(props);
        this.logOut= this.logOut.bind(this);

        this.state ={
            currentUser: undefined
        };

    }

    logOut(){
        AuthService.logOut();
    }

    componentDidMount() {
        const user= AuthService.getCurrentUser();
        console.log(user);

        if(user){
            this.setState({
                currentUser: AuthService.getCurrentUser()
            })
        }
    }

    render(){
        const {currentUser} = this.state;
  return (

    <div className="App">



        <Router>
        <Container>
            <Navbar bg="dark" variant="dark">

                <Nav className="mr-auto" style={{textAlign: 'right'}}>


                    {currentUser ? (
                            <div className="navbar-nav ml-auto">
                            <li className="nav-link">{currentUser.username}</li>
                                <a href="/" onClick={this.logOut} className="nav-link">Log out</a>
                            </div>

                        ):(
                            <div className="navbar-nav ml-auto">
                                < Link to={""} className="nav-link">AdminLogin</Link>
                                <Link to={"studentLogin"} className="nav-link">Student Login</Link>
                                <Link to={"lecturerLogin"} className="nav-link">Lecturer Login</Link>
                            </div>


                        )}
                </Nav>

            </Navbar>


          <h2>Summer Exams report system</h2>


                <Switch>
                    <Route exact path={["/","/login"]} component={LoginPage}></Route>
                    <Route exact path={"/studentLogin"} component={StudentLogin}></Route>

                    <Route exact path={"/lecturerLogin"} component={LecturerLogin}></Route>
                    <Route exact path={"/register"} component={Register}></Route>
                    <Route  path={"/adminHomePage"} component={AdminHomePage}></Route>
                    <Route  path={"/studentHomePage"} component={StudentHomePage}></Route>
                    <Route  path={"/lecturerHomePage"} component={LecturerHomePage}></Route>
                    <Route  path={"/adminLecturerView"} component={AdminLecturerView}></Route>
                    <Route  path={"/adminStudentView"} component={AdminStudentView}></Route>
                    <Route  path={"/adminAddAdmin"} component={AdminAddAdmin}></Route>
                    <Route  path={"/searchUser"} component={SearchUser}></Route>
                    <Route  path={"/lecturerStudentView"} component={LecturerStudentView}></Route>
                    <Route  path={"/lecturerStudentGrade"} component={LecturerStudentGrade}></Route>
                    <Route  path={"/numberUsers"} component={NumberUsers}></Route>
                    <Route  path={"/departmentType"} component={DepartmentType}></Route>
                    <Route  path={"/searchModule"} component={SearchModule}></Route>
                    <Route  path={"/lecturerType"} component={LecturerType}></Route>
                </Switch>



        </Container>
        </Router>








    </div>
  );
}}

export default App;
