import { useEffect } from 'react';
import './App.css';
import { Form } from './components/Form';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Login } from './components/Login';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './redux/store/action';
import { Layout } from './components/Layout';
import Sidebar from './components/Sidebar';
import { ToastContainer } from 'react-toastify';
import Loader from './components/Loader';
import { UserLogin } from './components/UserLogin';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);
console.log("admin auth is: ",isAuthenticated)
  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(loadUser());
      navigate('/adminlogin')
    }else{
      navigate('/dashboard')
    }
  }, [dispatch]);

  return (
    <div className='h-screen overflow-y-auto'>
    <ToastContainer />
       {isAuthenticated ? <Routes> <Route path='*' element={<Layout/>}/></Routes> : 
       <Routes>
        <Route path='/adminlogin' element={<Login/>}/>
        <Route path='/register' element={<Form/>}/>
        <Route path='/userlogin' element={<UserLogin/>}/>
      </Routes>
       }
    </div>
  );
}

export default App;
