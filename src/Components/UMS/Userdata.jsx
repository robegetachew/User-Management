import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Userdata = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [userdata, setUserdata] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Move the declaration of access_token inside the useEffect
    const access_token = Cookies.get('access_token'); // Get token from cookies
    setIsAuth(!!access_token);

    if (access_token) {
      fetchUserData(access_token); // Pass token to fetchUserData
    }
  }, []); // Remove access_token as a dependency

  const fetchUserData = async (access_token) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://192.168.0.191:8000/api/profile', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile data');
      }
      
      console.log(response)

      const data = await response.json();
       setUserdata(data.data); // Assuming the user data is within a "user" property
    } catch (error) {
      setError(error.message);
      // console.error('Error fetching profile data', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>User Information</h1>
      <h2>Authenticated: {isAuth.toString()} : that is why u r here</h2>
      {isLoading && <p>Loading user data...</p>}
      {error && <p>Error: {error}</p>}
      {userdata && (
        <div>
          <h3>Name: {userdata.name}</h3>
          <h3>Email: {userdata.email}</h3>
        </div>
      )}
    </div>
  );
};

export default Userdata;
