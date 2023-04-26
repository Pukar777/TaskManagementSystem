import { useState } from 'react';
import { register, login, logout, getUser } from './Api';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  const handleLogin = async (email, password) => {
    try {
      const { access_token } = await login(email, password);
      const userDetails = await getUser(access_token);
      // console.log(userDetails.name);
      setUser(userDetails);
      setError(null);
      localStorage.setItem('accessToken', access_token);
      navigate('/dashboard-react');
      // console.log(localStorage.getItem('accessToken'));

    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const handleRegister = async (name, email, contact, address, password) => {
    try {
      const { access_token } = await register(name, email, contact, address, password );
      const userDetails = await getUser(access_token);
      console.log(userDetails);
      setUser(userDetails);
      setError(null);
      localStorage.setItem('accessToken', access_token);
      navigate('/dashboard-react');
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout(localStorage.getItem('accessToken'));

      setUser(null);
      localStorage.removeItem('accessToken');
      navigate('/login');
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return { user, setUser, error, setError, handleLogin, handleRegister, handleLogout };
};

export default useAuth;
