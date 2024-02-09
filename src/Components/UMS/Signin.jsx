import React, { Component, useState, useEffect } from 'react';
import './Signin.css';
import emailIcon from '../Assets/email.png';
import passwordIcon from '../Assets/password.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Signin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email : email,
      password: password
    }
    try {
      const {data} = await axios.post("http://172.20.10.6:8000/api/login", user)
      
      // Storing Access in cookie
      Cookies.set('access_token', data.authorization.token);
      console.log(data.authorization.token);
      navigate("/userdashboard");
    }
    catch (error) {
      console.error("error in token fetch: ", error.message)
    }
  }
  
  return (
    <div className="signin-container">
      <form onSubmit={onSubmit}>
      <div className="signin-header">
        <div className="signin-text">Log in</div>
      </div>
      <div className="signin-inputs">
        <div className="signin-txts">Email</div>
        <div className="signin-input">
          <img src={emailIcon} alt="" />
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />        </div>
        <div className="signin-txts">Password</div>
        <div className="signin-input">
          <img src={passwordIcon} alt="" />
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={e => setPassword(e.target.value)}
            name="password"
            value={password}
          />        </div>
          </div>
  <button type="submit" className="signin-submit" >Submit</button>
        <div className="signin-forget" onClick={() => navigate('/forgetpassword')} >
          <span> Forgot password?</span>
        </div>
        <div className="signin-new-user">New User? <span onClick={() => navigate("/Registration")}> Sign Up</span></div>
        </form>
    </div>
  )
};
export default Signin;

