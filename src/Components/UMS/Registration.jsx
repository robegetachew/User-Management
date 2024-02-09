import React, { useState } from 'react';
import './Registration.css';
import personIcon from '../Assets/person.png';
import emailIcon from '../Assets/email.png';
import passwordIcon from '../Assets/password.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Registration = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [emailError, setEmailError] = useState('');

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    const strength = calculatePasswordStrength(newPassword);
    setPasswordStrength(strength);

    const message =
      newPassword.length === 0
        ? '' // No message when the password is empty
        : newPassword.length < 6
        ? 'Password is too short'
        : `Password strength: ${strength}`;

    setPasswordMessage(message);
  };

  const calculatePasswordStrength = (password) => {
    const patterns = {
      digit: /\d/,
      lowercase: /[a-z]/,
      uppercase: /[A-Z]/,
      specialChar: /[!@#$%^&*(),.?":{}|<>]/,
    };

    const fulfilledCriteriaCount = Object.values(patterns).reduce(
      (count, pattern) => (password.match(pattern) ? count + 1 : count),
      0
    );

    if (password.length < 6 || fulfilledCriteriaCount < 3) {
      return 'Weak';
    } else if (password.length < 10 || fulfilledCriteriaCount < 4) {
      return 'Moderate';
    } else {
      return 'Strong';
    }
  };

  const handleRegister = async () => {
    try {
      //const apiUrl = 'http://172.20.10.6:8000/api/register';
      const registrationData = {
        email: Cookies.set('email', email),
        name: Cookies.set('name', username),
        password: Cookies.set('password', password),
        password_confirmation: confirmPassword,
      };

      // const response = await axios.post(apiUrl, registrationData, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });

      // Assuming Laravel returns a token on successful registration
      // const token = response.data.access_token;
      // console.log(token)

      // Set the token as a cookie or store it in local storage as needed
      // document.cookie = `yourCookieName=${token}; path=/; secure; HttpOnly`;
      console.log('Signup successful!');
      
      navigate('/Usersetupprofile');
    } catch (error) {
      if (error.response) {
        if (error.response.status === 422 && error.response.data.errors.email) {
          // Handle case where email is already taken
          setEmailError('Email is already taken. Please use a different email.');
        } else {
          console.error('Server responded with non-success status:', error.response.data);
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from the server');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', error.message);
      }
    }
  };

  return (
    <div className='reg-container'>
      <div className="reg-header">
        <div className="reg-text">Create an account</div>
      </div>
      <div className="reg-inputs">
        <div className="reg-txts">Email</div>
        <div className="reg-input">
          <img src={emailIcon} alt="" />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {emailError && (
            <div className="error-message">
              {emailError}
            </div>
          )}
        </div>
        <div className="reg-txts">Username</div>
        <div className="reg-input">
          <img src={personIcon} alt="" />
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="reg-txts">Password</div>
        <div className="reg-input">
          <img src={passwordIcon} alt="" />
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          {passwordMessage && (
            <div className={`password-message ${passwordStrength.toLowerCase()}`}>
              {passwordMessage}
            </div>
          )}
        </div>
        <div className="reg-txts">Confirm Password</div>
        <div className="reg-input">
          <img src={passwordIcon} alt="" />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="reg-submit" onClick={handleRegister}>Create account</div>
      <div className="reg-have-account">Already a user?<span onClick={() => navigate("/Signin")}> Sign in</span></div>
      <div className="reg-submit-container"></div>
    </div>
  );
}

export default Registration;
