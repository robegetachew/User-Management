import React, { useState } from 'react';
import UserProfileIcon from '../Assets/userprofile.png';
import ActivityIcon from '../Assets/activity.png';
import PasswordIcon from '../Assets/pwd.png';
import Updateprofile from './Updateprofile';
import Myprofile from './Myprofile'; // Import your Myprofile component with a lowercase "p"

const SideBar = (props) => {
  const [isUpdateProfileClicked, setIsUpdateProfileClicked] = useState(false);

  const user = props.user;
  const activity = props.activity;
  const profile = props.profile;

  const handleSidebarItemClick = (itemClickHandler) => {
    setIsUpdateProfileClicked(false);
    itemClickHandler();
  };

  const handleUpdateProfileClick = () => {
    setIsUpdateProfileClicked(true);
  };

  return (
    <div className='ad-container' style={{ height: '520px', display: 'flex' }}>
      <nav>
        <ul>
          <a onClick={() => handleSidebarItemClick(user)}>
            <li className='ad-li-container'>
              <img src={UserProfileIcon} alt="User Icon" />
              <div className='ad-txt'>
                Users
              </div>
            </li>
          </a>
          <a onClick={() => handleSidebarItemClick(activity)}>
            <li className='ad-li-container'>
              <img src={ActivityIcon} alt="Activity Icon" />
              <div className='ad-txt'>
                User Activity
              </div>
            </li>
          </a>
          {isUpdateProfileClicked ? (
            <a onClick={() => handleSidebarItemClick(profile)}>
              <li className='ad-li-container'>
                <div className='ad-txt'>
                  My Profile
                </div>
              </li>
            </a>
          ) : (
            <a onClick={handleUpdateProfileClick}>
              <li className='ad-li-container'>
                <div className='ad-txt'>
                  Update Profile
                </div>
              </li>
            </a>
          )}
        </ul>
      </nav>

      <div className="content-box">
        {isUpdateProfileClicked ? <Updateprofile /> : <Myprofile />}
      </div>
    </div>
  );
};

export default SideBar;
