import {
  ArrowLeft,
  BellRing,
  CalendarCheck2,
  CalendarClock,
  CalendarPlus,
  CalendarX2,
  CirclePlus,
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
  CardDescription,
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
import { Badge } from "../components/ui/badge";
import * as React from "react";

import { cn } from "../lib/utils";
// import { useMediaQuery } from "../hooks/use-media-query";

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

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { DrawerDialogComponent } from "../common/drawerDialog";

const AllPolicy = [
  {
    id: 4,
    name: "Sick Leave  - Local Team ",
    description: null,
    numLeavesAvailable: 365,
    firmId: 1,
    createdBy: null,
    updatedBy: null,
    createdAt: "2024-04-02T02:38:13.000Z",
    updatedAt: "2024-04-04T04:49:59.000Z",
  },
  {
    id: 4,
    name: "PTO  - Local Team ",
    description: null,
    numLeavesAvailable: 365,
    firmId: 1,
    createdBy: null,
    updatedBy: null,
    createdAt: "2024-04-02T02:38:13.000Z",
    updatedAt: "2024-04-04T04:49:59.000Z",
  },
  {
    id: 4,
    name: "Casual Leaves  - Local Team ",
    description: null,
    numLeavesAvailable: 365,
    firmId: 1,
    createdBy: null,
    updatedBy: null,
    createdAt: "2024-04-02T02:38:13.000Z",
    updatedAt: "2024-04-04T04:49:59.000Z",
  },
];

const AllLeaves = [
  {
    id: 1,
    startDate: "2024-01-10",
    endDate: "2024-01-15",
    duration: 5,
    reason: "Family vacation",
    status: "Approved",
    appliedOn: "2024-01-01",
    comments: "Approved by HR",
    leaveDurationType: "Full Day",
    firmId: 1,
    createdBy: 2,
    updatedBy: 2,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-05",
    LeaveType: {
      id: 4,
      name: "Sick Leave  - Local Team ",
      description: null,
      numLeavesAvailable: 365,
      firmId: 1,
      createdBy: null,
      updatedBy: null,
      createdAt: "2024-04-02T02:38:13.000Z",
      updatedAt: "2024-04-04T04:49:59.000Z",
    },
    managerId: 3,
  },
  {
    id: 2,
    startDate: "2024-02-20",
    endDate: "2024-02-22",
    duration: 2,
    reason: "Medical checkup",
    status: "Pending",
    appliedOn: "2024-02-15",
    comments: null,
    leaveDurationType: "Full Day",
    firmId: 1,
    createdBy: 4,
    updatedBy: 4,
    createdAt: "2024-02-15",
    updatedAt: "2024-02-15",
    LeaveType: {
      id: 4,
      name: "Sick Leave  - Local Team ",
      description: null,
      numLeavesAvailable: 365,
      firmId: 1,
      createdBy: null,
      updatedBy: null,
      createdAt: "2024-04-02T02:38:13.000Z",
      updatedAt: "2024-04-04T04:49:59.000Z",
    },
    managerId: 3,
  },
  {
    id: 3,
    startDate: "2024-03-05",
    endDate: "2024-03-05",
    duration: 1,
    reason: "Dentist appointment",
    status: "Rejected",
    appliedOn: "2024-03-01",
    comments: "Not enough leave balance",
    leaveDurationType: "Half Day",
    firmId: 1,
    createdBy: 5,
    updatedBy: 3,
    createdAt: "2024-03-01",
    updatedAt: "2024-03-02",
    LeaveType: {
      id: 4,
      name: "Sick Leave  - Local Team ",
      description: null,
      numLeavesAvailable: 365,
      firmId: 1,
      createdBy: null,
      updatedBy: null,
      createdAt: "2024-04-02T02:38:13.000Z",
      updatedAt: "2024-04-04T04:49:59.000Z",
    },
    managerId: 2,
  },
  {
    id: 4,
    startDate: "2024-04-10",
    endDate: "2024-04-12",
    duration: 3,
    reason: "Wedding",
    status: "Approved",
    appliedOn: "2024-04-01",
    comments: "Congrats! Approved.",
    leaveDurationType: "Full Day",
    firmId: 1,
    createdBy: 6,
    updatedBy: 2,
    createdAt: "2024-04-01",
    updatedAt: "2024-04-05",
    LeaveType: {
      id: 4,
      name: "Sick Leave  - Local Team ",
      description: null,
      numLeavesAvailable: 365,
      firmId: 1,
      createdBy: null,
      updatedBy: null,
      createdAt: "2024-04-02T02:38:13.000Z",
      updatedAt: "2024-04-04T04:49:59.000Z",
    },
    managerId: 3,
  },
  {
    id: 5,
    startDate: "2024-05-15",
    endDate: "2024-05-15",
    duration: 1,
    reason: "Personal work",
    status: "Pending",
    appliedOn: "2024-05-10",
    comments: null,
    leaveDurationType: "Half Day",
    firmId: 1,
    createdBy: 7,
    updatedBy: 7,
    createdAt: "2024-05-10",
    updatedAt: "2024-05-10",
    LeaveType: {
      id: 4,
      name: "Sick Leave  - Local Team ",
      description: null,
      numLeavesAvailable: 365,
      firmId: 1,
      createdBy: null,
      updatedBy: null,
      createdAt: "2024-04-02T02:38:13.000Z",
      updatedAt: "2024-04-04T04:49:59.000Z",
    },
    managerId: 2,
  },
  {
    id: 6,
    startDate: "2024-06-20",
    endDate: "2024-06-25",
    duration: 5,
    reason: "Vacation",
    status: "Approved",
    appliedOn: "2024-06-10",
    comments: "Enjoy your trip!",
    leaveDurationType: "Full Day",
    firmId: 1,
    createdBy: 8,
    updatedBy: 3,
    createdAt: "2024-06-10",
    updatedAt: "2024-06-15",
    LeaveType: {
      id: 4,
      name: "Sick Leave  - Local Team ",
      description: null,
      numLeavesAvailable: 365,
      firmId: 1,
      createdBy: null,
      updatedBy: null,
      createdAt: "2024-04-02T02:38:13.000Z",
      updatedAt: "2024-04-04T04:49:59.000Z",
    },
    managerId: 3,
  },
];

export default function LeavesComponent() {
  const [allLeaves, setAllLeaves] = useState(AllLeaves);
  const [allPolicy, setAllPolicy] = useState(AllPolicy);
  const [addButtonLabel, setAddButtonLabel] = useState("Apply");
  const handleClick = (e: any) => {
    console.log(e);
    switch (e) {
      case "pending":
        setAddButtonLabel("Apply");
        return;
      case "policy":
        setAddButtonLabel("Add Policy");
        return;
      default:
        setAddButtonLabel("");
    }
  };
  return (
    <>
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
              <NavLink to={"/menus"}>All Leaves</NavLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className=" h-8 w-8">
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="flex-1  whitespace-nowrap text-lg font-semibold tracking-tight ">
          All Leaves
        </h1>
        {addButtonLabel && (
          <DrawerDialogComponent
            triggerButton={
              <Button variant="default" className=" h-8  gap-2">
                <CirclePlus className="h-4 w-4" />
                <span className="hidden sm:block">{addButtonLabel} </span>
              </Button>
            }
            title={
              addButtonLabel === "Apply"
                ? "Apply for leave"
                : "Add Leave Policy"
            }
            description={
              addButtonLabel === "Apply"
                ? "Request Time Off"
                : "Define Leave Guidelines"
            }
          >
            <ProfileForm></ProfileForm>
          </DrawerDialogComponent>
        )}
      </div>
      <Tabs
        defaultValue="pending"
        onValueChange={handleClick}
        className="w-full"
      >
        <TabsList className="grid w-full lg:w-2/3 grid-cols-3">
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="policy">Policy</TabsTrigger>
        </TabsList>
        <TabsContent value="pending" className="grid gap-2">
          {AllLeaves.filter((leave) => leave.status === "Pending").map(
            (leave) => {
              return (
                <div className=" flex w-full items-center space-x-4 rounded-md border p-2 md:p-4 lg:p-4">
                  <CalendarClock className="h-6 w-6" />

                  <div className="flex-col flex-1">
                    <CardTitle className="text-base">
                      {" "}
                      From {leave.startDate} To {leave.endDate}
                    </CardTitle>

                    <CardDescription className="text-xs">
                      <p className="text-sm text-muted-foreground">
                        {leave.LeaveType.name} {"(" + leave.duration + " Days)"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Reason: {leave.reason}
                      </p>
                    </CardDescription>
                  </div>

                  <Badge variant="outline">Pending</Badge>
                </div>
              );
            }
          )}
        </TabsContent>
        <TabsContent value="history" className="grid gap-2">
          {AllLeaves.map((leave) => {
            return (
              <div className=" flex w-full items-center space-x-4 rounded-md border p-2 md:p-4 lg:p-4">
                {leave.status === "Pending" && (
                  <CalendarClock className="h-6 w-6" />
                )}
                {leave.status === "Approved" && (
                  <CalendarCheck2 className="h-6 w-6" />
                )}
                {leave.status === "Rejected" && (
                  <CalendarX2 className="h-6 w-6" />
                )}

                <div className="flex-col flex-1">
                  <CardTitle className="text-base">
                    {" "}
                    From {leave.startDate} To {leave.endDate}
                  </CardTitle>

                  <CardDescription className="text-xs">
                    <p className="text-sm text-muted-foreground">
                      {leave.LeaveType.name} {"(" + leave.duration + " Days)"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Reason : {leave.reason}
                    </p>
                    {leave.status !== "Pending" && (
                      <p className="text-sm text-muted-foreground">
                        Comments : {leave.comments}
                      </p>
                    )}
                  </CardDescription>
                </div>

                {/* 
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    From {leave.startDate} To {leave.endDate}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {leave.LeaveType.name} {"(" + leave.duration + " Days)"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Reason : {leave.reason}
                  </p>
                  {leave.status !== "Pending" && (
                    <p className="text-sm text-muted-foreground">
                      Comments : {leave.comments}
                    </p>
                  )}
                </div> */}
                {leave.status === "Pending" && (
                  <Badge variant="outline">Pending</Badge>
                )}
                {leave.status === "Approved" && (
                  <Badge variant="default">Approved</Badge>
                )}
                {leave.status === "Rejected" && (
                  <Badge variant="destructive">Rejected</Badge>
                )}
              </div>
            );
          })}
        </TabsContent>
        <TabsContent value="policy" className="grid gap-2">
          {allPolicy.map((leave) => {
            return (
              <div className=" flex w-full items-center space-x-4 rounded-md border p-2 md:p-4 lg:p-4">
                <CalendarPlus className="h-6 w-6" />

                <div className="flex-col">
                  <CardTitle className="text-base">{leave.name}</CardTitle>

                  <CardDescription className="text-xs">
                    <p className="text-sm text-muted-foreground">
                      {leave.description}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {leave.numLeavesAvailable + " Days"}
                    </p>
                  </CardDescription>
                </div>

                {/* <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {leave.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {leave.description}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {leave.numLeavesAvailable + " Days"}
                  </p>
                </div> */}
              </div>
            );
          })}
          {/* <DrawerDialogComponent
            title="Add Employee"
            description="Create new profile here. Click save when you're done"
          >
            <ProfileForm></ProfileForm>
          </DrawerDialogComponent> */}
        </TabsContent>
      </Tabs>
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