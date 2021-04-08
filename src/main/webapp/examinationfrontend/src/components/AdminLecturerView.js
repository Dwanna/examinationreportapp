import React from "react";
import {Tabs, Table, TabContent, Tab, Card, Col, ButtonGroup,Button,InputGroup,FormControl} from 'react-bootstrap'

import "../App.css";
import authHeader from "../service/auth-header";
import axios from "axios";
import {faTrash,faEdit,faStepBackward,faStepForward,faFastForward,faFastBackward} from "@fortawesome/free-solid-svg-icons";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'



class AdminLecturerView extends React.Component {

constructor(props) {

    super(props);
    this.state = {
        users: [],
        currentPage: 1,
        usersPerPage: 5
    };
    this.firstPage = this.firstPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.lastPage = this.lastPage.bind(this);
    this.back= this.back.bind(this);
}

    componentDidMount() {
        this.getAllLecturerUser(this.state.currentPage)
    }
    back (){
        this.props.history.push("/adminHomePage");
    }

    getAllLecturerUser(currentPage){
        currentPage-=1;
        axios.get("http://localhost:8082/admin/allLecturers?page="+currentPage+"&size="+this.state.usersPerPage,{headers:authHeader()})
            .then(response=>response.data)
            .then((data)=>{
                console.log(data)


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
            this.getAllLecturerUser(firstPage);
        }
    }
    prevPage =()=> {
        let prevPage=1;
        if(this.state.currentPage>prevPage){
            this.getAllLecturerUser(this.state.currentPage - prevPage)
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
            this.getAllLecturerUser(Math.ceil(this.state.totalElements/this.state.usersPerPage));
        }
    }

    nextPage =()=> {
        if(this.state.currentPage<Math.ceil(this.state.totalElements/this.state.usersPerPage)){
            this.getAllLecturerUser(this.state.currentPage+1);
        }
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




                <div className="LecturerContent">
                    <h2>This is Lecturer content</h2>
                    <Card className={"border border-dark bg-dark text-white"} style={{marginTop:"50px"}}>
                        <Card.Header>List of Lecturer Users</Card.Header>

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
                                            <td colSpan="5"> No Lecturer Users available</td>
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
                    <Button type="button" variant="outline-info" onClick={this.back}  > GO BACK</Button>


                </div>


                <div></div>



            </div>
        );
    }
}



export default AdminLecturerView;