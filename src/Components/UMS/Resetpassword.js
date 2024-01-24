import React, { useState } from 'react';
import './Signin.css'; 
import passwordIcon from '../Assets/password.png';
import { useNavigate } from 'react-router-dom';

const ResetPassword = ({ onBackToLogin }) => {
  const navigate= useNavigate();

  // const [isWrongPassword, setIsWrongPassword] = useState(false);

  // const handleResetPassword = () => {
//buhala to be added logic to check if the new password is valid
  //   const isNewPasswordInvalid = true; 

  //   if (isNewPasswordInvalid) {
  //     setIsWrongPassword(true);
  //     // display an error message
  //   } else {
  //     //let's assume it navigate back to the login page
  //     onBackToLogin();
  //   }
  //  };

  return (
    <div className='signin-container'>
      <div className="signin-header">
        <div className="reset-text">Create new password</div>
      </div>
      <div className="signin-inputs">
        <div className="signin-txts">New Password</div>
        <div className="signin-input">
          <img src={passwordIcon} alt="" />
          <input type="password" />
        </div>
        <div className="signin-txts">Confirm Password</div>
        <div className="signin-input">
          <img src={passwordIcon} alt="" />
          <input type="password" />
        </div>
        <div className="signin-submit" onClick={()=>navigate("/Signin")}>
           Verify
        </div>
        <div className="signin-new-user">
          <span onClick={()=>navigate("/Signin")}> Back to Login</span>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
