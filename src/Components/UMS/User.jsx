import React, { useState } from 'react';
import CubeIcon from '../Assets/cube.png';
import PasswordIcon from '../Assets/pwd.png';
import UploadPicture from '../Assets/upload.png';
import './User.css'; // Make sure to create User.css for styling

const User = () => {
  const [profilePicture, setProfilePicture] = useState(null);

  const handleAddPicture = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div className="user-container">
      <header className="user-header">
        {/* Add a section for user profile picture, username, and logout dropdown */}
        <div className="user-profile">
          {/* Profile picture */}
          <div className="user-profile-picture">
            <input
              type="file"
              id="profile-picture"
              accept="image/*"
              onChange={handleAddPicture}
              style={{ display: 'none' }}
            />
            <img src={profilePicture || "../Assets/person.png"} alt="Profile Picture" />
          </div>
        </div>

        {/* UMS logo */}
        <h1>
          <span role="img" aria-label="cube icon" className="user-icon">
            <img src={CubeIcon} alt="Cube Icon" />
          </span>
          UMS
        </h1>
      </header>
      <div className='user-container'>
        <nav>
          <ul>
            <li
              className={`user-li-container`}
            >
              <img src={PasswordIcon} alt="Password Icon" />
              <div className='user-txt'>
                My Profile
              </div>
            </li>
            <li
              className={`user-li-container`}
            >
              <img src={UploadPicture} alt="Upload Icon" />
              <div className='user-txt'>
                Update Profile
              </div>
            </li>
          </ul>
        </nav>
        <div className='user-activity-container'>
          <div className="user-profile-section">
            <div className="user-profile-box">
              {/* Content for the first box */}
              <label htmlFor="profile-picture" className="user-profile-picture">
                <input
                  type="file"
                  id="profile-picture"
                  accept="image/*"
                  onChange={handleAddPicture}
                  style={{ display: 'none' }}
                />
                <img src={profilePicture || "../Assets/person.png"} alt="Profile Picture" />
              </label>

              {/* Upload picture icon */}
              <div className="upload-icon-container">
                <label htmlFor="profile-picture" className="upload-icon-label">
                  <img src={UploadPicture} alt="Upload Icon" className="upload-icon" />
                </label>
              </div>
            </div>

            <div className="user-update-profile-box">
              {/* Your update profile form goes here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
