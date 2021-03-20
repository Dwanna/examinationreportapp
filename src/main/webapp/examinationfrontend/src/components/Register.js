import React from "react";

// import {Container,Form,Button} from "react-bootstrap";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Button from "react-validation/build/button";



class Register extends React.Component {


    render() {

        return (


              <div className="card card-container" >
                <Form>
                    <div className="form-group">
                        <label>Enter your username:</label>
                        <Input type="text" className="form-control" placeholder="Enter Username" />

                    </div>

                    <div className="form-group">
                        <label>Enter your email address:</label>
                        <Input type="text" className="form-control" placeholder="Enter email" />

                    </div>

                    <div className="form-group">
                        <label>Enter your Password:</label>
                        <Input type="text" className="form-control" placeholder="Enter Username" />

                    </div>

                    <div className="form-group">
                        <label>Enter your Name:</label>
                        <Input type="text" className="form-control" placeholder="Enter Name" />

                    </div>
                    <div className="form-group">
                        <label>Enter your PhoneNumber:</label>
                        <Input type="text" className="form-control" placeholder="Enter PhoneNumber" />

                    </div>



                    <Button className="btn btn-primary btn-block">
                        Submit
                    </Button>
                </Form>

              </div>





        );
    }

}



export default Register;