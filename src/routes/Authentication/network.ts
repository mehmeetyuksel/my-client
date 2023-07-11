import axios from "axios";
import { UserLogin, UserSignUp } from "./type";

export const loginNetwork = async (values: UserLogin) => {
    const {email, password} = values 
    
    try {
        let response = await axios.post('http://localhost:8080/log-in', {
            email,
            password
        })
        return response
    } catch (err) {
        throw err
    }    
}

export const signupNetwork = async (values: UserSignUp) => {
    const {email, password, name, surname} = values 
    
    try {
        let response = await axios.post('http://localhost:8080/sign-up', {
            name, 
            surname,
            email,
            password
        })
        return response
    } catch (err) {
        throw err
    }    
}