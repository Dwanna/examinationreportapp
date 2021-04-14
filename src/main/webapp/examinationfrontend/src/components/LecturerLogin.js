import React,{ useState }  from 'react'
import {Tabs,TabContent,Tab,Card,Col} from 'react-bootstrap'
import Form from "react-validation/build/form"
import AuthService from "../service/auth.service";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";


class LecturerLogin extends React.Component {

    constructor(props) {
        super(props);
        // this.lecturer={ username:' ',password:' '}
        this.onChange= this.onChange.bind(this);
        this.state={lecturerUsername:'',lecturerPassword:'',loading:false,message:''}
        this.lecturerLogin= this.lecturerLogin.bind(this);


    }

    onChange(event){
        this.setState(
            {
                [event.target.name]:event.target.value
            }
        )
    }

    lecturerLogin(event){

        event.preventDefault();

        this.setState({
            message:"",
            loading:true
        });
        this.form.validateAll();

        if(this.checkBtn.context._errors.length === 0){
            AuthService.loginLecturer(this.state.lecturerUsername, this.state.lecturerPassword).then(

                () => {
                    const item= JSON.parse(localStorage.getItem("user"));
                    if(item.role!=="LECTURER"){
                        this.setState({
                            loading:false,
                            message: "It looks like you are not an lecturer"
                        });
                        localStorage.removeItem("user");
                    }
                    else{

                        // this.props.history.push('/lecturerHomePage');

                        this.props.history.push({
                            pathname: '/lecturerHomePage',
                            state: {
                                username:this.state.lecturerUsername
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
                <Card.Header as="h5">Login for Lecturer</Card.Header>
                <Form  onSubmit={this.lecturerLogin}
                       ref={c=>{
                           this.form=c;
                       }}
                >
                    <Card.Body>

                        <div className="form-group" >
                            <label>Username</label>
                            <Input type="text" className="form-control" value={this.state.lecturerUsername}  placeholder="Enter Username" name="lecturerUsername" onChange={this.onChange} required/>
                        </div>


                        <div className="form-group" >
                            <label>Password</label>
                            <Input type="password" className="form-control" placeholder="Enter your password" value={this.state.lecturerPassword} name= "lecturerPassword" onChange={this.onChange}   required />
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

export default LecturerLogin;