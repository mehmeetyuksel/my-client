import axios from "axios";
import { useAppSelector } from "../../redux/hooks";
import store from "../../redux/store";



export const getPostsNetwork = async () => {
    const accessToken = store.getState().authenticator.accessToken
    try {
        let response = await axios.get('http://localhost:8080/api/user/get-posts', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        return response
    } catch (err) {
        throw err
    }

}