import React from 'react';
import UserProfileIcon from '../Assets/userprofile.png';
import ActivityIcon from '../Assets/activity.png';
import PasswordIcon from '../Assets/pwd.png';
// import GenderIcon from '../Assets/genderr.png';

const SideBar = (props) => {
    const myprofile = props.myprofile;
    const update = props.update;
    // const size = props.size;
  return (
    <div className='ad-container' style={{height:'600px' }}>
      <nav>
        <ul>
            <a onClick={myprofile}>
          <li className='ad-li-container'> {/* Add a closing backtick here */}
            <img src={UserProfileIcon} alt="User Icon" />
            <div className='ad-txt'>
              My profile
            </div>
          </li></a>
          <a onClick={update}>
          <li
            className='ad-li-container'
          >
            <img src={ActivityIcon} alt="Activity Icon" />
            <div className='ad-txt'>
              Update profile
            </div>
          </li>
          </a>
          
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;