import React, { useState, useEffect } from 'react';
import UserProfileIcon from '../Assets/userprofile.png';
import Update from '../Assets/update.png';
import Header from './Header';
import Footer from './Footer';
import Myprofile from './Myprofile';
import Adduser from './Adduser';
import './Userdashboard.css';

const EmptyBox = ({ profilePicture, handleProfilePictureChange }) => {
  return (
    <div className="empty-box">
      <div>
        <h2 className="update-profile-title">Update Profile</h2>

        {/* Profile Picture Button */}
        <div className="profile-picture-button">
          <label htmlFor="profile-picture-input">
            <img
              src={profilePicture || UserProfileIcon}
              alt="Profile"
              className="profile-picture"
            />
          </label>
          <input
            type="file"
            id="profile-picture-input"
            accept="image/*"
            onChange={handleProfilePictureChange}
          />
        </div>

        <Adduser />
      </div>
    </div>
  );
};

const Userdashboard = () => {
  const [activeSection, setActiveSection] = useState('My profile');
  const [profilePicture, setProfilePicture] = useState(localStorage.getItem('profilePicture') || null);

  useEffect(() => {
    setActiveSection('My profile');
  }, []);

  const sectionComponents = {
    'My profile': (
      <div className="empty-box2">
        <Myprofile
          profilePicture={profilePicture}
          style={{ marginLeft: '-105%', marginTop: '85px' }}
        />
      </div>
    ),
    'Update profile': (
      <EmptyBox
        profilePicture={profilePicture}
        handleProfilePictureChange={(event) => {
          const pictureURL = URL.createObjectURL(event.target.files[0]);
          setProfilePicture(pictureURL);
          localStorage.setItem('profilePicture', pictureURL);
        }}
      />
    ),
  };

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div>
      <Header profilePicture={profilePicture} />

      <div className="ad-container">
        <div className="ad-sidebar">
          <nav>
            <ul>
              <a onClick={() => handleSectionClick('My profile')}>
                <li
                  className={`ad-li-container ${
                    activeSection === 'My profile' ? 'ad-active' : ''
                  }`}
                >
                  <img src={UserProfileIcon} alt="User Icon" />
                  <div className="ad-txt">My profile</div>
                </li>
              </a>
              <a onClick={() => handleSectionClick('Update profile')}>
                <li
                  className={`ad-li-container ${
                    activeSection === 'Update profile' ? 'ad-active' : ''
                  }`}
                >
                  <img src={Update} alt="Activity Icon" />
                  <div className="ad-txt">Update profile</div>
                </li>
              </a>
            </ul>
          </nav>
        </div>
        <div className="ad-content">{sectionComponents[activeSection]}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Userdashboard;
