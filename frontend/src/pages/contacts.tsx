import {
  ArrowLeft,
  CircleUser,
  Filter,
  Pencil,
  Plus,
  Search,
  Trash2,
  Users,
  icons,
} from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { NavLink, Navigate } from "react-router-dom";
import { Button } from "../components/ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "..//components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { useState } from "react";

import * as React from "react";

import { cn } from "../lib/utils";
// import { useMediaQuery } from "../hooks/use-media-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../components/ui/drawer";
import { Label } from "../components/ui/label";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import { DrawerDialogComponent } from "../common/drawerDialog";

const AllDesgination = [
  {
    id: 0,
    value: "Show all",
    isChecked: true,
  },
  {
    id: 1,
    value: "Chef",
    isChecked: false,
  },
  {
    id: 2,
    value: "Waiter",
    isChecked: false,
  },
  {
    id: 3,
    value: "Manager",
    isChecked: false,
  },
];

const AllEmployees = [
  {
    employee: "John Doe",
    designation: "Chef",
  },
  {
    employee: "Jane Smith",
    designation: "Sous Chef",
  },
  {
    employee: "Emily Johnson",
    designation: "Pastry Chef",
  },
  {
    employee: "Michael Brown",
    designation: "Line Cook",
  },
  {
    employee: "Sarah Davis",
    designation: "Prep Cook",
  },
  {
    employee: "David Wilson",
    designation: "Kitchen Assistant",
  },
  {
    employee: "Linda Martinez",
    designation: "Dishwasher",
  },
  {
    employee: "James Rodriguez",
    designation: "Restaurant Manager",
  },
  {
    employee: "Jessica Garcia",
    designation: "Assistant Manager",
  },
  {
    employee: "William Hernandez",
    designation: "Waiter",
  },
];

export default function ContactsComponent() {
  const [allDesignation, setAllDesignation] = useState(AllDesgination);
  const [allEmployees, setAllEmployees] = useState(AllEmployees);
  const [allEmployeesCopy, setAllEmployeesCopy] = useState(AllEmployees);

  const handleOnCheck = (isChecked: any, data: any, index: number): any => {
    data.isChecked = isChecked;
    allDesignation[index] = data;
    console.log(allDesignation);
    setAllDesignation(JSON.parse(JSON.stringify(allDesignation)));
  };

  const handleSearchChange = (e: any) => {
    let newData = allEmployees.filter((val) =>
      val.employee.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setAllEmployeesCopy(newData);
  };
  return (
    <>
      {" "}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <NavLink to={"/"}>Dashboard</NavLink>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <NavLink to={"/menus"}>All Employees</NavLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className=" h-8 w-8">
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-lg font-semibold tracking-tight sm:grow-0">
          All Employees
        </h1>
      </div>
      <Card>
        <CardHeader>
          <div className="flex h-14 items-center gap-2  lg:h-[60px] lg:gap-4">
            <div className="w-full flex-1">
              <form>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search Contacts..."
                    className="w-full appearance-none bg-background pl-8 shadow-none "
                    onChange={handleSearchChange}
                  />
                </div>
              </form>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon">
                  <Filter className="h-3 w-3" />
                  <span className="sr-only">Filters</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Desigination</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {allDesignation.map((data, i) => {
                  return (
                    <DropdownMenuCheckboxItem
                      checked={data.isChecked}
                      onCheckedChange={(e) => handleOnCheck(e, data, i)}
                    >
                      {data.value}
                    </DropdownMenuCheckboxItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="default" size="icon">
              <DrawerDialogComponent
                title="Add Employee"
                description="Create new profile here. Click save when you're done"
                triggerButton={
                  <Button variant="default" size={"icon"}>
                    <Plus className="h-3 w-3" />
                    <span className="sr-only">Add new </span>
                  </Button>
                }
              ></DrawerDialogComponent>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="grid gap-8">
          {allEmployeesCopy.map((employee) => {
            return (
              <div className="flex items-center gap-4  cursor-pointer ">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src="/avatars/01.png" alt="Avatar" />
                  <AvatarFallback>{employee.employee}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    {employee.employee}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {employee.designation}
                  </p>
                </div>
                <div className="ml-auto font-medium gap-4">
                  <div className=" cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 w-9 px-0">
                    <DrawerDialogComponent
                      triggerButton={
                        <div className=" cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 w-9 px-0">
                          <Pencil className="h-3 w-3" />
                        </div>
                      }
                      title="Edit Employee"
                      description="Edit your profile here. Click save when you're done"
                    >
                      <ProfileForm></ProfileForm>
                    </DrawerDialogComponent>
                  </div>

                  <AlertDialogDemo></AlertDialogDemo>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </>
  );
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" defaultValue="shadcn@example.com" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" defaultValue="@shadcn" />
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  );
}

export function AlertDialogDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {/* <Button variant="outline">Show Dialog</Button> */}
        <div className=" cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 w-9 px-0">
          <Trash2 className="h-3 w-3" />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
