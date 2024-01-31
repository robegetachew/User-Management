import React from 'react';
import './Myprofile.css'; // Import the CSS file
import person from '../Assets/person.png';
import { useUser } from '../../UserContext';
import separator from '../Assets/separator.png';
import roleIcon from '../Assets/user.png';
import activityStatusIcon from '../Assets/acstatus.png';
import genderIcon from '../Assets/male.png';
import emailIcon from '../Assets/email.png';
import phoneIcon from '../Assets/phone.png';
const Myprofile = () => {
  const { username, country, role, activityStatus, gender, email, phoneNumber, profilePicturePath } = useUser();

  return (
    <div className="my-profile-container">
      <div className="profilee-picture" style={{ backgroundImage: `url(${profilePicturePath || person})` }}></div>
      <div className="user-info">
        <p>
          <strong>Username:</strong> {username}
        </p>
        <p>
          Country: {country}
        </p>
        <img src={separator} alt="" className='sep'/>
        <p>
          <img src={roleIcon} alt="Role Icon" className="icon" />
          Role: {role}
        </p>
        <p>
          <img src={activityStatusIcon} alt="Activity Status Icon" className="icon" />
          Activity Status: {activityStatus}
        </p>
        <img src={separator} alt="" className='sep' />

        <p>
          <img src={genderIcon} alt="Gender Icon" className="icon" />
          Gender: {gender}
        </p>
        <p>
          <img src={emailIcon} alt="Email Icon" className="icon" />
          Email: {email}
        </p>
        <p>
          <img src={phoneIcon} alt="Phone Icon" className="icon" />
          Phone Number: {phoneNumber}
        </p>
      </div>
    </div>
  );
};

export default Myprofile;