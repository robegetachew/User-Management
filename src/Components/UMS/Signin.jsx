import React, { useState } from 'react';
import './Signin.css';
import emailIcon from '../Assets/email.png';
import passwordIcon from '../Assets/password.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const navigate = useNavigate();
  const [isWrongPassword, setIsWrongPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const apiUrl = 'http://laravelapi/login'; 

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

      // Redirect to Admin page for now)
      navigate('/Admin');
    } catch (error) {
      console.error('Error during login:', error);
      setIsWrongPassword(true);
    }
  };
  return (
    <div className='signin-container'>
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
        <div className="signin-submit" onClick={()=>navigate("/Admin")}>
          Login
        </div>
        <div className="signin-forget"  onClick={()=>navigate("/Forgetpassword")}>
          <span> Forget password?</span>
        </div>
        <div className="signin-new-user">New User? <span onClick={()=>navigate("/Registration")}> Sign Up</span></div>
      </div>
    </div>
  );
}

export default Signin;