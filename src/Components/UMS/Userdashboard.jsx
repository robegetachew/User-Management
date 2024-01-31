import React, { useState, useEffect } from 'react';
import UserProfileIcon from '../Assets/userprofile.png';
import Update from '../Assets/update.png';
import ActivityIcon from '../Assets/activity.png';
import Header from './Header';
import Footer from './Footer';
import Myprofile from './Myprofile';
import Adduser from './Adduser';
import './Userdashboard.css';


const EmptyBox = ({ section }) => {
  
  const [profilePicture, setProfilePicture] = useState(null);

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="empty-box">
      {section === 'Update profile' && (
        <div>
          <h2 className="update-profile-title">Update Profile</h2>

          {/* Profile Picture Button */}
          <div className="profile-picture-button">
            <label htmlFor="profile-picture-input">
              {profilePicture ? (
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="profile-picture"
                />
              ) : (
                <div className="profile-placeholder">+</div>
              )}
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
      )}
    </div>
  );
};

const Userdashboard = (props) => {
  const myprofile = props.myprofile;
  const updateprofile = props.updateprofile;

  const [activeSection, setActiveSection] = useState('My profile');

  useEffect(() => {
    setActiveSection('My profile');
  }, []);

  const sectionComponents = {
    'My profile': <Myprofile />,
    'Update profile': <EmptyBox section="Update profile" />,
  };

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div>
      <Header />

      <div className='ad-container'>
        <div className='ad-sidebar'>
          <nav>
            <ul>
              <a onClick={() => handleSectionClick('My profile')}>
                <li className={`ad-li-container ${activeSection === 'My profile' ? 'ad-active' : ''}`}>
                  <img src={UserProfileIcon} alt="User Icon" />
                  <div className='ad-txt'>
                    My profile
                  </div>
                </li>
              </a>
              <a onClick={() => handleSectionClick('Update profile')}>
                <li className={`ad-li-container ${activeSection === 'Update profile' ? 'ad-active' : ''}`}>
                  <img src={Update} alt="Activity Icon" />
                  <div className='ad-txt'>
                    Update profile
                  </div>
                </li>
              </a>
            </ul>
          </nav>
        </div>
        <div className='ad-content'>
          {sectionComponents[activeSection]}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Userdashboard;
