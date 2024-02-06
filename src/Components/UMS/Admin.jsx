
import React, { useState, useEffect } from 'react';
import { Form, Dropdown, Button , Modal} from 'react-bootstrap';
import CubeIcon from '../Assets/cube.png';
import UserProfileIcon from '../Assets/userprofile.png';
import ActivityIcon from '../Assets/activity.png';
import PasswordIcon from '../Assets/pwd.png';
import GenderIcon from '../Assets/genderr.png';
import PhoneNumberIcon from '../Assets/phonee.png';
import EmailIcon from '../Assets/emaill.png'
import UploadPicture from '../Assets/upload.png';

import person from '../Assets/person.png';
import { useUser } from '../../UserContext';
import separator from '../Assets/separator.png';
import roleIcon from '../Assets/user.png';
import activityStatusIcon from '../Assets/acstatus.png';
import genderIcon from '../Assets/male.png';
import emailIcon from '../Assets/email.png';
import phoneIcon from '../Assets/phone.png';
import './Admin.css';
import Adduser from './Adduser';
import Footer from './Footer';
import Confirm from './Confirm';
import Profileview from './Myprofile';

import 'react-phone-number-input/style.css';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import Edit from '../Assets/edit.png';
import Delete from '../Assets/delete.png';
import { useAuth } from './Auth-context';
import Header from './Header';

const initialUsers = [
  { id: 1, name: 'Unknown', email: 'unknown@example.com', status: 'Active', role: 'Admin', activity: 'High' },
  { id: 2, name: 'uk1', email: 'uk1@example.com', status: 'Inactive', role: 'User', activity: 'Medium' },
];


const initialActivityData = [
  { id: 1, username: 'Unknown', date: '2024-01-19', activity: 'Logged in' },
  { id: 2, username: 'uk1', date: '2024-01-18', activity: 'Changed picture' },
];


const ActivityTable = ({ activityData }) => (
  <table className="ad-activity-table">
    <thead>
      <tr>
        <th>User</th>
        <th>Date</th>
        <th>Activity</th>
      </tr>
    </thead>
    <tbody>
      {activityData.map((activity) => (
        <tr key={activity.id}>
          <td>
            <div className="ac-user-info">
              <img
                src={activity.userPicture || person} // Use the user's picture or a default image
                alt="User"
                className="user-picture"
              />
              <span>{activity.username}</span>
            </div>
          </td>
          <td>{activity.date}</td>
          <td>{activity.activity}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const UserTable = ({ users, handleEdit, handleDelete, handleAddUser }) => {
  const [statusToggles, setStatusToggles] = useState({});

  const handleToggle = (userId) => {
    setStatusToggles((prevToggles) => ({
      ...prevToggles,
      [userId]: !prevToggles[userId],
    }));
    console.log(`Toggle status for user ${userId}. Current statusToggles:`, statusToggles);
  };

  useEffect(() => {
    // Initialize status toggles based on user status
    const initialStatusToggles = {};
    users.forEach((user) => {
      initialStatusToggles[user.id] = user.status === 'Active';
    });
    setStatusToggles(initialStatusToggles);
  }, [users]);

  return (
    <div>
      <Button className="add-user-button" onClick={handleAddUser}>
        +Add User
      </Button>
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
              <td>
                {/* Toggle Button for Status */}
                <Button
                  style={{
                    background: statusToggles[user.id]
                      ? 'linear-gradient(0deg, #61AF56, #61AF56)'
                      : 'linear-gradient(0deg, #C23F3F, #C23F3F)',
                    color: 'white',
                    width: '90px',
                    padding: '5px 10px',
                    paddingLeft: '25px',
                    border: `0.87px solid ${
                      statusToggles[user.id] ? '#61AF56' : '#C23F3F'
                    }`, // Use green for active, red for inactive
                    paddingRight: '20px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    position: 'relative',
                  }}
                  onClick={() => handleToggle(user.id)}
                >
                  {statusToggles[user.id] ? 'Active' : 'Inactive'}
                  <div
                    style={{
                      width: '20.59px',
                      height: '20.59px',
                      borderRadius: '50%',
                      backgroundColor: 'white',
                      position: 'absolute',
                      top: '2px',
                      right: statusToggles[user.id] ? '0' : 'auto',
                      left: statusToggles[user.id] ? 'auto' : '0',
                      transition: 'right 0.3s, left 0.3s',
                    }}
                  ></div>
                </Button>

              </td>
              <td>{user.role || 'User'}</td>
              <td>{user.activity || 'N/A'}</td>
              <td>
                <img
                  src={Edit}
                  alt="Edit Icon"
                  onClick={() => handleEdit(user.id)}
                  style={{ cursor: 'pointer' }}
                />
                <img
                  src={Delete}
                  alt="Delete Icon"
                  onClick={() => handleDelete(user.id)}
                  style={{ cursor: 'pointer', marginLeft: '10px' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const AddUserForm = ({ handleCancel, handleSave }) => (
  <div className='box'>
    <div className="title">Add new user</div>
    <div className="add-user-form">
      <Adduser onCancel={handleCancel} onSave={handleSave} />
    </div>
  </div>
 );

const Admin = () => {
  const { username, country, role, activityStatus, gender, email, phoneNumber, profilePicturePath } = useUser() || {};

  const [searchInput, setSearchInput] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [activeSection, setActiveSection] = useState('Users');
  const [users, setUsers] = useState(initialUsers);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [activityData, setActivityData] = useState(initialActivityData);
  const [selectedUser, setSelectedUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  useEffect(() => {
    
  }, []);

  const handleSaveChanges = async () => {
   
    console.log('Save Changes clicked. Data not sent to backend.');
  };
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEdit = (userId) => {
    setSelectedUser(userId);
    setShowEditModal(true);
  };

  const handleEditCancel = () => {
    setShowEditModal(false);
  };

  const handleEditSave = () => {
    
    console.log("Save edited user logic goes here.");
    setShowEditModal(false);
  };

  const handleAddUser = () => {
    setShowAddUserForm(true);
  };

  const handleCancelAddUser = () => {
    setShowAddUserForm(false);
  };

  const handleSaveAddUser = () => {
    console.log("Save new user logic goes here.");
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
  const handleToggle = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
          : user
      )
    );
  };
  const handleSectionChange = (section) => setActiveSection(section);
  const handleDelete = (userId) =>
    setUsers(users.filter((user) => user.id !== userId));

  const handleSearch = () => {
    const filteredUsers = initialUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        user.email.toLowerCase().includes(searchInput.toLowerCase())
    );
    setUsers(filteredUsers);
  };

  const filteredUsers = users.filter(
    (user) =>
      (roleFilter === 'All' || user.role === roleFilter) &&
      (statusFilter === 'All' || user.status === statusFilter)
  );

  const handleFilter = () => {
    const filteredUsers = initialUsers.filter(
      (user) =>
        (roleFilter === 'All' || user.role === roleFilter) &&
        (statusFilter === 'All' || user.status === statusFilter)
    );
    setUsers(filteredUsers);
  };
  

  const components = {
    Users: () => (
      <div className='ad-user-activity-container'>
        {showAddUserForm ? (
          <AddUserForm
            handleCancel={handleCancelAddUser}
            handleSave={handleSaveAddUser}
          />
        ) :  showEditModal ? (
          <div>
            <div className="box1">
            <div className="proview-profile-picture" style={{ backgroundImage: `url(${profilePicturePath || person})` }}></div>
<div className="proview-user-info">
  <p>
    <strong>Username:</strong> {username}
  </p>
  <p>
    Country: {country}
  </p>
  <img src={separator} alt="" className='proview-sep' />
  <p>
    <img src={roleIcon} alt="Role Icon" className="proview-icon" />
    Role: {role}
  </p>
  <p>
    <img src={activityStatusIcon} alt="Activity Status Icon" className="proview-icon" />
    Activity Status: {activityStatus}
  </p>
  <img src={separator} alt="" className='proview-sep' />
  <p>
    <img src={genderIcon} alt="Gender Icon" className="proview-icon" />
    Gender: {gender}
  </p>
  <p>
    <img src={emailIcon} alt="Email Icon" className="proview-icon" />
    Email: {email}
  </p>
  <p>
    <img src={phoneIcon} alt="Phone Icon" className="proview-icon" />
    Phone Number: {phoneNumber}
  </p>
</div>

    </div>

    <div className="box2">
              <Confirm />
              
            </div>
            <div className="box3">Box 3 Content</div>
          </div>
        ) : (
          <div>
            <div className="usertable">
              <div className="ad-search-and-filter">
                <div className='ad-search'>
                  <Form.Control
                    type="text"
                    placeholder="Search User"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                    <button onClick={handleSearch}>Search</button>
                </div>
                <div className='ad-role-status-filter'>
                  <Form.Control
                    as="select"
                    value={roleFilter}
                    onChange={(e) => {
                      setRoleFilter(e.target.value);
                    }}
                  >
                  <option value="All">Roles</option>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                  </Form.Control>
                  <Form.Control
                    as="select"
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                    }}
                  >
                  <option value="All">Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </Form.Control>
              </div>
            </div>
            <UserTable
  users={filteredUsers}
  handleEdit={handleEdit}
  handleDelete={handleDelete}
  handleAddUser={handleAddUser}
/>
          </div>
        </div>
      )}
    </div>
  ),
  UserActivity: () => (
    <div className='ad-user-activity-container'>
      <div className='ac-header'>
        Recent user activities
      </div>
      <div className='activity-table-container'>
        <table className="ad-activity-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Date</th>
              <th>Activity</th>
            </tr>
          </thead>
          <tbody>
            {activityData.map((activity) => (
              <tr key={activity.id}>
                <td>
                  <div className="ac-user-info">
                    <img
                      src={activity.userPicture || person}
                      alt="User"
                      className="user-picture"
                    />
                    <span>{activity.username}</span>
                  </div>
                </td>
                <td>{activity.date}</td>
                <td>{activity.activity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ),
  
    Profile: () => (
      <div className='ad-user-activity-container'>
        <div className="ad-profile-section">
          <div className="ad-profile-box">
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
          <label htmlFor="profile-picture" className="upload-icon-label">
            <img src={UploadPicture} alt="Upload Icon" className="upload-icon" />
          </label>
            
          </div>
          <div className="ad-update-profile-box">
            <div className='update-title'>
              Update profile
            </div>
            <div className='aduser'>
              <Adduser
                className="additional-class-for-all-instances"
                style="style2"  
                onCancel={handleCancelAddUser}
                onSave={handleSaveAddUser}
              />
            </div>
          </div>
        </div>
      </div>
    ),
  };

  return (
    <div className="ad-admin-container">
    <Header profilePicturePath={profilePicturePath} />
      <div className='ad-container'>
        <nav>
          <ul>
          {Object.keys(components).map((section) => (
  <li
    key={section}
    className={`ad-li-container ${
      activeSection === section ? 'ad-active' : ''
    }`}
    onClick={() => handleSectionChange(section)}
  >
    <img src={getIcon(section)} alt={`${section.replace(/([A-Z])/g, ' $1').trim()} Icon`} />
    <div className='ad-txt'>
      {section.replace(/([A-Z])/g, ' $1').trim()}
    </div>
  </li>
))}
          </ul>
        </nav>
        {components[activeSection]()}
      </div>
      <Footer />
    </div>
  );
};

export default Admin;

function getIcon(section) {
  const icons = {
    Users: UserProfileIcon,
    UserActivity: ActivityIcon,
    Profile: PasswordIcon,
  };
  return icons[section];
}