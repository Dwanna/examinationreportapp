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

updateUser(username,name,email,phoneNumber){
    return axios
        .post(url +"admin/updateUser",{
            username,
            name,
            email,
            phoneNumber
        },{headers:authHeader()}).then(response=>{
            // if(response.data.token){
            //     localStorage.setItem("user",JSON.stringify(response.data));
            // }
            return response.data;
        },
            error=>{
                const  resMessage= (error.response && error.response.data
                    && error.response.data.message) || error.message||error.toString();
                if(error.message==="Request failed with status code 400") {
                    alert(error.response.data);
                }
            }
            )
}
postGrades(username,name,grade){
    console.log(username+name+grade);
    return axios
        .post(url +"lecturer/postGrades",{
            username,
            name,
            grade

        },{headers:authHeader()}).then(response=>{
                // if(response.data.token){
                //     localStorage.setItem("user",JSON.stringify(response.data));
                // }

                return response.data;
            },
            error=>{
                const  resMessage= (error.response && error.response.data
                    && error.response.data.message) || error.message||error.toString();
                if(error.message==="Request failed with status code 400") {
                    console.log(error.response.data);
                }
            }
        )

}


    logOut(){
        localStorage.removeItem("user");
    }

    getCurrentUser(){
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();