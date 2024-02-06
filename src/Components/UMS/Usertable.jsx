import React, { useState } from 'react';
import { Button } from 'react-bootstrap'; // Import Button from react-bootstrap
import Edit from '../Assets/edit.png';
import Delete from '../Assets/delete.png';

const UserTable = ({ users, handleEdit, handleDelete, handleAddUser }) => {
  const [statusToggle, setStatusToggle] = useState(false);

  const handleToggle = (user) => {
    // Toggle the status and update the state
    setStatusToggle(!statusToggle);

    // Add logic to update user status on the backend if needed
    console.log(`Toggle status for user ${user.name}`);
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
                  onClick={() => handleToggle(user)}
                  style={{
                    position: 'relative',
                    padding: '0',
                    width: '50px',
                    height: '30px',
                  }}
                >
                  {/* Circle inside the toggle button */}
                  <div
                    style={{
                      position: 'absolute',
                      width: '20.59px',
                      height: '20.59px',
                      borderRadius: '50%',
                      backgroundColor: statusToggle ? 'green' : 'red',
                      left: statusToggle ? '30px' : '0', // Adjust left position based on status
                      transition: 'left 0.3s', // Smooth transition effect
                    }}
                  ></div>
                  {user.status}
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

export default UserTable;
