import React, { useState } from 'react';
import './Signin.css';
import emailIcon from '../Assets/email.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Forgetpassword = () => {
  const navigate = useNavigate();
  const [isVerification, setIsVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [email, setEmail] = useState('');

  const handleContinue = async () => {
    try {
      // Replace with your Laravel API endpoint for sending verification code
      const apiUrl = 'http://192.168.0.191:8000/forget-password';

      const response = await axios.post(apiUrl, { email });

      // Assume Laravel returns a success message
      if (response.data.success) {
        setIsVerification(true);
      } else {
        // Handle error, show a message or log it
        console.error('Failed to send verification code.');
      }
    } catch (error) {
      // Handle network errors or other issues
      console.error('Error during verification code request:', error);
    }
  };

  const handleVerify = async () => {
    try {
      // Replace with your Laravel API endpoint for verifying the code
      const apiUrl = 'http://192.168.0.191:8000/api/verify';

      const response = await axios.post(apiUrl, { email, verificationCode });

      // Assume Laravel returns a success message
      if (response.data.success) {
        // Redirect to the reset password page on successful verification
        navigate('/resetpassword');
      } else {
        // Handle error, show a message or log it
        console.error('Verification code is invalid.');
      }
    } catch (error) {
      // Handle network errors or other issues
      console.error('Error during verification:', error);
    }
  };

  return (
    <div className='signin-container'>
      <div className="forget-header">
        <div className="signin-text">Forgot Password</div>
      </div>
      {!isVerification && (
        <div>
          <div className='message'>
            Enter your email for the verification process, we will send a code to your email.
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

      {isVerification && (
        <div>
          <div className='message'>
            Paste the code we sent to the email you entered to the box below.
          </div>
          <div className="signin-inputs">
            <div className="signin-input">
              <input
                type="text"
                placeholder="Paste here"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                style={{ marginLeft: '10px' }}
              />
            </div>
            <div className="forget-submit" onClick={handleVerify}>
              Verify
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Forgetpassword;
