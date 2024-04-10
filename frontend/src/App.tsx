import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import Dashboard from "./pages/dashboard";
import TableComponent from "./pages/tables";
import MenusComponent from "./pages/menus";
import OrdersComponent from "./pages/orders";
import ChefsPanelComponent from "./pages/chefsPanel";
import ContactsComponent from "./pages/contacts";

export function Home() {
  return (
    <>
      <Router>
        {/* <Routes> */}

        <Routes>
          {/* <Route path="/dashboard" Component={Dashboard} />
          <Route path="/tables" Component={TableComponent} />
          <Route path="/menus" Component={MenusComponent} />
          <Route path="/orders" Component={OrdersComponent} />
          <Route path="/contacts" Component={ContactsComponent} />
          <Route path="/chef-panel" Component={ChefsPanelComponent} />{" "} */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>

        <Dashboard></Dashboard>
        {/* </Routes> */}
      </Router>
    </>
  );
}

export default Home;
