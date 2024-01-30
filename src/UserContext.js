import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [profilePicturePath, setProfilePicturePath] = useState(null);

  const updateProfilePicture = (newPath) => {
    setProfilePicturePath(newPath);
  };

  return (
    <UserContext.Provider value={{ profilePicturePath, updateProfilePicture }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
