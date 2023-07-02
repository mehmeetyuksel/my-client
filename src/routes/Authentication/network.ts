import axios from "axios";
import { UserLogin } from "./type";

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