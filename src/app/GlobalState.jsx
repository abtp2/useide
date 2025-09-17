"use client";
import React, { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [sidebar, setSidebar] = useState(false);
  
  return (
    <GlobalContext.Provider value={{
      sidebar, setSidebar
    }}>
      {children}
    </GlobalContext.Provider>
  );
};
export const useGlobalState = () => useContext(GlobalContext);