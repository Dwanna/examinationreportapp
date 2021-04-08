import React from "react";
import {Tabs, Table, TabContent, Tab, Card, Col, ButtonGroup,Button,InputGroup,FormControl,Accordion,Form} from 'react-bootstrap'

import "../App.css";
import authHeader from "../service/auth-header";
import axios from "axios";
import {faStepBackward,faStepForward,faFastForward,faFastBackward} from "@fortawesome/free-solid-svg-icons";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'



const required = value=>{
    if(!value){
        return (
            <div className="alert alert-danger" role="alert">This field is required</div>
        )
    }
}
class AdminHomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            users: [],
            currentPage:1,
            usersPerPage:5,
            studentUsername:'',
            lecturerUsername:'',
            adminUsername:'',
            searchAdminMessage:'',
            searchStudentMessage:'',
            searchLecturerMessage:''
        };
        this.firstPage= this.firstPage.bind(this);
        this.nextPage= this.nextPage.bind(this);
        this.prevPage= this.prevPage.bind(this);
        this.lastPage= this.lastPage.bind(this);
        this.addAdmin= this.addAdmin.bind(this);
        this.onChange= this.onChange.bind(this);
        this.searchStudent= this.searchStudent.bind(this);
        this.searchLecturer=this.searchLecturer.bind(this);

    }

    componentDidMount() {
    this.getAllAdminUser(this.state.currentPage)
    }



    getAllAdminUser(currentPage){
        currentPage-=1;
        axios.get("http://localhost:8082/admin/allAdmins?page="+currentPage+"&size="+this.state.usersPerPage,{headers:authHeader()})
            .then(response=>response.data)
            .then((data)=>{


                this.setState({
                    users: data.content,
                    totalPages: data.totalPages,
                    totalElements:data.totalElements,
                    currentPage: data.number+1
                })

            })
    }

    firstPage =()=> {
        let firstPage=1;
        if(this.state.currentPage>firstPage){
            this.getAllAdminUser(firstPage);
        }
    }
    prevPage =()=> {
        let prevPage=1;
        if(this.state.currentPage>prevPage){
           this.getAllAdminUser(this.state.currentPage - prevPage)
        }
    }

    nextPage =()=> {
        if(this.state.currentPage>1){
            this.setState({
                currentPage:this.state.currentPage+1
            })
        }
    }

    lastPage =()=> {

        if(this.state.currentPage<Math.ceil(this.state.totalElements/this.state.usersPerPage)){
            this.getAllAdminUser(Math.ceil(this.state.totalElements/this.state.usersPerPage));
        }
    }

    nextPage =()=> {
        if(this.state.currentPage<Math.ceil(this.state.totalElements/this.state.usersPerPage)){
            this.getAllAdminUser(this.state.currentPage+1);
        }
    }

    addAdmin = () =>{

        this.props.history.push("/adminAddAdmin");
    }

    onChange(event){
        this.setState(
            {
                [event.target.name]:event.target.value
            }
        )
    }


    searchStudent(event){
        event.preventDefault();


        axios.get("http://localhost:8082/admin/searchStudent?username="+this.state.studentUsername,{headers:authHeader()})
            .then(response=>response.data)
            .then((data)=>{

            // console.log(data);
                    this.props.history.push({
                        pathname: '/searchUser',
                        state: {
                            id:data[0],
                            name:data[1],
                            email:data[2],
                            username:data[3],
                            phoneNumber:data[4]
                        }
                    })


            },
                error=>{
                    const  resMessage= (error.response && error.response.data
                        && error.response.data.message) || error.message||error.toString();
                    if(error.message==="Request failed with status code 400") {
                        console.log(error.response.data);
                        alert(error.response.data);
                    }

                })



    }

    searchLecturer(event){
        event.preventDefault();

        axios.get("http://localhost:8082/admin/searchLecturer?username="+this.state.lecturerUsername,{headers:authHeader()})
            .then(response=>response.data)
            .then((data)=>{

                    this.props.history.push({
                        pathname: '/searchUser',
                        state: {
                            id:data[0],
                            name:data[1],
                            email:data[2],
                            username:data[3],
                            phoneNumber:data[4]
                        }
                    });


                },
                error=>{
                    const  resMessage= (error.response && error.response.data
                        && error.response.data.message) || error.message||error.toString();
                    if(error.message==="Request failed with status code 400") {
                        console.log(error.response.data);
                    }

                })


    }







    render(){
        const {users,totalPages,totalElements,currentPage}=this.state;
        // const lastIndex= currentPage* usersPerPage;
        // const firstIndex= lastIndex - usersPerPage;
        // const currentUsers= users.slice(firstIndex,lastIndex);
        // const totalPages = users.length/usersPerPage;

        const pageNumCss={
            width:"45px",
            border:"1px solid #17A2B8",
            color:"#17A2B8",
            textAlign:"center",
            fontWeight:"bold"
        }
    return (
        <div>

            <div className="row" style={{border:"solid 2px black"}}>

                <div className="col-md-6">
                    <a href="/adminLecturerView" className="link-info" style={{fontSize:"26px"}}>Lecturer View</a>
                </div>
                <div className="col-md-6">
                    <a href="/adminStudentView" className="link-info" style={{fontSize:"26px"}}>Student View</a></div>


            </div>


            <div className="border border-dark bg-dark text-white">
                <h2>This is admin content</h2>
                <Card className={"border border-dark bg-dark text-white"} style={{marginTop:"50px"}}>
                    <Card.Header>List of Admin Users</Card.Header>

                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>UserName</th>
                                <th>Email Address:</th>
                                <th>Phone Number</th>


                            </tr>
                            </thead>
                            <tbody>
                            {
                                users.length === 0 ?

                                <tr align="center">
                                    <td colSpan="5"> No Admin Users available</td>
                                </tr> :
                                    users.map((user) => (
                                        <tr key={user.id}>
                                            <td>{user.name}</td>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>{user.phonenumber}</td>

                                        </tr>
                                    ))
                            }
                            </tbody>

                        </Table>
                    </Card.Body>
                    {users.length > 0 ?
                        <Card.Footer>
                            <div style={{"float": "left"}}>
                                Showing Page {currentPage} of {totalPages}
                            </div>

                            <div style={{"float": "right"}}>
                                <InputGroup size="sm">
                                    <InputGroup.Prepend>
                                        <Button type="button" variant="outline-info"
                                                disabled={currentPage === 1 ? true : false} onClick={this.firstPage}>
                                            <FontAwesomeIcon icon={faFastBackward}/> First
                                        </Button>
                                        <Button type="button" variant="outline-info"
                                                disabled={currentPage === 1 ? true : false} onClick={this.prevPage}>
                                            <FontAwesomeIcon icon={faStepBackward}/>
                                            Prev
                                        </Button>
                                    </InputGroup.Prepend>
                                    <FormControl style={pageNumCss} className="bg-dark" name="currentPage"
                                                 value={currentPage}/>
                                    <InputGroup.Append>

                                        <Button type="button" variant="outline-info"
                                                disabled={currentPage === totalPages ? true : false} onClick={this.nextPage}>
                                            <FontAwesomeIcon icon={faStepForward}/>
                                            Next
                                        </Button>
                                        <Button type="button" variant="outline-info"
                                                disabled={currentPage === totalPages ? true : false} onClick={this.lastPage}>
                                            <FontAwesomeIcon icon={faFastForward}/>
                                            Last
                                        </Button>
                                    </InputGroup.Append>
                                </InputGroup>

                            </div>
                        </Card.Footer> : null
                    }


                </Card>


            </div>


            <div style={{"float":"center","margin-top":"30px"}}>
                <Button type="button" variant="outline-info"  onClick={this.addAdmin}> ADD NEW ADMIN</Button>


            </div>
            <div style={{"margin-top":"50px","border":"solid 2px black"}}></div>

            <div>
                <h3 style={{"float":"center"}}>Search User</h3>


                <Accordion>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                Search Student
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <form onSubmit={this.searchStudent}>
                            <Card.Body>


                                <div className="form-group">
                                    <label>Enter the student's username:</label>
                                    <input className="form-control" placeholder="Enter student's username" value={this.state.studentUsername}  name="studentUsername" onChange={this.onChange} validations={[required]}/>
                                    <Button type="submit" variant="outline-info"  >Search</Button>

                                </div>
                            </Card.Body>
                            </form>

                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                Search Lecturer
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                <div className="form-group">
                                    <label>Enter the lecturer's username:</label>
                                    <input className="form-control" placeholder="Enter lecturer's username" value={this.state.lecturerUsername}  name="lecturerUsername" onChange={this.onChange} validations={[required]}/>
                                    <Button type="button" variant="outline-info" onClick={this.searchLecturer}>Search</Button>
                                </div>

                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>


                </Accordion>


            </div>

            <div style={{"margin-top":"50px","border":"solid 2px black"}}></div>


            <div style={{"margin-top":"10px"}}>Visualize Users data</div>


            <div className="row" style={{"border":"solid 0.5px black"}}>
                <div className="col-md-6"><a href="/numberUsers"> View Number of users</a></div>
                <div className="col-md-6"><a href="/departmentType"> Department Type</a></div>
            </div>

            <div className="row" style={{"border":"solid 0.5px black"}}>
                <div className="col-md-6"><a href="/lecturerType"> Lecturers in courses</a></div>
                <div className="col-md-6"><a href="/searchModule"> Search Module</a></div>
            </div>

            <div style={{"margin-top":"50px"}}></div>



        </div>
    )
    }
}



export default AdminHomePage;