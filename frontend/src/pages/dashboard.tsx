import React, { useState } from "react";
import {
  Bell,
  BookOpenText,
  CalendarClock,
  CalendarDays,
  CircleUser,
  CookingPot,
  DollarSign,
  Home,
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
import { NavLink, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import TableComponent from "./tables";
import MenusComponent from "./menus";
import OrdersComponent from "./orders";
import ChefsPanelComponent from "./chefsPanel";
import ContactsComponent from "./contacts";
import LeavesComponent from "./leaves";
import CalenderComponent from "./calender";
import { useSwipeable } from "react-swipeable";
import CreateOrderComponent from "./placeOrder/selectTable";
import { DashBoardContent } from "./dashboardContent";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { logout } from "../redux/actions";
import { RootState } from "../redux/reducer";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { ComboBoxComponent } from "./common/comboBox";
import { toast } from "sonner";
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
  // {
  //   iconSmall: <CalendarDays className="h-4 w-4" />,
  //   iconbig: <CalendarDays className="h-5 w-5" />,
  //   label: "Calender",
  //   link: "/calender",
  // },
];
export function Dashboard() {
  const [isOpen, setOpen] = useState<boolean | undefined>(undefined);
  const handleSheetClick = (e: any) => {
    setOpen(false);
  };
  const { myAccount }: any = useSelector(
    (state: { table: RootState }) => state.table
  );
  let sheetProps: any = {
    open: isOpen,
    onOpenChange: (data: any) => {
      setOpen(data);
    },
  };
  const handlers = useSwipeable({
    onSwipedLeft: (eventData: any) => {
      setOpen(false);
    },
  });

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const handleLoginROute = async () => {
    try {
      await dispatch(logout()).unwrap();
    } catch (e) {}
  };

  return (
    <div className="flex flex-col md:p-4  lg:p-0 ">
      <header className="flex h-14 block md:hidden items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px]">
        <Sheet {...sheetProps}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="shrink-0 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            {...handlers}
            side="left"
            className="flex flex-col q-full"
          >
            <nav className="grid gap-2 text-lg font-medium">
              <div className="flex items-center gap-2 text-lg font-semibold mb-4">
                <img
                  alt="TSB"
                  className="h-6 w-7"
                  height="00"
                  src="./icon2.png"
                  width="300"
                />

                <span className="">The Shop Business</span>
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
                    {item.iconbig}
                    {item.label}
                  </NavLink>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="w-full flex-1">
          <form>
            {/* <div className="relative hidden md:flex">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
              />
            </div> */}
            <div className="flex items-center gap-2  justify-center text-lg font-semibold md:hidden ">
              <img
                alt="TSB"
                className="h-6 w-7"
                height="00"
                src="./icon2.png"
                width="300"
              />
              <span className="text-muted-foreground">/</span>
              {/* <span>TSB</span> */}
              <ComboBoxComponent />
            </div>
            {/* <p className="text-sm text-muted-foreground   py-2 ">
                My Business
              </p> */}
          </form>
        </div>

        {/* <Button variant="ghost" size="icon" className="h-8 w-8 border">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Toggle notifications</span>
        </Button> */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={"ghost"}
              className="block md:hidden flex gap-2 p-0"
            >
              {/* <CircleUser className="h-5 w-5" /> */}
              <Avatar className="h-8 w-8 border ">
                <AvatarImage
                  alt="User avatar"
                  src={myAccount?.employee?.userPic}
                />
                <AvatarFallback
                  className="uppercase "
                  style={{ background: myAccount?.employee?.userPic }}
                ></AvatarFallback>
              </Avatar>

              {/* </Button> */}
              <span className="  sr-only  sm:block">
                {" "}
                {myAccount?.employee?.firstName[0] +
                  myAccount?.employee?.lastName[0]}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/settings")}>
              Settings
            </DropdownMenuItem>
            {/* <DropdownMenuItem>Support</DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLoginROute}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <DashBoardContent />

      {/* <nav className="fixed bottom-0 inset-x-0 flex items-center justify-center h-14 bg-muted border-t border-gray-200/40 border-gray-200 dark:bg-gray-950/50 dark:border-gray-950 dark:border-gray-950/40 md:hidden">
        <div className="flex-1 flex flex-col items-center justify-center text-xs transition-colors text-gray-500 peer-allowed dark:text-gray-400">
          <NavLink
            className={({ isActive }) =>
              `flex flex-col items-center justify-center active gap-1 ${
                isActive ? " text-primary" : ""
              }`
            }
            to={"/dashboard"}
          >
            <Home className="h-5 w-5" />
            Home
          </NavLink>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center text-xs transition-colors text-gray-500 peer-allowed dark:text-gray-400">
          <NavLink
            className={({ isActive }) =>
              `flex flex-col items-center justify-center active gap-1 ${
                isActive ? " text-primary" : ""
              }`
            }
            to={"/place-order"}
          >
            <Plus className="h-5 w-5" />
            New Order
          </NavLink>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center text-xs transition-colors text-gray-500 peer-allowed dark:text-gray-400">
          <NavLink
            className={({ isActive }) =>
              `flex flex-col items-center justify-center active gap-1 ${
                isActive ? " text-primary" : ""
              }`
            }
            to={"/tables?mytables=true"}
          >
            <Ratio className="h-5 w-5" />
            <span className="absolute top-0 right-14 inline-flex items-center justify-center px-1.5 py-1 text-xs font-semibold leading-none bg-red-500 text-white rounded-full">
              2
            </span>
            My Tables
          </NavLink>
        </div>
      </nav> */}
    </div>
  );
}

export default Dashboard;
