import React ,{ useState } from "react";

 import {Button, Card} from "react-bootstrap";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import axios from "axios";
import authHeader from "../service/auth-header";
import AuthService from "../service/auth.service";
import CheckButton from "react-validation/build/button";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};


class AdminAddAdmin extends React.Component {
    constructor(props) {
        super(props);


        this.state={adminUsername:' ',adminPassword:' ', adminName:' ',adminEmail:' ',adminPhonenumber:' ',loading: false,
            message:' '}

        this.back= this.back.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhonenumber = this.onChangePhonenumber.bind(this);
        this.createAdmin= this.createAdmin.bind(this);

    }



    onChangeUsername(event) {
        this.setState({
            adminUsername: event.target.value
        });
    }
    onChangePassword(event) {
        this.setState({
            adminPassword: event.target.value
        });
    }
    onChangeName(event) {
        this.setState({
            adminName: event.target.value
        });
    }
    onChangeEmail(event) {
        this.setState({
            adminEmail: event.target.value
        });
    }
    onChangePhonenumber(event) {
        this.setState({
            adminPhonenumber: event.target.value
        });
    }



    createAdmin(event){
        event.preventDefault();

        this.setState({
            message:"",
            loading:true
        });
        this.form.validateAll();

        if(this.checkBtn.context._errors.length === 0){
            console.log(this.state.adminUsername+ this.state.adminPassword+this.state.adminName+this.state.adminEmail+this.state.adminPhonenumber);
            AuthService.createAdmin(this.state.adminUsername, this.state.adminPassword,this.state.adminName,this.state.adminEmail.toLowerCase(),this.state.adminPhonenumber).then(


                response => {

                    this.setState({

                        loading:false
                    });
                    alert("User has been added");



                },
                error => {
                   // console.log(error.message)
                    const  resMessage= (error.response && error.response.data
                        && error.response.data.message) || error.message||error.toString();
                    if(error.message==="Request failed with status code 400"){

                        this.setState({
                            loading:false,
                            message: error.response.data
                        });
                    }
                    else{
                        this.setState({
                            loading:false,
                            message: resMessage
                        });
                    }

                }


            );
        }
        else{
            this.setState({
                loading:false
            });
        }


    }


    back (){
         this.props.history.push("/adminHomePage");
    }

    render() {

        return (


            <div className="card card-container" >
                <Form onSubmit={this.createAdmin}
                      ref={c=>{
                          this.form=c;
                      }}>
                    <div className="form-group">
                        <label>Enter admin's username:</label>
                        <Input type="text" className="form-control" placeholder="Enter Username" value={this.state.adminUsername} name="adminUsername" onChange={this.onChangeUsername} validations={[required]}/>

                    </div>
                    <div className="form-group">
                        <label>Enter admin's password:</label>
                        <Input type="text" className="form-control" placeholder="Enter Username" value={this.state.adminPassword} name="adminPassword" onChange={this.onChangePassword} validations={[required]}/>

                    </div>

                    <div className="form-group">
                        <label>Enter admin's name:</label>
                        <Input type="text" className="form-control" placeholder="Enter Name" onChange={this.onChangeName} name="adminName" value={this.state.adminName} validations={[required]} />

                    </div>



                    <div className="form-group">
                        <label>Enter admin's email:</label>
                        <Input type="text" className="form-control" placeholder="Enter Email" onChange={this.onChangeEmail} name="adminEmail" value={this.state.adminEmail} validations={[required]}/>

                    </div>
                    <div className="form-group">
                        <label>Enter your PhoneNumber:</label>
                        <Input type="text" className="form-control" placeholder="Enter PhoneNumber" onChange={this.onChangePhonenumber} name="adminPhonenumber" value={this.state.adminPhonenumber} validations={[required]}/>

                    </div>


                    <button className="btn btn-primary btn-block" disabled={this.state.loading}>
                        {this.state.loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span>CREATE ADMIN</span>

                    </button>

                    {
                        this.state.message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {this.state.message}
                                </div>
                            </div>
                        )
                    }
                    <CheckButton style={{display:"none"}} ref={c=>{this.checkBtn=c;}}/>
                </Form>


                <div style={{"float":"center","margin-top":"30px"}}>
                    <Button type="button" variant="outline-info" onClick={this.back}  > GO BACK</Button>


                </div>
                <div style={{"margin-top":"50px"}}></div>

            </div>





        );
    }

}



export default AdminAddAdmin;