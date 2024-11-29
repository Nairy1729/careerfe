import React, { createContext, useState, useContext } from "react";

// Create the Context
const PersonContext = createContext();

// Create a Provider component
export const PersonProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  return (
    <PersonContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </PersonContext.Provider>
  );
};

// Custom hook for easy access to the context
export const usePersonContext = () => useContext(PersonContext);
