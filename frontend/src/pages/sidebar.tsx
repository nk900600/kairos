import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
  NavLink,
} from "react-router-dom";
import Dashboard from "../pages/dashboard";
import TableComponent from "../pages/tables";
import MenusComponent from "../pages/menus";
import OrdersComponent from "../pages/orders";
import ChefsPanelComponent from "../pages/chefsPanel";
import ContactsComponent from "../pages/contacts";
import LeavesComponent from "../pages/leaves";
import CalenderComponent from "../pages/calender";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
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
  LogOut,
  Settings,
  Loader2,
} from "lucide-react";
import { Button } from "../components/ui/button";
import SelectItemsComponent from "../pages/placeOrder/selectItems";
import SelectTableComponent from "../pages/placeOrder/selectTable";
import SignUp from "../pages/signUp";
import Login from "../pages/login";
import { MainSettings } from "./settings/main";
import { CustomizationPage } from "./customizations";
import { AppDispatch } from "../redux/store";
import {
  authenticateUser,
  fetchAllCartData,
  fetchAllEmployees,
  fetchAllMenuCategories,
  fetchAllMenus,
  fetchAllOrders,
  fetchAllTableSession,
  fetchMyAccount,
  fetchTables,
  getAllFirmByNumber,
  logout,
  updateLoader,
} from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reducer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { ScrollArea } from "../components/ui/scroll-area";
import { ComboBoxComponent } from "./common/comboBox";

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
    iconSmall: <Settings className="h-4 w-4" />,
    iconbig: <Settings className="h-5 w-5" />,
    label: "Settings",
    link: "/settings",
  },
];

function Sidebar() {
  const location = useLocation();
  const hideSidebarOnRoutes = ["/login", "/signup"];
  const showSidebar = !hideSidebarOnRoutes.includes(location.pathname);
  const { isAuthenticted, myAccount, isLoading } = useSelector(
    (state: { table: RootState }) => state.table
  );

  const [globalError, setGlobalError] = useState("");
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (isAuthenticted) {
      if (hideSidebarOnRoutes.includes(location.pathname)) {
        navigate("/dashboard");
      }
      try {
        dispatch(updateLoader(true)).unwrap();
        dispatch(fetchMyAccount())
          .unwrap()
          .then(() => {
            Promise.all([
              dispatch(fetchAllEmployees()).unwrap(),
              dispatch(fetchTables()).unwrap(),
              dispatch(fetchAllTableSession()).unwrap(),
              dispatch(fetchAllOrders()).unwrap(),
              dispatch(fetchAllMenus()).unwrap(),
              dispatch(fetchAllMenuCategories()).unwrap(),
              dispatch(getAllFirmByNumber()).unwrap(),
            ])
              .then(() => {
                dispatch(updateLoader(false));
              })
              .catch((error) => {
                console.error("Error fetching data: ", error);
                dispatch(updateLoader(false));
              });
          });
      } catch (e) {}
    } else {
      if (!localStorage.getItem("token")) {
        if (hideSidebarOnRoutes.includes(location.pathname)) {
        } else navigate("/login");
      }
    }
  }, [isAuthenticted]);
  useEffect(() => {
    dispatch(authenticateUser());
  }, []);

  if (!isAuthenticted) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className=" h-15 w-15 animate-spin flex align-center" />
      </div>
    );
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] pb-12 md:pb-0">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <div className="flex items-center gap-2 font-semibold">
              <img
                alt="TSB"
                className="h-6 w-6"
                height="00"
                src="./logo.svg"
                width="300"
              />
              <span className="text-muted-foreground">/</span>
              {/* <span className="">Shop Busniess</span> */}
              <ComboBoxComponent />
            </div>
            {/* <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button> */}
          </div>
          <div className="flex-1 justify-between">
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
              <p className="text-xs text-muted-foreground  py-2 ">My Company</p>

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

          <div className="flex  w-full justify-between px-5 mt-max items-center flex h-14 items-center border-t px-4 lg:h-[60px] lg:px-6">
            {/* <CircleUser className="h-5 w-5" /> */}

            <div className="flex gap-4 items-center text-primary">
              <Avatar className="h-8 w-8 border ">
                <AvatarImage
                  alt="User avatar"
                  src={myAccount?.employee?.userPic}
                />
                <AvatarFallback
                  className="uppercase"
                  style={{
                    background: myAccount?.employee?.userPic,
                  }}
                ></AvatarFallback>
              </Avatar>

              {/* </Button> */}
              <span className=" ">
                {" "}
                {myAccount?.employee?.firstName +
                  " " +
                  myAccount?.employee?.lastName}
              </span>
            </div>

            <LogOut
              className="h-5 w-5 text-muted-foreground cursor-pointer"
              onClick={() => dispatch(logout())}
            />
          </div>
          {/* <div className="mt-auto p-4">
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div> */}
        </div>
      </div>

      <ScrollArea className=" max-h-screen">
        <Routes>
          <Route path="/dashboard" Component={Dashboard} />
        </Routes>
        {!["/dashboard"].includes(location.pathname) && (
          <main className="flex flex-1 flex-col gap-4 p-2 md:p-6 md:gap-6 lg:gap-6 lg:p-6 ">
            <Routes>
              <Route path="/tables" element={<TableComponent />} />
              <Route path="/menus" element={<MenusComponent />} />
              <Route
                path="/menus/:id/customization"
                Component={CustomizationPage}
              />
              <Route path="/orders" Component={OrdersComponent} />
              <Route path="/employees" Component={ContactsComponent} />
              <Route path="/leaves" Component={LeavesComponent} />
              <Route path="/calender" Component={CalenderComponent} />
              <Route path="/place-order" Component={SelectTableComponent} />
              <Route
                path="/place-order/table/:tableId"
                element={<SelectItemsComponent />}
              />
              <Route path="/chef-panel" Component={ChefsPanelComponent} />{" "}
              <Route path="/settings" Component={MainSettings} />
              <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>
          </main>
        )}
      </ScrollArea>
    </div>
  );
}

export default Sidebar;
