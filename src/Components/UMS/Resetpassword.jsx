import React, { useState } from 'react';
import './Signin.css';
import passwordIcon from '../Assets/password.png';
import { useNavigate } from 'react-router-dom';

const Resetpassword = ({ token, email }) => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleVerify = () => {
    // Validate passwords
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Call your backend API to update the password
    // You may need to include the reset token and email in the API request

    // After a successful password update, you can navigate to a success page or login page
    navigate('/signin'); // Update this to the desired route after successful password update
  };

  return (
    <div className='signin-container'>
      <div className="signin-header">
        <div className="reset-text">Create new password</div>
      </div>
      <div className="signin-inputs">
        <div className="signin-txts">New Password</div>
        <div className="signin-input">
          <img src={passwordIcon} alt="" />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="signin-txts">Confirm Password</div>
        <div className="signin-input">
          <img src={passwordIcon} alt="" />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="signin-submit" onClick={handleVerify}>
          Verify
        </div>
        <div className="signin-new-user">
          <span onClick={() => navigate('/signin')}>Back to Login</span>
        </div>
      </div>
    </div>
  );
};

export default Resetpassword;
