import React from 'react';
import './Signin.css'; 
import emailIcon from '../Assets/email.png';
import passwordIcon from '../Assets/wrngpwd.png';
import { useNavigate } from 'react-router-dom';

const Wrongpassword = ({ onToggle, onBackToLogin }) => {
  const navigate= useNavigate();

  return (
    <div className='signin-container'>
      <div className="signin-header">
        <div className="signin-text">Log in</div>
      </div>
      <div className="signin-inputs">
        <div className="signin-txts">Email</div>
        <div className="signin-input">
          <img src={emailIcon} alt="" />
          <input type="email" /> {}
        </div>
        <div className="signin-txts">Password</div>
        <div className="signin-inputt">

          <img src={passwordIcon} alt="" />
          <div className="wrong-password-message">Wrong email or password. Please try again.</div>
        </div>
        <div className="signin-new-user">
              <span onClick={()=>navigate("/Signin")} >Back to Login</span>
          </div>
                  <div className="signin-new-user">New User? <span onClick={()=>navigate("/registration")}> Sign Up</span></div>
      </div>
    </div>
  );
}

export default Wrongpassword;