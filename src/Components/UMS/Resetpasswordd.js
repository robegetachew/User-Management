// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import './Signin.css';

// const ResetPasswordd = () => {
//   const navigate = useNavigate();
//   const [token, setToken] = useState(null);
//   const [email, setEmail] = useState(null);
//   const [password, setPassword] = useState('');
//   const [passwordConfirmation, setPasswordConfirmation] = useState('');
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const retrievedToken = urlParams.get('token');
//     const retrievedEmail = urlParams.get('email');
//     const get_email = Cookies.get('email');
//     console.log(urlParams)
//     console.log(retrievedEmail)
//     console.log(retrievedToken)
//     console.log(get_email);
//     setToken(retrievedToken)
//     setEmail(get_email)
//     if (retrievedToken && retrievedEmail) {
//       setToken(retrievedToken);
//       setEmail(retrievedEmail);
//     } else {
//       // Redirect if token not found in URL
//       navigate('/resetpassword');
//     }
//   }, [navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (password !== passwordConfirmation) {
//         throw new Error('Passwords do not match');
//       }
//       const get_email = Cookies.get('email');

//       const response = await fetch('http://192.168.0.191:8000/api/reset-password', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email,
//           password,
//           token
//         }),
//       });
//       console.log(response)

//       if (response.ok) {
//         setError(null);
//         navigate('/signin', { state: { message: 'Password reset successful!' } });
//       } else {
//         const errorData = await response.json();
//         setError(errorData.error || 'Failed to reset password');
//       }
//     } catch (error) {
//       console.error('Error resetting password:', error);
//       setError('An error occurred while resetting password');
//     }
//   };

//   return (
//     <div>
//       {error && <div className="alert alert-danger">{error}</div>}
//       <h2>Reset Password</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="password">New Password:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="passwordConfirmation">Confirm Password:</label>
//           <input
//             type="password"
//             id="passwordConfirmation"
//             value={passwordConfirmation}
//             onChange={(e) => setPasswordConfirmation(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Reset Password
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ResetPasswordd;
