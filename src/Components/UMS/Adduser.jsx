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

import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const Adduser = ({ className, style, onCancel, onSave }) => {
  const navigate = useNavigate();

  // State variables
  const [fullName, setFullName] = useState('');
  const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthdate, setBirthdate] = useState(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [countries, setCountries] = useState([]);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
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
  }, []);

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
  const handlePhoneNumberChange = (value, data, event, formattedValue) => {
    setPhoneNumber(value);
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
    setPhoneNumber('');
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
    // Replace with your implementation to submit the form data
    const formData = {
      fullName,
      selectedGender,
      phoneNumber,
      birthdate,
      selectedLocation,
      password,
      confirmPassword,
      username,
    };
    axios
      .post('/api/submitUserData', formData)
      .then((response) => {
        console.log('Form data submitted successfully:', response.data);
        // Optionally, you can navigate to another page after successful submission
        navigate('/admin');
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
            <input type='text' value={fullName} onChange={handleFullNameChange} />
          </div>
          <div className='add-txts'>Gender</div>
          <div
            className={`input add-gender-input ${isGenderDropdownOpen ? 'open' : ''}`}
            style={{ zIndex: zIndexGender }}
          >
            <img src={gender} alt='' />
            <div className='add-gender-button' onClick={handleGenderButtonClick}>
              <img
                className='add-arrow-icon'
                src={isGenderDropdownOpen ? arrow_up_icon : arrow_down_icon}
                alt='Arrow'
              />
            </div>
            {selectedGender && <div className='add-selected-gender'>{selectedGender}</div>}
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
                placeholder='Enter phone number'
                value={phoneNumber}
                onChange={setPhoneNumber}
                defaultCountry='ET'
                countryOptions={[{ value: 'ET', label: '+251' }]}
              />
            </div>
          </div>
          <div className='add-txts'>Date of birth</div>
          <div className='add-input'>
            
            <img src={cal_ic} alt='Calendar' className='add-cal-icon' />
            <DatePicker
              selected={birthdate}
              onChange={(date) => setBirthdate(date)}
              dateFormat='dd/MM/yyyy'
              placeholderText='Select birth date'
              open={isDatePickerOpen}
              onClickOutside={() => setIsDatePickerOpen(false)}
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
            <input type='text' value={username} onChange={handleUsernameChange} />
          </div>
            <div className='add-txts'>Location</div>
          <div
            className={`input add-gender-input ${isGenderDropdownOpen ? 'open' : ''}`}
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
            {selectedLocation && <div className='add-selected-gender'>{selectedLocation.label}</div>}
            {isLocationDropdownOpen && (
             <div className='add-location-dropdown' style={{ maxHeight: '75px', overflowY: 'auto' }}>
             {countries.map((country) => (
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
