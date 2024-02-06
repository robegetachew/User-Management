import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Edit from '../Assets/edit.png';
import Delete from '../Assets/delete.png';

const Usertable = ({ users, handleEdit, handleDelete, handleAddUser }) => {
  const [statusToggles, setStatusToggles] = useState({});

  const handleToggle = (userId) => {
    setStatusToggles((prevToggles) => ({
      ...prevToggles,
      [userId]: !prevToggles[userId],
    }));
    console.log(`Toggle status for user ${userId}. Current statusToggles:`, statusToggles);
  };

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
                <Button
                  className="status-toggle-button"
                  onClick={() => handleToggle(user.id)}
                >
                  {statusToggles[user.id] ? 'Active' : 'Inactive'}
                  <div
                    className="status-circle"
                    style={{
                      right: statusToggles[user.id] ? '0' : 'auto',
                      left: statusToggles[user.id] ? 'auto' : '0',
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
                  className="action-icon"
                />
                <img
                  src={Delete}
                  alt="Delete Icon"
                  onClick={() => handleDelete(user.id)}
                  className="action-icon"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Usertable;

