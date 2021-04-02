import React,{ useState }  from 'react'
import {Tabs,TabContent,Tab,Card,Col} from 'react-bootstrap'
import AuthService from "../service/auth.service";
import Form from "react-validation/build/form"
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";


class StudentLogin extends React.Component {

    constructor(props) {
        super(props);
        // this.Student={ username:' ',password:' '}
        this.onChange= this.onChange.bind(this);
        this.state={studentUsername:' ',studentPassword:' ',loading: false,
            message:''}
        this.StudentLogin= this.StudentLogin.bind(this);


    }

    onChange(event){
        this.setState(
            {
                [event.target.name]:event.target.value
            }
        )
    }

    StudentLogin(event){
        event.preventDefault();

        this.setState({
            message:"",
            loading:true
        });
        this.form.validateAll();

        if(this.checkBtn.context._errors.length === 0){
            AuthService.loginStudent(this.state.studentUsername, this.state.studentPassword).then(

                () => {
                    const item= JSON.parse(localStorage.getItem("user"));
                    if(item.role!=="STUDENT"){
                        this.setState({
                            loading:false,
                            message: "It looks like you are not an student"
                        });
                        localStorage.removeItem("user");
                    }
                    else{    this.props.history.push({
                        pathname: '/studentHomePage',
                        state: {
                            username:this.state.studentUsername
                        }
                    })
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

    render() {

        return (
            <Card style={{ width: '100%' }}>
                <Card.Header as="h5">Login for Student</Card.Header>
                <Form  onSubmit={this.StudentLogin}
                       ref={c=>{
                           this.form=c;
                       }}
                >
                    <Card.Body>

                        <div className="form-group" >
                            <label>Username</label>
                            <input type="text" className="form-control" value={this.state.studentUsername}  placeholder="Enter Username" name="studentUsername" onChange={this.onChange} required/>
                        </div>


                        <div className="form-group" >
                            <label>Password</label>
                            <input type="text" className="form-control" placeholder="Enter your password" value={this.state.studentPassword} name= "studentPassword" onChange={this.onChange}   required />
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

export default StudentLogin;