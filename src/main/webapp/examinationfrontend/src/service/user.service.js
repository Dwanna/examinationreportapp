import axios from 'axios';
import authHeader from './auth-header';


const url= 'http://localhost:8082/';

class UserService{

    getAllUser(){
        return axios.get(url+'admin/allUsers',{headers:authHeader()});
    }
}


export default new UserService();