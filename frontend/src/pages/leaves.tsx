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
  UserIcon,
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
  CardFooter,
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
import { GoBackButton } from "./common/goBackButton";
import { BreadcrumbComponent } from "./common/breadCrumbs";
import { Textarea } from "../components/ui/textarea";

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
      <BreadcrumbComponent
        list={[
          { link: "/", label: "Dashboard" },
          { link: "/leaves", label: "All Leaves" },
        ]}
      />
      <div className="flex items-center gap-4">
        <GoBackButton />
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
        <TabsContent value="pending">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6  ">
            {AllLeaves.filter((leave) => leave.status === "Pending").map(
              (leave) => {
                return (
                  <>
                    <Card className="flex w-full flex-col items">
                      <CardHeader className="flex p-4 gap-2 lg:p-6 md:p-6">
                        <div className=" flex w-full items-center gap-3 rounded-md ">
                          <CalendarClock className="h-6 w-6" />

                          <div className="flex-col">
                            <CardTitle className="text-base ">
                              From {leave.startDate} To {leave.endDate}
                            </CardTitle>

                            <CardDescription className="text-xs">
                              {leave.LeaveType.name}{" "}
                              {"(" + leave.duration + " Days)"}
                            </CardDescription>
                          </div>
                          <div className="flex-1">
                            {/* {leave.status === "Pending" && (
                              <Badge variant="outline">Pending</Badge>
                            )} */}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="flex flex-col text-sm p-4    gap-2 lg:p-6 md:p-6  pt-0  lg:pt-0  md:pt-0   ">
                        <div className="flex items-center">
                          <UserIcon className="h-3 w-3 mr-1.5" />
                          <div className="text-sm">
                            <span className="text-muted-foreground text-xs">
                              Reason:
                            </span>{" "}
                            <span>{leave.reason}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-start   p-4  gap-2 lg:p-6 md:p-6  lg:pt-0  md:pt-0  pt-0">
                        <Button variant="outline" size="sm" className="gap-2">
                          <span className="">Cancel</span>
                        </Button>
                      </CardFooter>
                    </Card>
                  </>
                );
              }
            )}
          </div>
        </TabsContent>
        <TabsContent value="history">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6  ">
            {AllLeaves.filter((leave) => leave.status != "Pending").map(
              (leave) => {
                return (
                  <>
                    <Card className="flex w-full flex-col items">
                      <CardHeader className="flex p-4 gap-2 lg:p-6 md:p-6">
                        <div className=" flex w-full items-center gap-3 rounded-md ">
                          {leave.status === "Approved" && (
                            <CalendarCheck2 className="h-6 w-6" />
                          )}
                          {leave.status === "Rejected" && (
                            <CalendarX2 className="h-6 w-6" />
                          )}

                          <div className="flex-col">
                            <CardTitle className="text-base ">
                              From {leave.startDate} To {leave.endDate}
                            </CardTitle>

                            <CardDescription className="text-xs">
                              {leave.LeaveType.name}{" "}
                              {"(" + leave.duration + " Days)"}
                            </CardDescription>
                          </div>
                          <div className="flex-1">
                            {leave.status === "Approved" && (
                              <Badge variant="default">Approved</Badge>
                            )}
                            {leave.status === "Rejected" && (
                              <Badge variant="destructive">Rejected</Badge>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="flex flex-col text-sm p-4    gap-2 lg:p-6 md:p-6  pt-0  lg:pt-0  md:pt-0   ">
                        <div className="flex items-center">
                          <UserIcon className="h-3 w-3 mr-1.5" />
                          <div className="text-sm">
                            <span className="text-muted-foreground text-xs">
                              Reason:
                            </span>{" "}
                            <span>{leave.reason}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </>
                );
              }
            )}
          </div>
        </TabsContent>
        <TabsContent value="policy">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6   ">
            {allPolicy.map((leave) => {
              return (
                <div className="  flex w-full items-center gap-3 rounded-md space-x-4 rounded-md border p-2 md:p-4 lg:p-4">
                  <CalendarPlus className="h-6 w-6" />

                  <div className="flex w-full justify-between items-center">
                    {" "}
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
                    <div>
                      <Button variant="ghost" size="icon" className="gap-2">
                        <Pencil className="h-4 w-4 " />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

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

export function ManageLeave() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Leave Request</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="from">From</Label>
            <Input id="from" readOnly value="2024-02-20" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="to">To</Label>
            <Input id="to" readOnly value="2024-02-22" />
          </div>
        </div>
        <div className="space-y-1">
          <Label htmlFor="type">Leave Type</Label>
          <Input id="type" readOnly value="Sick Leave - Local Team (2 Days)" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="reason">Reason</Label>
          <Textarea id="reason" readOnly value="Medical checkup" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="outline">Cancel</Button>
        <Button className="ml-4">Submit</Button>
      </CardFooter>
    </Card>
  );
}
