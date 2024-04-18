import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
  NavLink,
} from "react-router-dom";
import Dashboard from "./pages/dashboard";
import TableComponent from "./pages/tables";
import MenusComponent from "./pages/menus";
import OrdersComponent from "./pages/orders";
import ChefsPanelComponent from "./pages/chefsPanel";
import ContactsComponent from "./pages/contacts";
import LeavesComponent from "./pages/leaves";
import CalenderComponent from "./pages/calender";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import {
  Bell,
  BookOpenText,
  CalendarClock,
  CalendarDays,
  Home,
  CircleUser,
  CookingPot,
  HomeIcon,
  LineChart,
  Menu,
  Package,
  Package2,
  Plus,
  Ratio,
  ReceiptText,
  ScrollText,
  Search,
  ShoppingBag,
  ShoppingCart,
  Sun,
  Users,
} from "lucide-react";
import { Button } from "./components/ui/button";
import SelectItemsComponent from "./pages/placeOrder/selectItems";
import SelectTableComponent from "./pages/placeOrder/selectTable";
const allMenuItems = [
  {
    iconSmall: <HomeIcon className="h-4 w-4" />,
    iconbig: <Home className="h-5 w-5" />,
    label: "Dashboard",
    link: "/dashboard",
  },
  {
    iconSmall: <Ratio className="h-4 w-4" />,
    iconbig: <Ratio className="h-5 w-5" />,
    label: "Tables",
    link: "/tables",
  },
  {
    iconSmall: <BookOpenText className="h-4 w-4" />,
    iconbig: <BookOpenText className="h-5 w-5" />,
    label: "Menu",
    link: "/menus",
  },
  {
    iconSmall: <ShoppingBag className="h-4 w-4" />,
    iconbig: <ShoppingBag className="h-5 w-5" />,
    label: "Orders",
    link: "/orders",
  },
  {
    iconSmall: <CookingPot className="h-4 w-4" />,
    iconbig: <CookingPot className="h-5 w-5" />,
    label: "Chef's Panel",
    link: "/chef-panel",
  },
];

const allMenuItemsCompany = [
  {
    iconSmall: <Users className="h-4 w-4" />,
    iconbig: <Users className="h-5 w-5" />,
    label: "Employees",
    link: "/employees",
  },
  {
    iconSmall: <CalendarClock className="h-4 w-4" />,
    iconbig: <CalendarClock className="h-5 w-5" />,
    label: "Leaves",
    link: "/leaves",
  },
  {
    iconSmall: <CalendarDays className="h-4 w-4" />,
    iconbig: <CalendarDays className="h-5 w-5" />,
    label: "Calender",
    link: "/calender",
  },
];
export function App() {
  return (
    <>
      <Router>
        {/* <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] pb-12 md:pb-0"> */}

        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] pb-12 md:pb-0">
          <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
              <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <div className="flex items-center gap-2 font-semibold">
                  <Package2 className="h-6 w-6" />
                  <span className="">Acme Inc</span>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="ml-auto h-8 w-8"
                >
                  <Bell className="h-4 w-4" />
                  <span className="sr-only">Toggle notifications</span>
                </Button>
              </div>
              <div className="flex-1">
                <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                  <p className="text-xs text-muted-foreground   py-2 ">
                    My Business
                  </p>

                  {allMenuItems.map((item) => {
                    return (
                      <NavLink
                        to={item.link}
                        className={({ isActive }) =>
                          `flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary ${
                            isActive
                              ? "bg-muted text-primary"
                              : "text-muted-foreground"
                          }`
                        }
                      >
                        {item.iconSmall}
                        {item.label}
                      </NavLink>
                    );
                  })}
                  <p className="text-xs text-muted-foreground  py-2 ">
                    My Company
                  </p>

                  {allMenuItemsCompany.map((item) => {
                    return (
                      <NavLink
                        to={item.link}
                        className={({ isActive }) =>
                          `flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary ${
                            isActive
                              ? "bg-muted text-primary"
                              : "text-muted-foreground"
                          }`
                        }
                      >
                        {item.iconSmall}
                        {item.label}
                      </NavLink>
                    );
                  })}
                </nav>
              </div>
              <div className="mt-auto p-4">
                <Card x-chunk="dashboard-02-chunk-0">
                  <CardHeader className="p-2 pt-0 md:p-4">
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>
                      Unlock all features and get unlimited access to our
                      support team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                    <Button size="sm" className="w-full">
                      Upgrade
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          <Routes>
            <Route path="/dashboard" Component={Dashboard} />
          </Routes>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <Routes>
              <Route path="/tables" Component={TableComponent} />
              <Route path="/menus" Component={MenusComponent} />
              <Route path="/orders" Component={OrdersComponent} />
              <Route path="/employees" Component={ContactsComponent} />
              <Route path="/leaves" Component={LeavesComponent} />
              <Route path="/calender" Component={CalenderComponent} />
              <Route path="/place-order" Component={SelectTableComponent} />
              <Route
                path="/place-order/table/:id"
                Component={SelectItemsComponent}
              />
              <Route path="/chef-panel" Component={ChefsPanelComponent} />{" "}
              <Route path="/" element={<Navigate to="/dashboard" />} />
              {/* <Route path="/" element={<Navigate to="/dashboard" />} /> */}
            </Routes>
          </main>
        </div>
      </Router>
    </>
  );
}

export default App;
