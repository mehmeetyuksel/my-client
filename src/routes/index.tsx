import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import App from '../App'
import SignIn from './Authentication/login'
import { useAppSelector } from '../redux/hooks'
import Posts from './Posts'
import Todos from './Todos'
import SignUp from './Authentication/signup'


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
        <Route
          path="/sign-up"
          element={
            <PrivateRouteAuth>
              <SignUp />
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
        <Route path='/todos' element={<Todos />}/>
        <Route path='/contact' element={<>Henüz yapılmadı...</>}/>
        <Route path='*' element={<>Not Found...</>}/>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}
