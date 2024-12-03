import { useEffect } from 'react';
import './App.css';
import { Form } from './components/Form';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Login } from './components/Login';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './redux/store/action';
import  Dashboard  from './components/Dashboard';
import { Layout } from './components/Layout';
import Sidebar from './components/Sidebar';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);
console.log(isAuthenticated)
  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(loadUser());
    }else{
      navigate('/dashboard')
    }
  }, [dispatch]);
    
  return (
    <>
      
       {isAuthenticated ? <Routes> <Route path='*' element={<Layout/>}/> </Routes> : 
       <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Form/>}/>
      </Routes>
       }
    </>
  );
}

export default App;
