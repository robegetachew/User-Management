import React, { useEffect, useState } from 'react';
import UserProfileIcon from '../Assets/userprofile.png';
import Update from '../Assets/update.png';
import Header from './Header';
import Footer from './Footer';
import Myprofile from './Myprofile';
import Adduser from './Adduser';
import './Userdashboard.css';
import Cookies from 'js-cookie';

  



const EmptyBox = ({  profilePicture, handleProfilePictureChange }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userdata, setUserdata] = useState(null);
  const [userinfo, setUserinfo] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
useEffect(() => {
  const access_token = Cookies.get('access_token'); 
  setIsAuth(!!access_token);

  if (access_token) {
    fetchUserData(access_token); 
  }
}, []); 
const fetchUserData = async (access_token) => {
  setIsLoading(true);
  setError(null);

  try {
    const response = await fetch('http://172.20.10.6:8000/api/profile', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch profile data');
    }

    const data = await response.json();
    setUserdata(data.data);
  } catch (error) {
    setError(error.message);
  } finally {
    setIsLoading(false);
  }
};
  return (
    <div className="empty-box">
      <div>
        <h2 className="update-profile-title">Update Profile</h2>

        {/* Profile Picture Button */}
        <div className="profile-picture-button">
          <label htmlFor="profile-picture-input">
          {userdata?.image_path && (
           <img
           src={`http://172.20.10.6:8000/storage/${userdata.image_path}`}
           alt="Profile"
           className="profilee-picture"
           onError={(e) => console.error("Error loading image:", e)}
         />
         
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
    </div>
  );
};

const Userdashboard = () => {
  const [activeSection, setActiveSection] = useState('My profile');
  const [profilePicture, setProfilePicture] = useState(localStorage.getItem('profilePicture') || null);
  const [userdata, setUserdata] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const access_token = Cookies.get('access_token'); 
    setIsAuth(!!access_token);

    if (access_token) {
      fetchUserData(access_token); 
    }
  }, []); 

  const fetchUserData = async (access_token) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://172.20.10.6:8000/api/profile', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile data');
      }

      const data = await response.json();
      setUserdata(data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };



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
