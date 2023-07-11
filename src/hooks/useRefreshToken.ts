
import axios from "axios"
import { useAppDispatch } from "../redux/hooks"
import store from "../redux/store"
import { setUser } from "../redux/authenticator"

const useRefreshToken = () => {

    const dispatch = useAppDispatch()
    const currentAuth = store.getState().authenticator

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        })
        dispatch(setUser({...currentAuth, accessToken: response.data.accessToken}))
        return response.data.accessToken
    }


  return refresh
}

export default useRefreshToken