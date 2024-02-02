// Import necessary dependencies and assets
import './Myprofile.css';
import person from '../Assets/person.png';
import { useUser } from '../../UserContext';
import separator from '../Assets/separator.png';
import roleIcon from '../Assets/user.png';
import activityStatusIcon from '../Assets/acstatus.png';
import genderIcon from '../Assets/male.png';
import emailIcon from '../Assets/email.png';
import phoneIcon from '../Assets/phone.png';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Myprofile = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [userdata, setUserdata] = useState(null);
  const [userinfo, setUserinfo] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  
  const { username, country, role, activity , gender, email, phoneNumber, profilePicturePath } = useUser() || {};

  useEffect(() => {
    const access_token = Cookies.get('access_token'); 
    setIsAuth(!!access_token);

    if (access_token) {
      fetchUserData(access_token); 
    }
  }, []); 

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

      const data = await response.json();
      setUserdata(data.data);
      setUserinfo(data.info); // Assuming the user data is within a "user" property
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Render the Myprofile component
  return (
    <div className="my-profile-container">
      <div className="profilee-picture" style={{ backgroundImage: `url(${profilePicturePath || person})` }}></div>
      <div className="user-info">
        {/* Display user information */}
        <p>
          <strong>Username: {userdata?.name || username}</strong>
        </p>
        <p>Country: {userinfo?.location || country}</p>
        <img src={separator} alt="" className="sep" />
        <p>
          <img src={roleIcon} alt="Role Icon" className="icon" />
         Role: {userdata?.role || role} 
        </p>
        <p>
  <img src={activityStatusIcon} alt="Activity Status Icon" className="icon" />
  Activity Status: 
  <span style={{ color: userdata?.is_active === 1 ? 'green' : 'red' }}>
    {userdata?.is_active === 1 ? 'Active' : 'Inactive'}
  </span>
</p>

        <img src={separator} alt="" className="sep" />
        <p>
          <img src={genderIcon} alt="Gender Icon" className="icon" />
          Gender: {gender}
        </p>
        <p>
  <img src={emailIcon} alt="Email Icon" className="icon" />
  Email: {userdata?.email || email}
</p>
        <p>
          <img src={phoneIcon} alt="Phone Icon" className="icon" />
          Phone Number: {phoneNumber}
        </p>
      </div>
    </div>
  );
};

export default Myprofile;
