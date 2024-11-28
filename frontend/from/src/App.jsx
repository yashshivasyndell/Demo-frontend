import { useEffect } from 'react';
import './App.css';
import { Form } from './components/Form';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './components/Login';
import { Home } from './components/Home';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './redux/store/action';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);
console.log(isAuthenticated)
  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(loadUser());
    }
  }, [dispatch]);
    
  return (
    <>
      <Routes>
        <Route path="/register" element={isAuthenticated ? <Navigate to="/home"/>:<Form/>} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/home"/>:<Login/>} />
        <Route
          path="/home"
          element={
            isAuthenticated ? (
              <Home />
            ) : (
              !loading && <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
