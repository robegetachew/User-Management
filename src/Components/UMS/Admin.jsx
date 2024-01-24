
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Admin.jsx                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: Robe Getachew <Robegetachew12@gmail.com>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
                                                                          
import CubeIcon from '../Assets/cube.png';
import UserProfileIcon from '../Assets/userprofile.png';
import ActivityIcon from '../Assets/activity.png';
import PasswordIcon from '../Assets/pwd.png';
import passwordIcon from '../Assets/password.png';
import SearchIcon from '../Assets/search.png'; 
import UploadPicture from '../Assets/upload.png'; 
import './Admin.css';
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




// Sample data for users
const initialUsers = [
  { id: 1, name: 'Unknown', email: 'unknown@example.com', status: 'Active', role: 'Admin', activity: 'High' },
  { id: 2, name: 'uk1', email: 'uk1@example.com', status: 'Inactive', role: 'User', activity: 'Medium' },
  // Add more user data as needed
];

// Sample data for user activity
const initialActivityData = [
  { id: 1, username: 'Unknown', date: '2024-01-19', activity: 'Logged in' },
  { id: 2, username: 'uk1', date: '2024-01-18', activity: 'Changed picture' },
  // Add more activity data as needed
];

// ActivityTable component for displaying recent user activity
const ActivityTable = ({ activityData }) => (
  <table className="ad-activity-table">
    <thead>
      <tr>
        <th>Username</th>
        <th>Date</th>
        <th>Activity</th>
      </tr>
    </thead>
    <tbody>
      {activityData.map((activity) => (
        <tr key={activity.id}>
          <td>{activity.username}</td>
          <td>{activity.date}</td>
          <td>{activity.activity}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const UserTable = ({ users, handleEdit, handleDelete, handleAddUser }) => (
  <div>
    <button className="add-user-button" onClick={handleAddUser}>
      +Add User 
    </button>
    <table className="ad-user-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Username</th>
        <th>Email</th>
        <th>Status</th>
        <th>Role</th>
        <th>Activity</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user) => (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.status || 'Active'}</td>
          <td>{user.role || 'User'}</td>
          <td>{user.activity || 'N/A'}</td>
          <td>
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  </div>
);
const AddUserForm = ({ handleCancel, handleSave }) => (
  <div className="add-user-form">
    <p>Hello</p>
    {/* You can add form fields and logic for adding a new user here */}
    <button onClick={handleCancel}>Cancel</button>
    <button onClick={handleSave}>Save</button>
  </div>
);
const Admin = () => {
  const [searchInput, setSearchInput] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [activeSection, setActiveSection] = useState('Users');
  const [users, setUsers] = useState(initialUsers);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [activityData, setActivityData] = useState(initialActivityData);
  const [selectedUser, setSelectedUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate= useNavigate();

  const [fullName, setFullName] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthdate, setBirthdate] = useState(null);
  const [countries, setCountries] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [zIndexGender, setZIndexGender] = useState(1);
  const [zIndexLocation, setZIndexLocation] = useState(1);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [username, setUsername] = useState('');


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
    setIsDatePickerOpen(true);
  };

  const handleLocationButtonClick = () => {
    setIsLocationDropdownOpen(!isLocationDropdownOpen);
    setZIndexLocation(isLocationDropdownOpen ? 1 : 2);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setIsLocationDropdownOpen(false);
    setZIndexLocation(1);
  };

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    setSelectedPicture(file);
  };
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };
  const [passwordStrength, setPasswordStrength] = useState('');

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    const strength = calculatePasswordStrength(newPassword);
    setPasswordStrength(strength);
  };
  const calculatePasswordStrength = (password) => {
   
    if (password.length < 6) {
      return 'Weak';
    } else if (password.length < 10) {
      return 'Moderate';
    } else {
      return 'Strong';
    }
  };
  const handleConfirmPassword = () => {
    setPasswordsMatch(password === confirmPassword);
  };

  const handleClear = () => {
    setFullName('');
    setSelectedGender('');
    setPhoneNumber('');
    setBirthdate(null);
    setSelectedLocation(null);
    setSelectedPicture(null);
    setPassword('');
    setConfirmPassword('');
    setUsername('');
  };

  const handleSaveChanges = async () => {
    // Handle saving changes to the backend (not implemented in this example)
    // Replace 'YOUR_BACKEND_API_URL' with your actual backend API URL
    console.log('Save Changes clicked. Data not sent to backend.');
  };
  const handleAddUser = () => {
    // Set the state to show the user addition form
    setShowAddUserForm(true);
  };

  const handleCancelAddUser = () => {
    // Set the state to hide the user addition form
    setShowAddUserForm(false);
  };

  const handleSaveAddUser = () => {
    // Implement logic to save the new user (not implemented in this example)
    // For example, you can send a request to your backend
    console.log("Save new user logic goes here.");
    // After saving, you can hide the form
    setShowAddUserForm(false);
  };

  const handleAddPicture = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  const handleSectionChange = (section) => setActiveSection(section);

  const handleEdit = (user) => setSelectedUser(user);

  const handleDelete = (userId) => setUsers(users.filter((user) => user.id !== userId));
 
 const handleSearch = () => {
    const filteredUsers = initialUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        user.email.toLowerCase().includes(searchInput.toLowerCase())
    );
    setUsers(filteredUsers);
  };

  const handleFilter = () => {
    const filteredUsers = initialUsers.filter(
      (user) =>
        (roleFilter === 'All' || user.role === roleFilter) &&
        (statusFilter === 'All' || user.status === statusFilter)
    );
    setUsers(filteredUsers);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'Users':
        return ( 
          <div className='ad-user-activity-container'>
            <div className="ad-search-and-filter">
              <div className='ad-search'>
              <img src={SearchIcon} alt="searchicon" className="ad-search-icon" />
              <input
               type="text"
               placeholder="Search by name or email"
               value={searchInput}
               onChange={(e) => setSearchInput(e.target.value)}
             />
                <button onClick={handleSearch}>Search</button></div>
              <div className='ad-role-status-filter'>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                >
                  <option value="All">All Roles</option>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </select>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <button onClick={handleFilter}>Filter</button>
              </div>
            </div>
            <div className="usertable">
              {/* Conditionally render UserTable or AddUserForm based on showAddUserForm state */}
              {showAddUserForm ? (
                <AddUserForm
                  handleCancel={handleCancelAddUser}
                  handleSave={handleSaveAddUser}
                />
              ) : (
                <UserTable
                  users={users}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  handleAddUser={handleAddUser}
                />
              )}
            </div>
          </div>
        );
      case 'UserActivity':
        return (
          <div className='ad-user-activity-container'>
            <ActivityTable activityData={activityData} />
          </div>
        );
        case 'Profile':
        return (
          <div className='ad-user-activity-container'>
            <div className="ad-profile-section">
            <div className="ad-profile-box">
  {/* Content for the first box */}
  <label htmlFor="profile-picture" className="ad-profile-picture">
    <input
      type="file"
      id="profile-picture"
      accept="image/*"
      onChange={handleAddPicture}
      style={{ display: 'none' }}
    />
    
    <img src={profilePicture || "../Assets/person.png"} alt="Profile Picture" />
  </label>

  {/* Upload picture icon */}
  <div className="upload-icon-container">
    <label htmlFor="profile-picture" className="upload-icon-label">
      <img src={UploadPicture} alt="Upload Icon" className="upload-icon" />
    </label>
  </div>
</div>

              <div className="ad-update-profile-box">
                {/* Content for the second box */}
                <div className='adm-container'>
      <div className="adm-header">
        <div className="adm-text">Update Profile</div>
      </div>
      <div className="adm-inputs">
        <div className="adm-txts">
          Full Name
        </div>
        <div className="adm-input">
          <img src={person_ic} alt="" />
          <input type="text" value={fullName} onChange={handleFullNameChange} />
        </div>
        <div className="adm-txts">
          Gender
        </div>
        <div className={`input adm-gender-input ${isGenderDropdownOpen ? 'open' : ''}`} style={{ zIndex: zIndexGender }}>
          <img src={gender} alt="" />
          <div className="adm-gender-button" onClick={handleGenderButtonClick}>
            <img
              className="adm-arrow-icon"
              src={isGenderDropdownOpen ? arrow_up_icon : arrow_down_icon}
              alt="Arrow"
            />
          </div>
          {selectedGender && (
            <div className="adm-selected-gender">{selectedGender}</div>
          )}
          {isGenderDropdownOpen && (
            <div className="adm-gender-dropdown">
              <div onClick={() => handleGenderSelect('Female')}>Female</div>
              <div onClick={() => handleGenderSelect('Male')}>Male</div>
            </div>
          )}
        </div>
        <div className="adm-txts">
          Phone Number
        </div>
        <div className="adm-input">
          <div className='adm-c-code'>
            <PhoneInput
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={setPhoneNumber}
              defaultCountry="ET"
              countryOptions={[
                { value: 'ET', label: '+251' },
              ]}
            />
          </div>
        </div>
        <div className="adm-txts">
          Date of birth </div>
        <div className="adm-input">
          <img src={cal_ic} alt="Calendar" className="ad-cal-icon" />
          <DatePicker
            selected={birthdate}
            onChange={(date) => setBirthdate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select birth date"
            open={isDatePickerOpen}
            onClickOutside={() => setIsDatePickerOpen(false)}
          />
          <div className='adm-select-date' onClick={handleDatePickerClick}>
            <img src={select_cal_icon} alt="Calendar" className="adm-select-icon" />
          </div>
        </div>
        <div className="adm-txts">
          Location
        </div>
        <div className={`adm-input adm-gender-input ${isLocationDropdownOpen ? 'open' : ''}`} style={{ zIndex: zIndexLocation }}>
  <img src={location_icon} alt="Location" className="adm-location-icon" />
  <div className="adm-gender-button" onClick={handleLocationButtonClick}>
    <img
      className="adm-arrow-iconn"
      src={isLocationDropdownOpen ? arrow_up_icon : arrow_down_icon}
      alt="Arrow"
    />
  </div>
  {selectedLocation && (
    <div className="adm-selected-gender">{selectedLocation.label}</div>
  )}
  {isLocationDropdownOpen && (
    <div className="adm-gender-dropdown" style={{ maxHeight: '150px', overflowY: 'auto' }}>
      {/* Set the max height and enable scrolling */}
      {countries.map(country => (
        <div key={country.value} onClick={() => handleLocationSelect(country)}>
          {country.label}
        </div>
      ))}
    </div>
  )}
</div>
      </div>
      <div className='adm-side2'>
      <div className="adm-txts">
          Change password
        </div>
        <div className="adm-input">
          <img src={passwordIcon} alt="" />
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="adm-txts">
          Confirm password
        </div>
        <div className="adm-input">
        <img src={passwordIcon} alt="" />
          <input 
          type="password"
          value={password} 
          onChange={handleConfirmPassword}/>
        </div>
        <div className="adm-txts">
          Change username
        </div>
        <div className="adm-input">
          <img src={person_ic} alt="" />
          <input type="text" value={username} onChange={handleUsernameChange} />
        </div>
        </div>
      <div className="adm-submit-container">
        <div className="adm-submit" onClick={handleClear}>Clear</div>
        <div className="adm-submitt" onClick={()=>navigate("/admin")}>Save</div>
      </div>
    </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };


  return (
      <div className="ad-admin-container">
        <header className="ad-header">
          <h1>
            <span role="img" aria-label="cube icon" className="ad-icon">
              <img src={CubeIcon} alt="Cube Icon" />
            </span>
            
            UMS
          </h1>
        </header>
        <div className='ad-container'>
          <nav>
            <ul>
              <li
                className={`ad-li-container ${
                  activeSection === 'Users' ? 'ad-active' : ''
                }`}
                onClick={() => handleSectionChange('Users')}
              >
                <img src={UserProfileIcon} alt="User Icon" />
                <div className='ad-txt'>
                  Users
                </div>
              </li>
              <li
                className={`ad-li-container ${
                  activeSection === 'UserActivity' ? 'ad-active' : ''
                }`}
                onClick={() => handleSectionChange('UserActivity')}
              >
                <img src={ActivityIcon} alt="Activity Icon" />
                <div className='ad-txt'>
                  User Activity
                </div>
              </li>
              <li
                className={`ad-li-container ${
                  activeSection === 'Profile' ? 'ad-active' : ''
                }`}
                onClick={() => handleSectionChange('Profile')}
              >
                <img src={PasswordIcon} alt="Password Icon" />
                <div className='ad-txt'>
                  My Profile
                </div>
              </li>
            </ul>
          </nav>
          {renderActiveSection()}
      </div>
      </div>
  );
};

export default Admin;
