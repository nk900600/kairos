import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
  NavLink,
  useLocation,
} from "react-router-dom";
import SignUp from "./pages/signUp";
import Login from "./pages/login";
import Sidebar from "./pages/sidebar";

export function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" Component={SignUp} />
          <Route path="/login" Component={Login} />
        </Routes>
        <Sidebar></Sidebar>
      </Router>
    </>
  );
}

export default App;
