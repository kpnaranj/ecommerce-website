// Public imports
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { DataProvider } from "./GlobalState";
// Private imports
import Header from "./components/headers/Header";
import MainPages from "./components/mainPages/Pages";
// Main function App
function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header />
          <MainPages />
        </div>
      </Router>
    </DataProvider>
  );
}
// Export app to index.js
export default App;
