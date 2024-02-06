// import React, { useState, useEffect } from 'react';
// import './Signin.css';
// import emailIcon from '../Assets/email.png';
// import axios from 'axios';
// import { useNavigate, useLocation } from 'react-router-dom';
// import Cookies from 'js-cookie';

// const Forgetpassword = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [isVerification, setIsVerification] = useState(false);
//   const [email, setEmail] = useState('');
//   const [verificationCode, setVerificationCode] = useState('');

//   useEffect(() => {
//     // Extract the email and verification code from the current URL
//     const searchParams = new URLSearchParams(location.search);
//     const emailParam = searchParams.get('email');
//     const tokenParam = searchParams.get('token');

//     console.log(searchParams)
//     console.log(emailParam)
//     console.log(tokenParam)

//     // Set the state with the extracted values
//     if (emailParam && tokenParam) {
//       setEmail(emailParam);
//       setVerificationCode(tokenParam);
//       setIsVerification(true);
//     }
//   }, [location.search]);

//   const handleContinue = async () => {
//     try {
//       const apiUrl = 'http://192.168.0.191:8000/api/forget-password';

//       const response = await axios.post(apiUrl, { email });
//       Cookies.set('email',email);
//       console.log(response);

//       if (response.data.success) {
//         setIsVerification(true);
//       } else {
//         console.error('Failed to send verification code.');
//       }
//     } catch (error) {
//       console.error('Error during verification code request:', error);
//     }
//   };

//   const handleVerify = async () => {
//     try {
//       const apiUrl = `http://192.168.0.191:8000/api/reset-password?token=${verificationCode}?email=${encodeURIComponent(email)}`;

//       const response = await axios.get(apiUrl);

//       if (response.data.success) {
//         // Redirect to the reset password page on successful verification
//         navigate(`/resetpassword?token=${verificationCode}?email=${encodeURIComponent(email)}`);
//       } else {
//         console.error('Verification code is invalid.');
//       }
//     } catch (error) {
//       console.error('Error during verification:', error);
//     }
//   };

//   return (
//     <div className='signin-container'>
//       <div className="forget-header">
//         <div className="signin-text">Forgot Password</div>
//       </div>
//       {!isVerification && (
//         <div>
//           <div className='message'>
//             Enter your email for the verification process, we will send a code to your email.
//           </div>
//           <div className="signin-inputs">
//             <div className="signin-txts">Email</div>
//             <div className="signin-input">
//               <img src={emailIcon} alt="" />
//               <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//             </div>
//             <div className="forget-submit" onClick={handleContinue}>
//               Continue
//             </div>
//           </div>
//         </div>
//       )}

//       {isVerification && (
//         <div>
//           <div className='message'>
//             Automatically detected verification code from the URL.
//           </div>
//           <div className="signin-inputs">
//             <div className="signin-input">
//               <input
//                 type="text"
//                 placeholder="Paste here"
//                 value={verificationCode}
//                 readOnly
//                 style={{ marginLeft: '10px' }}
//               />
//             </div>
//             <div className="forget-submit" onClick={handleVerify}>
//               Verify
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Forgetpassword;
