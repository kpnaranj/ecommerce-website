// Public imports
import React, { createContext, useState } from "react";

// GlobalState = export create context into a variable
const GlobalState = createContext();
// DataProvider = export data elements to main function
const DataProvider = ({ children }) => {
  return (
    <GlobalState.Provider value={"Value in Global"}>
      {children}
    </GlobalState.Provider>
  );
};
// Export variables to main function
export { GlobalState, DataProvider };
