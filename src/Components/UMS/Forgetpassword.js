import React, { useState } from 'react';
import './Signin.css';
import emailIcon from '../Assets/email.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Forgetpassword = () => {
  const navigate = useNavigate();
  const [isLinkSent, setIsLinkSent] = useState(false);
  const [email, setEmail] = useState('');

  const handleContinue = async () => {
    try {
      const apiUrl = 'http://192.168.0.191:8000/api/forget-password';
      const response = await axios.post(apiUrl, { email });

      console.log('Response:', response.data);

      if (response.data.success) {
        setIsLinkSent(true);
      } else {
        console.error('Failed to send verification link. Response:', response.data);
      }
    } catch (error) {
      console.error('Error during verification link request:', error);
    }
  };

  return (
    <div className='signin-container'>
      <div className="forget-header">
        <div className="signin-text">Forgot Password</div>
      </div>
      {!isLinkSent && (
        <div>
          <div className='message'>
            Enter your email for the verification process; we will send a link to your email.
          </div>
          <div className="signin-inputs">
            <div className="signin-txts">Email</div>
            <div className="signin-input">
              <img src={emailIcon} alt="" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="forget-submit" onClick={handleContinue}>
              Continue
            </div>
          </div>
        </div>
      )}

      {isLinkSent && (
        <div>
          <div className='message'>
            A reset link has been sent to your email. Click that link to reset your password.
          </div>
        </div>
      )}
    </div>
  );
};

export default Forgetpassword;
