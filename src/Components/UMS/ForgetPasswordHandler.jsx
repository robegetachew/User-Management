// ForgetPasswordHandler.js
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Resetpassword from './Resetpassword';

const ForgetPasswordHandler = () => {
  const navigate = useNavigate();
  const { token, email } = useParams();

  navigate(`/Resetpassword/${token}/${email}`);

  return <Resetpassword token={token} email={decodeURIComponent(email)} />;
};

export default ForgetPasswordHandler;
