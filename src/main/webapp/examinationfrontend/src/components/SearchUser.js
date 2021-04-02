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



        this.onChange= this.onChange.bind(this);
        this.back= this.back.bind(this);

        this.updateUser= this.updateUser.bind(this);
        this.deleteUser= this.deleteUser.bind(this);


    }

    componentDidMount() {

        this.setState({
            name:this.props.history.location.state.name,
            email:this.props.history.location.state.email,
            username:this.props.history.location.state.username,
            phoneNumber:this.props.history.location.state.phoneNumber
        })
    }

    updateUser(event){
        event.preventDefault();


        const name=this.state.name;

        const username= this.state.username;
        const email= this.state.email;
        const phoneNumber= this.state.phoneNumber;


        return axios
            .put("http://localhost:8082/admin/updateUser",{
                "username":username,
                "name":name,
                "email":email,
                "phoneNumber":phoneNumber
            },{headers:authHeader()}).then(response=>{

                alert("User has been updated");

                return response.data;
            },
                error=>{
                    console.log(phoneNumber);
                    const  resMessage= (error.response && error.response.data
                        && error.response.data.message) || error.message||error.toString();
                    if(error.message==="Request failed with status code 400") {
                        alert(error.response.data);
                    }
                })


    }

    deleteUser(event){

    const username= this.state.username;

        return axios
            .delete("http://localhost:8082/admin/deleteUser?username="+username,{headers:authHeader()}).then(response=>{

                    alert("User has been deleted");
                    this.props.history.push('/adminHomePage');

                },
                error=>{

                    const  resMessage= (error.response && error.response.data
                        && error.response.data.message) || error.message||error.toString();
                    if(error.message==="Request failed with status code 400") {
                        alert(error.response.data);
                    }
                })





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
        //const{id,name,email,username,phoneNumber}= this.props.history.location.state;

    return (
        <div style={{"color": "black"}}>




                <input className="form-control" value={this.state.username} name="username"  type="hidden" />


            <div className="form-group">
                <label>Name:</label>
                <input className="form-control" value={this.state.name}  name="name" onChange={this.onChange}/>


            </div>
            <div className="form-group">
                <label>Email:</label>
                <input className="form-control" value={this.state.email} name="email" onChange={this.onChange}/>

            </div>
            <div className="form-group">
                <label>PhoneNumber:</label>
                <input className="form-control" value={this.state.phoneNumber} name="phoneNumber" onChange={this.onChange}/>

            </div>

            <div className="row">
                <div className="col-md-6"><Button type="button" variant="outline-success" onClick={this.updateUser}>Update</Button></div>
                <div className="col-md-6"><Button type="button" variant="outline-danger" onClick={this.deleteUser}>Delete</Button></div>


            </div>


            <Button type="button" variant="outline-info" onClick={this.back} style={{"float":"center","margin-top":"30px"}} > GO BACK</Button>

        </div>




    );


}
}


export default SearchUser;