import React from 'react';

const Userdata = ({ userData }) => {
  return (
    <div>
      <h1>User Information</h1>
      {userData && (
        <div>
          <p>Email: {userData.email}</p>
          <p>Name: {userData.name}</p>
          {/* Add other user information as needed */}
        </div>
      )}
    </div>
  );
};

export default Userdata;