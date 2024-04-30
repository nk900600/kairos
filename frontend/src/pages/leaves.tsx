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
import { useState, useContext } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteLeaveTypes,
  UpdateLeaveTypes,
  createAllLeaveTypes,
  fetchAllLeaveTypes,
} from "../redux/actions";
import { AppDispatch } from "../redux/store";
import { RootState } from "../redux/reducer";
import DrawerContext from "../context/drawerContext";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
  const [addButtonLabel, setAddButtonLabel] = useState("Apply");
  const { allLeavesTypes } = useSelector(
    (state: { table: RootState }) => state.table
  );
  const dispatch: AppDispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAllLeaveTypes());
  }, [dispatch]);

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

  const {
    open,
    setOpen,
    title,
    setTitle,
    setComponent,
    setDescription,
    setCompProps,
  } = React.useContext(DrawerContext);
  const handleAddPolicyClick = () => {
    if (addButtonLabel == "Apply") {
    } else {
      setOpen(true);

      setTitle("Add Leave Policy");
      setDescription("Define Leave Guidelines ");
      setComponent("manageLeaveType");
    }
  };

  const handleLeaveTypeClick = (leaveType: any) => {
    setOpen(true);

    setTitle("Edit Leave Policy");
    setComponent("manageLeaveType");
    setCompProps({ leaveType });
  };
  const handleLeaveTypeDeleteClick = (leaveType: any) => {
    setTitle("Edit Leave Policy");
    setComponent("manageLeaveType");
    setCompProps({ leaveType });
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
        <h1 className="flex-1  whitespace-nowrap text-2xl font-semibold tracking-tight ">
          All Leaves
        </h1>
        {addButtonLabel && (
          <Button
            variant="outline"
            className=" h-8  gap-2"
            onClick={handleAddPolicyClick}
          >
            <CirclePlus className="h-4 w-4" />
            <span className="hidden sm:block">{addButtonLabel} </span>
          </Button>
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
                      <CardFooter className="flex justify-end   p-4  gap-2 lg:p-6 md:p-6  lg:pt-0  md:pt-0  pt-0">
                        <Button variant="outline" size="sm" className="gap-2">
                          <span className="">Cancel</span>
                        </Button>
                        <Button size="sm" className="gap-2">
                          <span className="">Edit</span>
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
            {allLeavesTypes.map((leave) => {
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
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleLeaveTypeClick(leave)}
                        variant="ghost"
                        size="icon"
                        className="gap-2"
                      >
                        <Pencil className="h-4 w-4 " />
                      </Button>

                      <AlertDialogDemo leaveType={leave}></AlertDialogDemo>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}

export function AlertDialogDemo({ leaveType }: any) {
  const dispatch: AppDispatch = useDispatch();
  const handleLeaveTypeDelete = () => {
    dispatch(DeleteLeaveTypes(leaveType.id));
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {/* <Button variant="outline">Show Dialog</Button> */}
        <div className=" cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 w-9 px-0">
          <Trash2 className="h-4 w-4 " />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will delete your Leave Policy.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLeaveTypeDelete}>
            Continue
          </AlertDialogAction>
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

const leaveTypeSchema = z.object({
  name: z.string().max(50, "Character lkmit exceeded"),
  numLeavesAvailable: z.number().max(365, "Please Enter number less than 30"),
});
export const ManageLeaveType = ({ leaveType = {} }: any) => {
  const { open, setOpen }: any = useContext(DrawerContext);

  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(leaveTypeSchema),
    defaultValues: {
      name: leaveType?.name || "",
      numLeavesAvailable: leaveType?.numLeavesAvailable || "",
    },
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      // Dispatch the addTable action and wait for it to complete
      if (leaveType?.name) {
        leaveType = JSON.parse(JSON.stringify(leaveType));
        leaveType.name = data.name;
        leaveType.numLeavesAvailable = data.numLeavesAvailable;
        await dispatch(UpdateLeaveTypes(leaveType)).unwrap();
      } else {
        await dispatch(createAllLeaveTypes(data)).unwrap();
      }
      setOpen(false);
    } catch (error) {
      console.error("Failed to add table:", error);
    }
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="name">Name</FormLabel>
              <FormControl>
                <Input id="name" placeholder="Sick Leaves" {...field} />
              </FormControl>
              {fieldState.error && (
                <FormMessage>{fieldState.error.message}</FormMessage>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="numLeavesAvailable"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="numLeavesAvailable">Total Leaves</FormLabel>
              <FormControl>
                <Input
                  id="numLeavesAvailable"
                  type="number"
                  placeholder="365"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              {fieldState.error && (
                <FormMessage>{fieldState.error.message}</FormMessage>
              )}
            </FormItem>
          )}
        />

        <Button loading={isLoading} type="submit">
          Save
        </Button>
      </form>
    </Form>
  );
};
