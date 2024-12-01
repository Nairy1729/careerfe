import { createContext, useState, useEffect, useContext } from "react"; // Add useContext here

const PersonContext = createContext();

export const usePersonContext = () => useContext(PersonContext);

export const PersonProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(() => {
    const savedUser = localStorage.getItem("userInfo");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (userInfo) {
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    } else {
      localStorage.removeItem("userInfo");
    }
  }, [userInfo]);

  return (
    <PersonContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </PersonContext.Provider>
  );
};
