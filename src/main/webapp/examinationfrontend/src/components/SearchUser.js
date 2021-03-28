import React from "react";
import {Button} from "react-bootstrap";
import axios from "axios";
import authHeader from "../service/auth-header";


class SearchUser extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            name:'',
            email:'',
            username:'',
            phoneNumber:''
        }

        this.getStudentUser= this.getStudentUser.bind(this);
        this.onChange= this.onChange.bind(this);
        this.back= this.back.bind(this);

        this.updateUser= this.updateUser.bind(this);
        this.deleteUser= this.deleteUser.bind(this);


    }

    // componentDidMount() {
    // // this.getStudentUser();
    //
    //     console.log(this.props.history.location.state.phoneNumber);
    // }

    updateUser(event){
        event.preventDefault();


    }

    deleteUser(event){

    }

    back (){
        this.props.history.push("/adminHomePage");
    }


    onChange(event){
        this.setState(
            {
                [event.target.name]:event.target.value
            }
        )
    }



render() {
        const{id,name,email,username,phoneNumber}= this.props.history.location.state;

    return (
        <div style={{"color": "black"}}>
            {username}



                <input className="form-control" value={id} type="hidden" />


            <div className="form-group">
                <label>Name:</label>
                <input className="form-control" value={name} />


            </div>
            <div className="form-group">
                <label>Email:</label>
                <input className="form-control" value={email}/>

            </div>
            <div className="form-group">
                <label>PhoneNumber:</label>
                <input className="form-control" value={phoneNumber}/>

            </div>

            <div className="row">
                <div className="col-md-6"><Button type="button" variant="outline-success">Update</Button></div>
                <div className="col-md-6"><Button type="button" variant="outline-danger">Delete</Button></div>


            </div>


            <Button type="button" variant="outline-info" onClick={this.back} style={{"float":"center","margin-top":"30px"}} > GO BACK</Button>

        </div>




    );


}
}


export default SearchUser;