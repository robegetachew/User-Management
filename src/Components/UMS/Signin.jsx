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
  const [user, setUser] = useState(null);
  const handleLogin = async () => {
    const apiUrl = 'https://d00c-196-191-60-12.ngrok-free.app/api/login';
  
    if (!email || !password) {
      setIsWrongPassword(true);
      return;
    }

  
    try {
      const response = await axios.post("https://d00c-196-191-60-12.ngrok-free.app/api/login",  {
      email,
      password, 
      });
  
      const token = response.data.authorization.token;
      console.log(token)
      console.log(response.data.user)

      // document.cookie = `yourCookieName=${token}; path=/; secure; HttpOnly`;
      localStorage.setItem("token", token);
  
      const userResponse = await axios.get('https://d00c-196-191-60-12.ngrok-free.app/api/login', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setUserData(userResponse.data);
      // console.log(userResponse.data)
  
      console.log('Login successful!');
      navigate('/Userdata');
    } catch (error) {
      console.error('Error during login:', error);
      if (error.response && error.response.status === 401) {
        setIsWrongPassword(true);
      } else {
       
        setIsWrongPassword(false);
      }
    }
  };

  useEffect(() => {
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
