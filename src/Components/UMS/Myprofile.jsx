import React from 'react';
import './Myprofile.css'; // Import the CSS file
import person from '../Assets/person.png';
import { useUser } from '../../UserContext';

const Myprofile = () => {
  const { username, country, role, activityStatus, gender, email, phoneNumber, profilePicturePath } = useUser();

  return (
    <div className="my-profile-container">
      <div className="profilee-picture" style={{ backgroundImage: `url(${profilePicturePath || person})` }}></div>
      <div className="user-info">
        <p><strong>Username:</strong> {username}</p>
        <p><strong>Country:</strong> {country}</p>
        <p><strong>Role:</strong> {role}</p>
        <p><strong>Activity Status:</strong> {activityStatus}</p>
        <p><strong>Gender:</strong> {gender}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Phone Number:</strong> {phoneNumber}</p>
      </div>
    </div>
  );
};

export default Myprofile;
