import axios from "axios";
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


    logOut(){
        localStorage.removeItem("user");
    }

    getCurrentUser(){
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();