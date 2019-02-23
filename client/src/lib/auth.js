
import axios from 'axios';


const instance = axios.create({
    baseURL: process.env.NODE_ENV == "production" ? "":'http://localhost:3001',
    timeout: 1000,
    withCredentials: true,
});

export class AuthAPI {

    static errorHandler(e) {
        console.error("AUTH API ERROR");
        console.error(e);
        throw e;
    }

    static currentUser(){
        return instance.get('/api/auth/currentuser')
        .then((res) => res.data.user)
        .catch(AuthAPI.errorHandler)
    }

    static login(username, password){
        return instance.post('/api/auth/login',{username, password})
        .then((res) => res.data)
        .catch(AuthAPI.errorHandler)
    }

    static signup(username, password){
        return instance.post('/api/auth/signup',{username, password})
        .then((res) => res.data.user)
        .catch(AuthAPI.errorHandler)

    }
    static logout(username, password){
        return instance.get('/api/auth/logout')
        .then((res) => console.log("Logout"))
        .catch(AuthAPI.errorHandler)
    }
}

// let p = new AuthAPI()
// p.login()

// AuthAPI.login()