import React from "react";
import {Card, Table} from "react-bootstrap";
import axios from "axios";
import authHeader from "../service/auth-header";

class StudentHomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            grades:[]
        }
    }

    componentDidMount() {
this.getGrades();
    }

    getGrades(){

        const username= this.props.history.location.state.username;
        axios.get("http://localhost:8082/student/myGrades?username="+username,{headers:authHeader()})
            .then(response=>response.data)
            .then((data)=>{

                    this.setState({
                       grades:data
                    })
                    console.log(this.state.grades);
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

        return (
            <div>
                <h2 style={{"border":"solid 1px grey"}}>Hey {this.props.history.location.state.username}</h2>
                <h3>Your grades are below</h3>

                <div style={{"margin-top":"90px"}}>


                    <Table bordered hover striped variant="dark">
                        <thead>
                        <tr>
                            <th>Module Name</th>
                            <th>Grade percentage</th>



                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.grades.length === 0 ?


                                <h4 style={{"float":"center","margin-top":"30px"}}> Oops it looks like you have no grades, try contact your head of department</h4>
                                :
                                this.state.grades.map((grade) => (



                                    <tr key={grade[0]}>
                                        <td  >{grade[0]}</td>
                                        <td >{grade[1]}</td>
                                    </tr>



                                ))
                        }

                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}



export default StudentHomePage;