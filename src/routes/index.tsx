import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import App from '../App'
import SignIn from './Authentication'
import { useAppSelector } from '../redux/hooks'
import Posts from './Posts'


export default function Router() {
  const isLoggedIn = useAppSelector((state) => state.authenticator.isLoggedIn)
  
  const PrivateRoute = ({ children }: any) => {
    return isLoggedIn ? children : <Navigate to='/login' />
  }

  const PrivateRouteAuth = ({ children }: any) => {
    return isLoggedIn ? <Navigate to='/' /> : children  
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN PAGE */}        
        <Route
          path="/login"
          element={
            <PrivateRouteAuth>
              <SignIn />
            </PrivateRouteAuth> 
            }
        />
       
        {/* APP */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <App />
            </PrivateRoute>
          }>
        <Route path='/posts' element={<Posts />}/>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}
