import React, { createContext, useState } from 'react';

export const Context = createContext();

export const Provider = ({ children }) => {
  const [profile, setProfile] = useState({ name: '', phoneNumber: '' });

  const updateProfile = (data) => {
    setProfile(data);
  };

  const contextValue = {
    state: profile,
    updateProfile: updateProfile,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};