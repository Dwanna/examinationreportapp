import React from "react";
import {Button} from "react-bootstrap";
import axios from "axios";
import authHeader from "../service/auth-header";
import AuthService from "../service/auth.service";


class LecturerStudentGrade extends React.Component {


    constructor(props) {
        super(props);

        this.state={
            username:'',
            module:' ',
            percentage:''
        }
        this.uploadGrade= this.uploadGrade.bind(this);
        this.onChange=this.onChange.bind(this);
        this.back= this.back.bind(this);
    }

    componentDidMount() {
        this.getGrades();
    }

    onChange(event){
        this.setState(
            {
                [event.target.name]:event.target.value
            }
        )
    }

    back(){
        this.props.history.push("/lecturerHomePage");
    }

    getGrades(){
        const username= this.props.history.location.state.username;
        const module=this.props.history.location.state.name;


        axios.get("http://localhost:8082/lecturer/findGrade?username="+username+"&module="+module,{headers:authHeader()})
            .then(response=>response.data)
            .then((data)=>{

                this.setState({
                    username:data.username,
                    percentage:data.gradePercentage,
                    module:module
                })
                    console.log(data);
                },
                error=>{
                    const  resMessage= (error.response && error.response.data
                        && error.response.data.message) || error.message||error.toString();
                    if(error.message==="Request failed with status code 400") {
                        console.log(error.response.data);
                    }

                })


    }

    uploadGrade(){
        const username= this.props.history.location.state.username;
        const module=this.props.history.location.state.name;
        AuthService.postGrades(username,module,parseInt(this.state.percentage)).then(

            () => {
              alert("grades have been posted");
                window.location.reload();
            },
            error => {
                const  resMessage= (error.response && error.response.data
                    && error.response.data.message) || error.message||error.toString();

            }


        );

    }


    render(){

        return(

            <div>
                <h2 style={{"border":"solid 1px black"}}>Student Username:{this.props.history.location.state.username}</h2>


                <h3 style={{"border":"solid 1px black"}}>Module Name:{this.props.history.location.state.name}</h3>


                <div className="form-group">
                    <label>Input grade Percentage/student grade:</label>
                    <input placeholder="Enter student's grade percentage" className="form-control" value={this.state.percentage} name={"percentage"} onChange={this.onChange}/>
                </div>

                <Button type="button" variant="outline-success" onClick={this.uploadGrade} > UPLOAD</Button>

                <Button type="button" variant="outline-info" style={{"margin-left":"10px"}} onClick={this.back} > BACK</Button>

            </div>
        );
    }
}



export default LecturerStudentGrade;