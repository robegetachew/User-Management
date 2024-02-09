import React, { useState } from 'react';
import './Signin.css';
import passwordIcon from '../Assets/password.png';
import { useNavigate } from 'react-router-dom';

const Resetpassword = ({ token, email }) => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleVerify = async () => {
    // Validate passwords
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      // Call your backend API to update the password
      const response = await fetch('http://172.20.10.6:8000/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          newPassword,
          token,
        }),
      });

      if (response.ok) {
        // Password reset successful
        navigate('/signin', { state: { message: 'Password reset successful!' } });
      } else {
        // Handle error from the backend
        const errorData = await response.json();
        setError(errorData.error || 'Failed to reset password');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setError('An error occurred while resetting password');
    }
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
