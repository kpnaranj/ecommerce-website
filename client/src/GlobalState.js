// Public imports
import React, { createContext, useState } from "react";
// Private imports
import ProductsAPI from "./api/ProductsAPI";
// GlobalState = export create context into a variable
const GlobalState = createContext();
// DataProvider = export data elements to main function
const DataProvider = ({ children }) => {
  // Get products API in the data provider
  ProductsAPI();
  // Return gloabl state of elements
  return (
    <GlobalState.Provider value={"Value in Global"}>
      {children}
    </GlobalState.Provider>
  );
};
// Export variables to main function
export { GlobalState, DataProvider };
