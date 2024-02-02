// Users.jsx
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Edit from '../Assets/edit.png';
import Delete from '../Assets/delete.png';
import Adduser from './Adduser';
import 'react-phone-number-input/style.css';
import './Admin.css'; // Make sure to include the necessary CSS file

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

const Users = ({ users = [], handleEdit, handleDelete, handleAddUser }) => {
  const [searchInput, setSearchInput] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showAddUserForm, setShowAddUserForm] = useState(false);

  const handleSearch = () => {
    // Implement search logic here
  };

  const handleFilter = () => {
    // Implement filter logic here
  };

  return (
    <div>
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
      <div className="usertable">
        <UserTable
          users={users}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleAddUser={handleAddUser}
        />
      </div>
      {showAddUserForm && (
        <AddUserForm
          handleCancel={() => setShowAddUserForm(false)}
          handleSave={() => setShowAddUserForm(false)}
        />
      )}
    </div>
  );
};

export default Users;
