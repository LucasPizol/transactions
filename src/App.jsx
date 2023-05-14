import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

import RoutesApp from "./Routes/Routes";

function App() {
  return (
    <BrowserRouter>
      <RoutesApp />
    </BrowserRouter>
  );
}

export default App;
