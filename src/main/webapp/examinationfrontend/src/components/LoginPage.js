import React,{ useState }  from 'react'
import {Tabs,TabContent,Tab,Card,Col} from 'react-bootstrap'
import Form from "react-validation/build/form"
import Input from "react-validation/build/input"
import CheckButton from "react-validation/build/button"

import  LecturerLogin from "./LecturerLogin"
import  StudentLogin from "./StudentLogin"

import AuthService from "../service/auth.service"


const required = value=>{
    if(!value){
        return (
            <div className="alert alert-danger" role="alert">This field is required</div>
        )
    }
}
class LoginPage extends React.Component{
constructor(props) {
    super(props);
    // this.admin={ username:' ',password:' '}
    this.onChange= this.onChange.bind(this);
    this.state={adminUsername:'',adminPassword:'',loading: false,
    message:''}

    this.adminLogin= this.adminLogin.bind(this);


}
adminLogin(event)
{
    // alert(this.state.adminUsername+''+ this.state.adminPassword);
    event.preventDefault();

    this.setState({
        message:"",
        loading:true
    });
    this.form.validateAll();

    if(this.checkBtn.context._errors.length === 0){
            AuthService.loginAdmin(this.state.adminUsername, this.state.adminPassword).then(

            response => {
                // console.log(response.data.role);
                //  this.props.history.push('/adminHomePage');
                // window.location.reload();
                const item= JSON.parse(localStorage.getItem("user"));
                if(item.role!="ADMIN"){
                    this.setState({
                        loading:false,
                        message: "It looks like you are not an admin"
                    });
                    localStorage.removeItem("user");
                }
                else{  this.props.history.push('/adminHomePage');
                    window.location.reload();}


            },
            error => {
                const  resMessage= (error.response && error.response.data
                    && error.response.data.message) || error.message||error.toString();
                this.setState({
                    loading:false,
                    message: resMessage
                });
            }


        );
    }
    else{
        this.setState({
            loading:false
        });
    }


}

onChange(event){
    this.setState(
        {
            [event.target.name]:event.target.value
        }
    )
}





    render(){

        return (


                    <Card style={{ width: '100%' }}>
                        <Card.Header as="h5">Login for Admin</Card.Header>
                        <Form  onSubmit={this.adminLogin}
                        ref={c=>{
                            this.form=c;
                        }}
                        >
                        <Card.Body>

                                <div className="form-group" >
                                <label>Username</label>
                                <Input type="text" className="form-control" value={this.state.adminUsername}  placeholder="Enter Username" name="adminUsername" onChange={this.onChange} validations={[required]}/>
                                </div>


                                <div className="form-group" >
                                <label>Password</label>
                                <Input type="password" className="form-control" placeholder="Enter your password" value={this.state.adminPassword} name= "adminPassword" onChange={this.onChange}   validations={[required]} />
                                </div>



                        </Card.Body>
                            <Card.Footer>
                                <button className="btn btn-primary btn-block" disabled={this.state.loading}>
                                    {this.state.loading && (
                                        <span className="spinner-border spinner-border-sm"></span>
                                    )}
                                    <span>Login</span>

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
                            </Card.Footer>
                        </Form>


                    </Card>


        );
    }


}

export default LoginPage;