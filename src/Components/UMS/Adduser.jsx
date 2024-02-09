import CubeIcon from '../Assets/cube.png';
import UserProfileIcon from '../Assets/userprofile.png';
import ActivityIcon from '../Assets/activity.png';
import PasswordIcon from '../Assets/pwd.png';
import passwordIcon from '../Assets/password.png';
import SearchIcon from '../Assets/search.png'; 
import UploadPicture from '../Assets/upload.png'; 
import './Adduser.css';
import React, { useState, useEffect } from 'react';
import person_ic from '../Assets/person.png';
import cal_ic from '../Assets/cal.png';
import select_cal_icon from '../Assets/date.png';
import location_icon from '../Assets/location.png';
import arrow_down_icon from '../Assets/arrow-down.png';
import arrow_up_icon from '../Assets/arrow-up.png';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import gender from '../Assets/gender.png';
import Cookies from 'js-cookie';

import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const Adduser = ({ className, style, onCancel, onSave }) => {
  const navigate = useNavigate();

  // State variables
  const [userdata, setUserdata] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  const [full_name, setFullName] = useState('');
  const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);
  const [gender, setSelectedGender] = useState('');
  const [phone_number, setphone_number] = useState('');
  const [date_of_birth, setBirthdate] = useState(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [location, setCountries] = useState([]);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setUsername] = useState('');
  const [zIndexGender, setZIndexGender] = useState(1);
  const [zIndexLocation, setZIndexLocation] = useState(1);


  
  useEffect(() => {
    
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countryOptions = response.data.map(country => ({
          value: country.cca2,
          label: country.name.common,
        }));
        setCountries(countryOptions);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
    const access_token = Cookies.get('access_token'); 
    setIsAuth(!!access_token);

    if (access_token) {
      fetchUserData(access_token); 
    }
    
  }, []);

  const fetchUserData = async (access_token) => {
  
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
    } finally {
    }
  };

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  // Function to handle gender button click
  const handleGenderButtonClick = () => {
    setIsGenderDropdownOpen(!isGenderDropdownOpen);
    setZIndexGender(isGenderDropdownOpen ? 1 : 10);
  };

  // Function to handle gender selection
  const handleGenderSelect = (selectedGender) => {
    setSelectedGender(selectedGender);
    setIsGenderDropdownOpen(false);
  };

  // Function to handle changes in phone number input
  const handlephone_numberChange = (value, data, event, formattedValue) => {
    setphone_number(value);
  };

  // Function to handle date picker click
  const handleDatePickerClick = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
  };

  // Function to handle location button click
  const handleLocationButtonClick = () => {
    setIsLocationDropdownOpen(!isLocationDropdownOpen);
    setZIndexLocation(isLocationDropdownOpen ? 1 : 10);
  };

  // Function to handle location selection
  const handleLocationSelect = (selectedLocation) => {
    setSelectedLocation(selectedLocation);
    setIsLocationDropdownOpen(false);
  };

  // Function to handle changes in password input
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Function to handle changes in confirm password input
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  // Function to handle changes in username input
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  // Function to handle clearing form fields
  const handleClear = () => {
    setFullName('');
    setIsGenderDropdownOpen(false);
    setSelectedGender('');
    setphone_number('');
    setBirthdate(null);
    setIsDatePickerOpen(false);
    setIsLocationDropdownOpen(false);
    setSelectedLocation(null);
    setPassword('');
    setConfirmPassword('');
    setUsername('');
    setZIndexGender(1);
    setZIndexLocation(1);
  };

  // Placeholder function for submitting the form data
  const handleSubmit = () => {
    let formData = {};

if (full_name) {
  formData.full_name = full_name;
}

if (gender) {
  formData.gender = gender;
}

if (phone_number) {
  formData.phone_number = phone_number;
}

if (date_of_birth) {
  formData.date_of_birth = date_of_birth;
}

if (selectedLocation) {
  formData.selectedLocation = selectedLocation.label;
}

if (password) {
  formData.password = password;
}

if (confirmPassword) {
  formData.confirmPassword = confirmPassword;
}

if (name) {
  formData.name = name;
}

    console.log('Form data submitted successfully:', formData);

    axios.put('http://172.20.10.6:8000/api/update', formData, {
        headers: {
            'Authorization': `Bearer ${Cookies.get('access_token')}`, 
            'Content-Type': 'application/json',
        },
    })
    .then((response) => {
        console.log('Form data submitted successfully:', formData);
        navigate('/userdashboard');
    })
    .catch((error) => {
        console.error('Error submitting form data:', error);
    });
};

  return (
    <div className={`Adduser ${style || ''}`}>
      <div className='add-container'>
        <div className='add-header'></div>
        <div className='add-inputs'>
          <div className='add-txts'>Full Name</div>
          <div className='add-input'>
            <img src={person_ic} alt='' />
            <input type='text' value={full_name} placeholder={userdata?.full_name} onChange={handleFullNameChange} />
          </div>
          <div className='add-txts'>Gender</div>
<div
  className={`add-gender-input ${isGenderDropdownOpen ? 'open' : ''}`}
  style={{ zIndex: zIndexGender }}
>
  <img src={gender} className='add-location-icon' alt='' />
  <div className='add-gender-button' onClick={handleGenderButtonClick}>
    <img
      className='add-arrow-icon'
      src={isGenderDropdownOpen ? arrow_up_icon : arrow_down_icon}
      alt='Arrow'
    />
  </div>
  {gender ? (
    <div className='add-selected-gender'>{gender}</div>
  ) : (
    <input
      type='text'
      placeholder={userdata?.gender || 'Select gender'}
      readOnly
      style={{ border: 'none', outline: 'none' , marginLeft: '-220px' }} // Add invisible border

      value={gender} 
    />
  )}
  {isGenderDropdownOpen && (
    <div className='add-gender-dropdown'>
      <div className='add-gender-option' onClick={() => handleGenderSelect('Female')}>Female</div>
      <div className='add-gender-option' onClick={() => handleGenderSelect('Male')}>Male</div>
    </div>
  )}
</div>

 

          <div className='add-txts'>Phone Number</div>
          <div className='add-input'>
            <div className='add-c-code'>
              <PhoneInput
                placeholder= {userdata?.phone_number || phone_number}
                value={phone_number}
                onChange={setphone_number}
                defaultCountry='ET'
                countryOptions={[{ value: 'ET', label: '+251' }]}
              />
            </div>
          </div>
          <div className='add-txts'>Date of birth</div>
<div className='add-input'>
  <img src={cal_ic} alt='Calendar' className='add-cal-icon' />

  <DatePicker
  selected={date_of_birth}
  onChange={(date) => setBirthdate(date)}
  dateFormat='yyyy-MM-dd HH:mm:ss'
  timeFormat="HH:mm:ss"
  open={isDatePickerOpen}
  onClickOutside={() => setIsDatePickerOpen(false)}
  placeholderText={userdata?.date_of_birth || 'Select date of birth'}
/>

  
  <div className='add-select-date' onClick={handleDatePickerClick}>
    <img src={select_cal_icon} alt='Calendar' className='add-select-icon' />
  </div>
</div>

        
        </div>
        <div className='add-side2'>
          <div className='add-txts'>Change password</div>
          <div className='add-input'>
            <img src={passwordIcon} alt='' />
            <input type='password' value={password} onChange={handlePasswordChange} />
          </div>
          <div className='add-txts'>Confirm password</div>
          <div className='add-input'>
            <img src={passwordIcon} alt='' />
            <input type='password' value={confirmPassword} onChange={handleConfirmPasswordChange} />
          </div>
          <div className='add-txts'>Change username</div>
          <div className='add-input'>
            <img src={person_ic} alt='' />
            <input type='text' value={name} onChange={handleUsernameChange} placeholder={userdata?.name}/>
          </div>
          <div className='add-txts'>Location</div>
<div
  className={`add-gender-input ${isGenderDropdownOpen ? 'open' : ''}`}
  style={{ zIndex: zIndexGender }}
>
  <img src={location_icon} alt='Location' className='add-location-icon' />
  <div className='add-gender-button' onClick={handleLocationButtonClick}>
    <img
      className='add-arrow-iconn'
      src={isLocationDropdownOpen ? arrow_up_icon : arrow_down_icon}
      alt='Arrow'
    />
  </div>

  {selectedLocation ? (
    <div className='add-selected-gender'>{selectedLocation.label}</div>
  ) : (
    <div className='add-selected-gender' style={{ color: '#aaa' }}>
      {userdata?.location || 'Select location'}
    </div>
  )}

  {isLocationDropdownOpen && (
    <div className='add-location-dropdown' style={{ maxHeight: '75px', overflowY: 'auto' }}>
      {location.map((country) => (
        <div key={country.value} onClick={() => handleLocationSelect(country)}>
          {country.label}
        </div>
      ))}
    </div>

              
            )}
          </div>
        </div>
        <div className='add-submit-container'>
          <div className='add-submit' onClick={handleClear}>
            Clear
          </div>
          <div className='add-submitt' onClick={handleSubmit}>
            Save
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adduser;
