import { Content } from 'antd/es/layout/layout';
import './App.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { Button } from 'antd';
import { setLogout } from './redux/authenticator';

function App() {
    const user = useAppSelector((state) => state.authenticator.user)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const logout = () => {
      dispatch(setLogout())
      navigate('/login')
    }

  return (
    <>
      <header className='h-16 lg:h-36 px-4 lg:px-2 bg-slate-700 flex justify-between items-center'>
        <nav>
          <ul className='flex space-x-4'>
            <li><Link to='/posts'>Postlarım </Link></li>
            <li><Link to='/about-me'>Hakkımda </Link></li>
            <li><Link to='/contact'>İletişim </Link></li>
          </ul>
        </nav>
        <div>
          {user.name} {user.surname}
          <Button onClick={() => logout()}>Çıkış</Button>
        </div>
      </header>
      <Content>
        <Outlet />
      </Content>
    </>
  );
}

export default App;
