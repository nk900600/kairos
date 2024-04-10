import React, { useState } from "react";
import {
  Bell,
  CalendarClock,
  CalendarDays,
  CircleUser,
  CookingPot,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Ratio,
  ReceiptText,
  ScrollText,
  Search,
  ShoppingBag,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Input } from "../components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "../components/ui/sheet";
import { NavLink, Outlet, Route, Routes } from "react-router-dom";
import TableComponent from "./tables";
import MenusComponent from "./menus";
import OrdersComponent from "./orders";
import ChefsPanelComponent from "./chefsPanel";
import ContactsComponent from "./contacts";
import LeavesComponent from "./leaves";

const allMenuItems = [
  {
    iconSmall: <Home className="h-4 w-4" />,
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
    iconSmall: <ScrollText className="h-4 w-4" />,
    iconbig: <ScrollText className="h-5 w-5" />,
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
    link: "/employees",
  },
];
export function Dashboard() {
  const [sheetopen, setSheetOpen] = useState(false);

  const handleSheetClick = (e: any) => {
    setSheetOpen(!sheetopen);
  };
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <div className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">Acme Inc</span>
            </div>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
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
          <div className="mt-auto p-4">
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
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </div>
                <p className="text-sm text-muted-foreground   py-2 ">
                  My Business
                </p>

                {allMenuItems.map((item) => {
                  return (
                    <NavLink
                      onClick={handleSheetClick}
                      to={item.link}
                      className={({ isActive }) =>
                        `mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2  hover:text-foreground ${
                          isActive
                            ? "text-foreground bg-muted"
                            : "text-muted-foreground"
                        }`
                      }
                    >
                      {" "}
                      {item.iconbig}
                      {item.label}
                    </NavLink>
                  );
                })}

                <p className="text-sm text-muted-foreground   py-2 ">
                  My Company
                </p>

                {allMenuItemsCompany.map((item) => {
                  return (
                    <NavLink
                      to={item.link}
                      className={({ isActive }) =>
                        `mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2  hover:text-foreground ${
                          isActive
                            ? "text-foreground bg-muted"
                            : "text-muted-foreground"
                        }`
                      }
                    >
                      {item.iconbig}
                      {item.label}
                    </NavLink>
                  );
                })}
              </nav>
              {/* <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>
                      Unlock all features and get unlimited access to our
                      support team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">
                      Upgrade
                    </Button>
                  </CardContent>
                </Card>
              </div> */}
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Routes>
            {/* <Route path="/dashboard" Component={Dashboard} /> */}
            <Route path="/tables" Component={TableComponent} />
            <Route path="/menus" Component={MenusComponent} />
            <Route path="/orders" Component={OrdersComponent} />
            <Route path="/employees" Component={ContactsComponent} />
            <Route path="/leaves" Component={LeavesComponent} />
            <Route path="/chef-panel" Component={ChefsPanelComponent} />{" "}
            {/* <Route path="/" element={<Navigate to="/dashboard" />} /> */}
          </Routes>

          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Inventory</h1>
          </div>

          <div
            className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
            x-chunk="dashboard-02-chunk-1"
          >
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                You have no products
              </h3>
              <p className="text-sm text-muted-foreground">
                You can start selling as soon as you add a product.
              </p>
              <Button className="mt-4">Add Product</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
