import React from 'react';
import { Link } from 'react-router-dom';
import CubeIcon from '../Assets/cube.png';
import ProfileIcon from '../Assets/person.png';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../UserContext';
const Header = () => {
  const { profilePicturePath } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/Signin');
  };

  return (
    <div>
      <header className="ad-header" style={{ width: '1280px', paddingLeft: '75px' }}>
        <h1>
          <span role="img" aria-label="cube icon" className="ad-icon">
            <img src={CubeIcon} alt="Cube Icon" />
          </span>
          UMS
        </h1>
        <div className="ad-user-profile">
          <img
            src={profilePicturePath || ProfileIcon}
            alt="Profile Icon"
            className="add-profile-picture"
          />
          <div className="ad-logout-dropdown">
            <button className="ad-logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;