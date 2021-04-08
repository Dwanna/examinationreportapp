import React from "react";
import {Table} from "react-bootstrap";
import axios from "axios";
import authHeader from "../service/auth-header";

class LecturerHomePage extends React.Component {

    constructor(props) {
        super(props);

        this.state={
            modules: [],
            name:''

        };
        this.getStudent= this.getStudent.bind(this);
    }


    componentDidMount() {

        const storage= JSON.parse(localStorage.getItem('user'));
        const name=storage.username;


        return axios
            .get("http://localhost:8082/lecturer/searchLecturer/modules?username="+name,{headers:authHeader()}).then(response=>{

                   console.log(response.data);

                   this.setState({
                       modules:response.data
                   })



                },
                error=>{

                    const  resMessage= (error.response && error.response.data
                        && error.response.data.message) || error.message||error.toString();
                    if(error.message==="Request failed with status code 400") {
                        alert(error.response.data);
                    }
                })


    }

    getStudent(name){

        //console.log(name);


        return axios
            .get("http://localhost:8082/lecturer/studentModule?name="+name,{headers:authHeader()}).then(response=>{

                    console.log(response.data);

                    this.props.history.push({
                        pathname: '/lecturerStudentView',
                        state: {
                            students:response.data,
                            module:name

                        }
                    });



                },
                error=>{

                    const  resMessage= (error.response && error.response.data
                        && error.response.data.message) || error.message||error.toString();
                    if(error.message==="Request failed with status code 400") {
                        alert(error.response.data);
                    }
                })

    }

    render(){

        const {modules}=this.state;
        return (
            <div>
                <h2 style={{"float":"center","border":"solid 1px black"}}>LECTURER HOME PAGE</h2>



                <Table bordered hover striped variant="dark" style={{"margin-top":"20px"}}>
                    <thead>
                    <tr>
                        <th>Module Names</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        modules.length === 0 ?

                            <tr align="center">
                                <td colSpan="5"> You have no modules registered to you</td>
                            </tr> :
                            modules.map((module) => (
                                <tr >
                                    <td><button  className="nav-link" onClick={() => this.getStudent(module)}>{module}</button></td>

                                </tr>
                            ))
                    }



                    </tbody>
                </Table>
            </div>
        )
    }
}



export default LecturerHomePage;