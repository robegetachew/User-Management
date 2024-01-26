import React, { useState, useEffect } from 'react';
import './Signin.css';
import emailIcon from '../Assets/email.png';
import passwordIcon from '../Assets/password.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Userdata from './Userdata';
const Signin = () => {
  const navigate = useNavigate();
  const [isWrongPassword, setIsWrongPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState(null);
  const handleLogin = async () => {
    const apiUrl = 'https://3df7-196-191-60-42.ngrok-free.app/api/login';
  
    if (!email || !password) {
      setIsWrongPassword(true);
      return;
    }
  
    const loginData = {
      email: email,
      password: password,
    };
  
    try {
      const response = await axios.post(apiUrl, loginData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Assume the Laravel API returns a token on successful login
      const token = response.data.token;
  
      // Set the token as an HTTP-only cookie
      document.cookie = `yourCookieName=${token}; path=/; secure; HttpOnly`;
  
      // Fetch user information using the token
      const userResponse = await axios.get('https://3df7-196-191-60-42.ngrok-free.app/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Set the user data in state
      setUserData(userResponse.data);
  
      console.log('Login successful!');
      // Redirect to Admin page for now
      navigate('/Userdata');
    } catch (error) {
      console.error('Error during login:', error);
  
      // Check if the error is due to incorrect email or password
      if (error.response && error.response.status === 401) {
        setIsWrongPassword(true);
      } else {
        // Handle other types of errors here (e.g., network issues, server errors)
        // You might want to set a different state variable for different error types
        // For now, let's set it to false to clear the wrong password message
        setIsWrongPassword(false);
      }
    }
  };

  useEffect(() => {
    // You can use userData to display information in the component or elsewhere
    if (userData) {
      console.log('User Data:', userData);
    }
  }, [userData]);

  return (
    <div className="signin-container">
      <div className="signin-header">
        <div className="signin-text">Log in</div>
      </div>
      <div className="signin-inputs">
        <div className="signin-txts">Email</div>
        <div className="signin-input">
          <img src={emailIcon} alt="" />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="signin-txts">Password</div>
        <div className="signin-input">
          <img src={passwordIcon} alt="" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="signin-submit" onClick={handleLogin}>
          Login
        </div>
        <div className="signin-forget" onClick={() => navigate("/Forgetpassword")}>
          <span> Forget password?</span>
        </div>
        <div className="signin-new-user">New User? <span onClick={() => navigate("/Registration")}> Sign Up</span></div>

        {isWrongPassword && (
          <div className="error-message">
            Incorrect email or password. Please try again.
          </div>
        )}
      </div>
      {userData && <Userdata userData={userData} />}
    </div>
  );
};

export default Signin;
