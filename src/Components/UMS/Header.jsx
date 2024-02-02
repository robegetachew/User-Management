import React, { useState } from 'react';
import CubeIcon from '../Assets/cube.png';
import ArrowDownIcon from '../Assets/arrow-down.png'; // Replace with your own arrow down image
import './Header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);

  const handleLogout = () => {
    navigate('/Signin');
  };

  const handleArrowClick = () => {
    setShowLogoutMenu(!showLogoutMenu);
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
        <div className={`ad-logout-dropdown ${showLogoutMenu ? 'open' : ''}`}>
          <div className="ad-logout-button" onClick={handleArrowClick}>
            <img src={ArrowDownIcon} alt="Arrow Down Icon" className="arrow-down-icon" />
          </div>
          {showLogoutMenu && (
            <div className="logout-menu" onClick={handleLogout}>
              Logout
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
