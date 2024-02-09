import React, { useState, useEffect } from 'react';
import './Usersetupprofile.css';
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
import x_ic from '../Assets/x.png';
import genderr from '../Assets/gender.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'react-datetime-picker/dist/DateTimePicker.css';
import DateTimePicker from 'react-datetime-picker';
import Cookies from 'js-cookie';

const Usersetupprofile = () => {
  const currentDate = new Date();
  const maxAllowedDate = new Date(currentDate.getFullYear() - 13, currentDate.getMonth(), currentDate.getDate());
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [full_name, setFullName] = useState('');
  const [gender, setSelectedGender] = useState('');
  const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);
  const [phone_number, setPhoneNumber] = useState('');
  const [date_of_birth, setBirthdate] = useState(null);
  const [location, setCountries] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [zIndexGender, setZIndexGender] = useState(1);
  const [zIndexLocation, setZIndexLocation] = useState(1);
  const [zIndexBirthdate, setZIndexBirthdate] = useState(1);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        setCountries(response.data.map(country => ({ value: country.cca2, label: country.name.common })));
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);
 
  const inputDate = new Date(date_of_birth);
  const formattedDate = inputDate.toLocaleString('en-GB', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
});

console.log(formattedDate); // Output: "2000-02-01 00:00"

 
  const handleGenderButtonClick = () => {
    setIsGenderDropdownOpen(!isGenderDropdownOpen);
    setZIndexGender(isGenderDropdownOpen ? 1 : 2);
  };

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    setIsGenderDropdownOpen(false);
    setZIndexGender(1);
  };

  const handleDatePickerClick = () => {
    setIsLocationDropdownOpen(false);
    setIsGenderDropdownOpen(false);
    setIsDatePickerOpen(!isDatePickerOpen);
    setZIndexLocation(1);
    setZIndexGender(1);
  };

  const handleLocationButtonClick = () => {
    setIsLocationDropdownOpen(!isLocationDropdownOpen);
    setZIndexLocation(isLocationDropdownOpen ? 1 : 2);
    setZIndexGender(1);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setIsLocationDropdownOpen(false);
    setZIndexLocation(1);
  };

const handlePictureChange = (event) => {
  const selectedFile = event.target.files[0];
  setSelectedPicture(selectedFile);
};
  const handleFullNameChange = (event) => setFullName(event.target.value);

  const handleClear = () => {
    setFullName('');
    setSelectedGender('');
    setPhoneNumber('');
    setBirthdate(null);
    setSelectedLocation(null);
    setSelectedPicture(null);
  };

  const handleSaveChanges = async () => {
    setEmail(Cookies.get('email'))
    setUsername(Cookies.get('name'))
    setPassword(Cookies.get('password'))

    try {
      const formData = new FormData();
      formData.append('picture', selectedPicture);

      const data = {
        name,
        email,
        password,
        full_name,
        gender: gender,
        phone_number,
        date_of_birth,
        location: selectedLocation ? selectedLocation.label : '',
      };

console.log(data)
      await axios.post(
        'http://172.20.10.6:8000/api/register', 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Profile setup successful');

      const role = localStorage.getItem('role');

      if (role === 'admin') {
        navigate('/Admin');
      } else {
        navigate('/Userdashboard');
      }
    } catch (error) {
      console.error('Error setting up profile:', error);
    }
  };


  return (
    <div className='container'>
      <div className="header">
        <div className="text">Finish Account Setup</div>
      </div>
      <div className="inputs">
        <div className="txts">
          Full Name
        </div>
        <div className="input">
          <img src={person_ic} alt="" />
          <input type="text" value={full_name} onChange={handleFullNameChange} />
        </div>
        <div className="txts">
          Gender
        </div>
        <div className={`input gender-input ${isGenderDropdownOpen ? 'open' : ''}`} style={{ zIndex: zIndexGender }}>
          <img src={genderr} alt="" />
          <div className="gender-button" onClick={handleGenderButtonClick}>
            <img
              className="arrow-icon"
              src={isGenderDropdownOpen ? arrow_up_icon : arrow_down_icon}
              alt="Arrow"
            />
          </div>
          {gender && (
            <div className="selected-gender">{gender}</div>
          )}
          {isGenderDropdownOpen && (
            <div className="gender-dropdown">
              <div onClick={() => handleGenderSelect('Female')}>Female</div>
              <div onClick={() => handleGenderSelect('Male')}>Male</div>
            </div>
          )}
        </div>
        <div className="txts">
          Phone Number
        </div>
        <div className="input">
          <div className='c-code'>
            <PhoneInput
              placeholder="Enter phone number"
              value={phone_number}
              onChange={setPhoneNumber}
              defaultCountry="ET"
              countryOptions={[
                { value: 'ET', label: '+251' },
              ]}
            />
          </div>
        </div>
        <div className="txts">
  Birth Date
</div>
<div className="input">
<img
  src={cal_ic}
  alt="Calendar"
  className="cal-icon"
  style={{ zIndex: isDatePickerOpen ? 4 : 1 }}
  onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
/>
  <DatePicker
    selected={date_of_birth}
    onChange={(date) => setBirthdate(date)}
    dateFormat="yyyy"
    placeholderText="Select birth year"
    showYearDropdown
    showMonthDropdown={false}
    yearDropdownItemNumber={15}
    scrollableYearDropdown
    maxDate={maxAllowedDate}
    open={isDatePickerOpen}
    onClickOutside={() => setIsDatePickerOpen(false)}
  />
  <div className='select-date' onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}>
    <img src={select_cal_icon} alt="Calendar" className="select-icon" />
  </div>
</div>
<div className="txts">
        Location
      </div>
      <div className={`input gender-input ${isLocationDropdownOpen ? 'open' : ''}`} style={{ zIndex: zIndexLocation }}>
          <img src={location_icon} alt="Location" className="location-icon" />
          <div className="gender-button" onClick={handleLocationButtonClick}>
            <img
              className="arrow-iconn"
              src={isLocationDropdownOpen ? arrow_up_icon : arrow_down_icon}
              alt="Arrow"
            />
          </div>
          {selectedLocation && (
            <div className="selected-gender">{selectedLocation.label}</div>
          )}
          {isLocationDropdownOpen && (
            <div className="gender-dropdown" style={{ maxHeight: '150px', overflowY: 'auto' }}>
              {/* Set the max height and enable scrolling */}
              {location.map(country => (
                <div key={country.value} onClick={() => handleLocationSelect(country)}>
                  {country.label}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="txts">
          Picture
        </div>
        <div className="input">
  <label className="upload-btn">
    Upload
    <input type="file" accept="image/*" onChange={handlePictureChange} />
  </label>
  {selectedPicture && (
    <div className="file-info">
      <div className="file-name">{selectedPicture.name}</div>
      <div className="preview-image">
        <img src={URL.createObjectURL(selectedPicture)} alt="Selected" />
      </div>
      <div className='xicon'>
        <img
          src={x_ic}
          alt="Delete"
          className="delete-icon"
          onClick={() => setSelectedPicture(null)}
        />
      </div>
    </div>
  )}
</div>
      </div>
      <div className="submit-container">
        <div className="submit" onClick={handleClear}>Clear</div>
        <div className="submitt" onClick={handleSaveChanges}>Save</div>
      </div>
    </div>
  );
}

export default Usersetupprofile;
