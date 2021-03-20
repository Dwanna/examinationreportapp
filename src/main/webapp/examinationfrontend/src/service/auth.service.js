import axios from "axios";
import authHeader from "./auth-header";
const url= "http://localhost:8082/";

class AuthService{
    loginAdmin(username,password){

        localStorage.removeItem("user");
        return axios
            .post(url +"users/authenticate",{
                username,
                password
            }).then(response=>{
                if(response.data.token){
                    localStorage.setItem("user",JSON.stringify(response.data));
                }
                return response.data;
            })

    }
    loginLecturer(username,password){

        localStorage.removeItem("user");
        return axios
            .post(url +"users/authenticate",{
                username,
                password
            }).then(response=>{
                if(response.data.token){
                    localStorage.setItem("user",JSON.stringify(response.data));
                }
                return response.data;
            })

    }
    loginStudent(username,password){

        localStorage.removeItem("user");
        return axios
            .post(url +"users/authenticate",{
                username,
                password
            }).then(response=>{
                if(response.data.token){
                    localStorage.setItem("user",JSON.stringify(response.data));
                }
                return response.data;
            })

    }

    createAdmin(username,password,name,email,phonenumber){


        return axios
            .post(url +"admin/createAdmin",{
                username,
                password,
                name,
                email,
                phonenumber
            },{headers:authHeader()}).then(response=>{
                // if(response.data.token){
                //     localStorage.setItem("user",JSON.stringify(response.data));
                // }
                return response.data;
            })

    }


    logOut(){
        localStorage.removeItem("user");
    }

    getCurrentUser(){
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();