import { useEffect, useState } from 'react';
import useAuth from './Auth';
import {getUser } from './Api';

const Dashboard = () => {


  const { user, setUser, error, handleLogout } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        // console.log(accessToken);
        const userDetails = await getUser(accessToken)
        // console.log(userDetails);
        setUser(userDetails)
      } catch (error) {
        handleLogout();
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}</h1> 
      <p>{user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

 export default Dashboard;
