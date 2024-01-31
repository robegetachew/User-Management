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
import './Admin.css';
import Adduser from './Adduser';
import Footer from './Footer';
import Confirm from './Confirm';
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
            <td>{user.status || 'Active'}</td>
            <td>{user.role || 'User'}</td>
            <td>{user.activity || 'N/A'}</td>
            <td>
              {/* Edit icon */}
              <img
                src={Edit}
                alt="Edit Icon"
                onClick={() => handleEdit(user.id)}
                style={{ cursor: 'pointer' }}
              />
              {/* Delete icon */}
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

const AddUserForm = ({ handleCancel, handleSave }) => (
  <div className='box'>
    <div className="title">Add new user</div>
    <div className="add-user-form">
      <Adduser onCancel={handleCancel} onSave={handleSave} />
    </div>
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
  const [profilePicturePath, setProfilePicturePath] = useState(null);
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
              <img
                src={selectedUser ? selectedUser.profilePicture || "../Assets/person.png" : "../Assets/person.png"}
                alt=""
                className="user-profile-picture"
              />
              <div className="user-info">
                <div className='info-row'>
                <p>{selectedUser ? selectedUser.name : 'Unknown'}</p></div>
                <div className="info-row">
                  <img src={GenderIcon} alt="Gender Icon" />
                  <p>{selectedUser ? selectedUser.gender : 'N/A'}</p>
                </div>
              <div className="info-row">
            <p>{selectedUser ? selectedUser.location : 'N/A'}</p>
          </div>
                <div className="info-row">
                  <img src={ActivityIcon} alt="Activity Status Icon" />
                  <p>{selectedUser ? selectedUser.activityStatus : 'N/A'}</p>
                </div>
                <div className="info-row">
                  <img src={PhoneNumberIcon} alt="Phone Number Icon" />
                  <p>{selectedUser ? selectedUser.phoneNumber : 'N/A'}</p>
                </div>
                <div className="info-row">
                  <img src={EmailIcon} alt="Email Icon" />
                  <p>{selectedUser ? selectedUser.email : 'N/A'}</p>
                </div>
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
                <Button variant="primary" onClick={handleSearch}>
                  Search
                </Button>
              </div>
              <div className='ad-role-status-filter'>
                <Form.Control
                  as="select"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                >
                  <option value="All">Roles</option>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </Form.Control>
                <Form.Control
                  as="select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </Form.Control>
                <Button variant="primary" onClick={handleFilter}>
                  Filter
                </Button>
              </div>
            </div>
              <UserTable
                users={users}
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
        <ActivityTable activityData={activityData} />
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
        <div className="upload-icon-container">
          <label htmlFor="profile-picture" className="upload-icon-label">
            <img src={UploadPicture} alt="Upload Icon" className="upload-icon" />
          </label>
            </div>
            
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
                <img src={getIcon(section)} alt={`${section} Icon`} />
                <div className='ad-txt'>
                  {section}
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
