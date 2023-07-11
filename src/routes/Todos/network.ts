import axios from "axios"
import store from "../../redux/store";

export const getTodosNetwork = async () => {
    const accessToken = store.getState().authenticator.accessToken
    try {
        let response = await axios.get('http://localhost:8080/api/user/get-todos', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        return response
    } catch (err) {
        throw err
    }
}

export const addTodoNetwork = async (values: any) => {
    const accessToken = store.getState().authenticator.accessToken
    try {
        let response = await axios.post('http://localhost:8080/api/user/add-todo', values, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        return response
    } catch (err) {
        throw err
    }

}