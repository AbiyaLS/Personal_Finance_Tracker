import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("userProfile");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    console.log("User data loaded:", user); // Debugging log
  }, [user]);

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("userProfile", JSON.stringify(userData));
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("userProfile");
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
