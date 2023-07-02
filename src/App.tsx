import { Content } from 'antd/es/layout/layout';
import './App.css';
import { Link, Outlet } from 'react-router-dom';
import { useAppSelector } from './redux/hooks';

function App() {
    const user = useAppSelector((state) => state.authenticator.user)
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
        </div>
      </header>
      <Content>
        <Outlet />
      </Content>
    </>
  );
}

export default App;
