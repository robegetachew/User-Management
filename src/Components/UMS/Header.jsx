import React, { useState } from 'react';
import CubeIcon from '../Assets/cube.png';
import ArrowDownIcon from '../Assets/arrow-down.png'; // Replace with your own arrow down image
import UserIcon from '../Assets/person.png'; // Replace with the user picture icon
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
      <header className="addd-header" style={{ width: '1300px', margin: '-15px 0 0 0', padding: '0 80px', fontSize: '10px', height: '70px', position: 'relative' }}>
        <h1>
          <span role="img" aria-label="cube icon" className="ad-icon">
            <img src={CubeIcon} alt="Cube Icon" />
          </span>
          UMS
        </h1>
        <div className='ad-username'>
          Your username
          </div>       
           <div className="ad-user-picture">
          <img src={UserIcon} alt="User Icon" className="user-icon" />
        </div>
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
