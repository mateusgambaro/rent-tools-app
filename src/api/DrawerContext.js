import React, { createContext, useState } from "react";

export const DrawerContext = createContext();

export const DrawerProvider = ({ children }) => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  return (
    <DrawerContext.Provider value={{ isDrawerVisible, setIsDrawerVisible }}>
      {children}
    </DrawerContext.Provider>
  );
};
