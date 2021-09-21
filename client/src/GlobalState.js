// Public imports
import React, { createContext, useState } from "react";
// Private imports
import ProductsAPI from "./api/ProductsAPI";
// GlobalState = export create context into a variable
const GlobalState = createContext();
// DataProvider = export data elements to main function
const DataProvider = ({ children }) => {
  // Check if token element is provided for login session
  const [token, setToken] = useState(false);
  // Provide state of elements to be used
  const state = {
    token: [token, setToken],
    productsAPI: ProductsAPI(),
  };
  // Return gloabl state of elements
  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
// Export variables to main function
export { GlobalState, DataProvider };
