import React, { useEffect, useState } from "react";

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
import { Toaster, toast } from "sonner";
import { DrawerProvider } from "./context/drawerContext";
import { DrawerDialogComponent } from "./common/drawerDialog";
import axiosInstance from "./redux/axios";
import { vapidKeys } from "./const/allConsts";

export function App() {
  return (
    <>
      <DrawerProvider>
        <Router>
          <Routes>
            <Route path="/signup" Component={SignUp} />
            <Route path="/login" Component={Login} />
          </Routes>
          <Sidebar></Sidebar>
        </Router>
        <DrawerDialogComponent />

        <Toaster richColors />
      </DrawerProvider>
    </>
  );
}

export default App;
