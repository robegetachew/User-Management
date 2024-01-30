import Header from './Header';
import Footer from './Footer';
import SideBar from './SideBar';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import GenderIcon from '../Assets/genderr.png';
import PhoneNumberIcon from '../Assets/phonee.png';
import EmailIcon from '../Assets/emaill.png'
import UploadPicture from '../Assets/upload.png';
import Confirm from './Confirm';
import personIcon from '../Assets/person.png';
import ActivityIcon from '../Assets/activity.png';

const EditUser = () => {
    const [selectedUser, setSelectedUser] = useState(null);

    const navigate = useNavigate();
  return (
    <div>
        <Header />
      <SideBar user={()=>navigate('/')} profile={()=>navigate('/signin')} activity={()=>navigate('/registration')}/>
      <div className="box1">
                  {/* Profile Picture */}
                  <img
                    src={"../Assets/person.png"}
                    alt=""
                    className="user-profile-picture"
                  />

                  {/* User Information */}
                  <div className="user-info">
                    <div className='info-row'>
                  
                    {/* Gender */}
                    <div className="info-row">
                      <img src={GenderIcon} alt="Gender Icon" />
                     
                    </div>
                 {/* Location */}
                  <div className="info-row">
               
              </div>
                    {/* Activity Status */}
                    <div className="info-row">
                      <img src={ActivityIcon} alt="Activity Status Icon" />
                     
                    </div>

                    {/* Phone Number */}
                    <div className="info-row">
                      <img src={PhoneNumberIcon} alt="Phone Number Icon" />
                      
                    </div>

                    {/* Email */}
                    <div className="info-row">
                      <img src={EmailIcon} alt="Email Icon" />
                     
                    </div>
                  </div>
                </div></div>
                <div className="box2">
                  
                <Confirm />
                <div className='second-side'>
    
        <div className="confirm-input">
          <img src={personIcon} alt="" />
          <input type="text" />
        </div></div>
                </div>
                <div className="box3">Box 3 Content</div>
        
        <Footer />
        </div>

  )
}

export default EditUser
