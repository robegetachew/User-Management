// UserContext.js

import React, { createContext, useContext, useState } from 'react';

// Create a context
const UserContext = createContext();

// Create a provider component
const UserContextProvider = ({ children }) => {
  // State to hold user data
  const [user, setUser] = useState({
    fullName: '',
    gender: '',
    phone: '',
    dob: '',
    password: '',
    username: '',
    location: '',
    // Add other user properties as needed
    updateProfilePicture: (newPicturePath) => {
      // Your logic for updating the profile picture
    },
  });

  // Make the context value the current user state
  const contextValue = {
    user,
    setUser,
  };

  // Provide the context value to the components
  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

// Create a hook to use the context
const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserContextProvider');
  }
  return context;
};

export { UserContext, UserContextProvider, useUser };
