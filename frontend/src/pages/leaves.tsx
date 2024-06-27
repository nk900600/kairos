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
  NotebookPen,
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
  createLeave,
  deleteLeave,
  fetchAllLeaveTypes,
  fetchAllLeaves,
  updateLeave,
  updateLeaveStatus,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { DatePickerWithRange } from "./common/datePicker";
import { addDays, format, subDays } from "date-fns";
import { EmptyPlaceholder } from "./common/emptyPlaceholder";

export default function LeavesComponent() {
  const [addButtonLabel, setAddButtonLabel] = useState("Apply Leave");
  const [tab, setTab] = useState("pending");
  const { allLeavesTypes, allLeaves, myAccount, isAdmin, allEmployees } =
    useSelector((state: { table: RootState }) => state.table);
  const dispatch: AppDispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAllLeaveTypes());
    dispatch(fetchAllLeaves());
  }, [dispatch]);

  const handleClick = (e: any) => {
    switch (e) {
      case "pending":
        setAddButtonLabel("Apply Leave");
        setTab("pending");
        return;
      case "policy":
        setAddButtonLabel("Add Policy");
        setTab("policy");
        return;
      default:
        setAddButtonLabel("");
        setTab("history");
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
    setOpen(true);

    if (addButtonLabel == "Apply Leave") {
      setTitle("Apply Leave");
      setDescription("Please choose start date and end date");
      setComponent("manageLeave");
    } else {
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

  const handleEditClick = (leave: any) => {
    setOpen(true);
    setTitle("Edit Leave");
    setDescription("Please choose start date and end date");
    setComponent("manageLeave");
    setCompProps({ leave: leave });
  };
  const handleApproveClick = (leave: any) => {
    dispatch(updateLeaveStatus({ id: leave.id, status: "Approved" }));
  };
  const handleRejectClick = (leave: any) => {
    dispatch(updateLeaveStatus({ id: leave.id, status: "Rejected" }));
  };
  const handleLeaveDelete = (leave: any) => {
    dispatch(deleteLeave(leave.id));
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
        <h1 className="flex-1  whitespace-nowrap text-lg sm:text-2xl   font-semibold tracking-tight ">
          All Leaves
        </h1>
        {addButtonLabel && (
          <>
            {isAdmin && tab == "policy" ? (
              <Button
                variant="outline"
                className=" h-8  gap-2"
                onClick={handleAddPolicyClick}
              >
                <CirclePlus className="h-4 w-4" />
                <span className="hidden sm:block">{addButtonLabel} </span>
              </Button>
            ) : (
              ""
            )}

            <>
              {(tab == "pending" || tab == "history") && (
                <Button
                  variant="outline"
                  className=" h-8  gap-2"
                  onClick={handleAddPolicyClick}
                >
                  <CirclePlus className="h-4 w-4" />
                  <span className="hidden sm:block">{addButtonLabel} </span>
                </Button>
              )}
            </>
          </>
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
            {allLeaves
              .filter((leave: any) => leave.status === "Pending")
              .filter(
                (val) =>
                  val.createdBy == myAccount?.employee?.id ||
                  val.managerId == myAccount?.employee?.id
              )
              .map((leave) => {
                return (
                  <>
                    <Card className="flex w-full flex-col items">
                      <CardHeader className="flex p-4 gap-2 lg:p-6 md:p-6">
                        <div className=" flex w-full items-center gap-3 rounded-md ">
                          <CalendarClock className="h-6 w-6" />

                          <div className="flex-col text-sm">
                            <CardTitle className="text-sm ">
                              From {leave.startDate} To {leave.endDate}
                            </CardTitle>

                            <CardDescription className="text-xs">
                              {leave.name} {"(" + leave.duration + " Days)"}
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
                              Employee:
                            </span>{" "}
                            <span>
                              {allEmployees.find(
                                (val) => val.id == leave.createdBy
                              )?.firstName +
                                " " +
                                allEmployees.find(
                                  (val) => val.id == leave.createdBy
                                )?.lastName}
                            </span>
                          </div>
                        </div>
                        {leave?.reason && (
                          <div className="flex items-center">
                            <NotebookPen className="h-3 w-3 mr-1.5" />
                            <div className="text-sm">
                              <span className="text-muted-foreground text-xs">
                                Reason:
                              </span>{" "}
                              <span>{leave.reason}</span>
                            </div>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="flex justify-end   p-4  gap-2 lg:p-6 md:p-6  lg:pt-0  md:pt-0  pt-0">
                        {myAccount?.employee?.id == leave.createdBy && (
                          <>
                            <Button
                              onClick={() => handleLeaveDelete(leave)}
                              variant="outline"
                              size="sm"
                              className="gap-2"
                            >
                              <span className="">Cancel</span>
                            </Button>
                            <Button
                              onClick={() => handleEditClick(leave)}
                              size="sm"
                              className="gap-2"
                            >
                              <span className="">Edit</span>
                            </Button>
                          </>
                        )}
                        {myAccount?.employee?.id == leave.managerId && (
                          <>
                            <Button
                              onClick={() => handleApproveClick(leave)}
                              size="sm"
                              className="gap-2"
                            >
                              <span className="">Approve</span>
                            </Button>
                            <Button
                              onClick={() => handleRejectClick(leave)}
                              size="sm"
                              className="gap-2"
                            >
                              <span className="">Reject</span>
                            </Button>
                          </>
                        )}
                      </CardFooter>
                    </Card>
                  </>
                );
              })}
          </div>
          {!allLeaves
            .filter((leave: any) => leave.status === "Pending")
            .filter(
              (val) =>
                val.createdBy == myAccount?.employee?.id ||
                val.managerId == myAccount?.employee?.id
            ).length && (
            <EmptyPlaceholder
              title="No Leaves Applied yet"
              description="Remember, even superheroes need a day off!"
              buttonText="Apply leaves"
              type="leaves"
              onButtonClick={() => handleAddPolicyClick()}
            ></EmptyPlaceholder>
          )}
        </TabsContent>
        <TabsContent value="history">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6  ">
            {allLeaves
              .filter(
                (leave) =>
                  leave.status != "Pending" &&
                  leave.createdBy == myAccount?.employee?.id
              )
              .map((leave) => {
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
                            <CardTitle className="text-sm ">
                              From {leave.startDate} To {leave.endDate}
                            </CardTitle>

                            <CardDescription className="text-xs">
                              {leave?.LeaveType?.name}{" "}
                              {"(" + leave?.duration + " Days)"}
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

                      {leave?.reason && (
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
                      )}
                    </Card>
                  </>
                );
              })}
          </div>
          {!allLeaves.filter(
            (val) =>
              val.status != "Pending" &&
              val.createdBy == myAccount?.employee?.id
          ).length && (
            <EmptyPlaceholder
              title="No Leaves history yet"
              description="Remember, even superheroes need a day off!"
              type="leaves"
              buttonText=""
            ></EmptyPlaceholder>
          )}
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
                      <CardTitle className="text-sm">{leave.name}</CardTitle>

                      <CardDescription className="text-xs">
                        <p className="text-sm text-muted-foreground">
                          {leave.description}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {leave.numLeavesAvailable + " Days"}
                        </p>
                      </CardDescription>
                    </div>
                    {isAdmin && (
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
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {!allLeavesTypes.length && (
            <EmptyPlaceholder
              title="No Leave Policy Added yet"
              description=""
              buttonText="Add new policy"
              type="leaves"
              onButtonClick={() => handleAddPolicyClick()}
            ></EmptyPlaceholder>
          )}
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

const startDateSchema = z.date().refine(
  (date) => {
    // Check if the date is today or in the future
    return date >= new Date();
  },
  {
    message: "Start date must be today or later.",
  }
);

const leaveSchema = z
  .object({
    start: startDateSchema,
    end: z.date(),
  })
  .refine((data) => data.end >= data.start, {
    message: "End date must be on or after the start date.",
    path: ["dates", "end"],
  });

export const ManageLeave = ({ leave }: any) => {
  const { setOpen }: any = React.useContext(DrawerContext);
  const { allLeavesTypes, myAccount } = useSelector(
    (state: { table: RootState }) => state.table
  );
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [leaveType, setLeaveType] = useState(allLeavesTypes[0]?.name);
  const [reason, setReason] = useState("");
  const form = useForm({
    resolver: zodResolver(leaveSchema),
    defaultValues: {
      startDate: leave?.startDate ? new Date(leave?.startDate) : new Date(), // default to current date
      endDate: leave?.endDate ? new Date(leave?.endDate) : new Date(), // default to current date, adjust as necessary
    },
  });

  React.useEffect(() => {
    dispatch(fetchAllLeaveTypes());
  }, [dispatch]);

  const { setValue, getValues } = form;

  const onSubmit = async () => {
    let dates: any = getValues();
    if (!dates.startDate || !dates.endDate) {
      return;
    }
    setIsLoading(true);

    try {
      // Dispatch the addTable action and wait for it to complete
      if (leave?.id) {
        // await dispatch(updateEmployees(data)).unwrap();
        let payload = {
          startDate: dates.startDate,
          endDate: dates.endDate,
          id: leave?.id,
          reason: reason,
        };
        await dispatch(updateLeave(payload)).unwrap();
      } else {
        let payload = {
          startDate: dates.startDate,
          endDate: dates.endDate,
          reason: reason,
          LeaveTypeId: allLeavesTypes.find((val) => val.name == leaveType)?.id,
          managerId: myAccount.employee.managerId || myAccount.employee.id,
        };

        await dispatch(createLeave(payload)).unwrap();
      }
      setOpen(false);
    } catch (error) {
      console.error("Failed to add table:", error);
    }
    setIsLoading(false);
  };

  const handleDesginationChange = (data: any) => {
    setLeaveType(data);
  };

  const handleDatePicker = (from: any, to: any) => {
    setValue("startDate", from); // Set startDate to April 1, 2024
    setValue("endDate", to);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        {/* <div className="grid grid-cols-2 gap-4"> */}
        <FormField
          control={form.control}
          name="startDate"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="startDate">Select Dates</FormLabel>
              <FormControl>
                <DatePickerWithRange
                  onDateChange={handleDatePicker}
                  className="w-full"
                  defaultEnd={3}
                  showRangeButton={false}
                ></DatePickerWithRange>
              </FormControl>
              {fieldState.error && (
                <FormMessage>{fieldState.error.message}</FormMessage>
              )}
            </FormItem>
          )}
        />

        {!leave?.id && (
          <FormItem>
            <FormLabel htmlFor="desgination">Leave Policy</FormLabel>
            <Select
              onValueChange={handleDesginationChange}
              defaultValue={leaveType}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a Leave Policy" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {allLeavesTypes.map((item) => {
                  return <SelectItem value={item.name}>{item.name}</SelectItem>;
                })}
              </SelectContent>
            </Select>
          </FormItem>
        )}
        <FormItem>
          <FormLabel htmlFor="desgination">Reason</FormLabel>
          <Textarea onChange={(e) => setReason(e.target.value)}></Textarea>
        </FormItem>
        <Button loading={isLoading} onClick={onSubmit}>
          {leave?.id ? "Update Leave" : "Add Leave"}
        </Button>
      </form>
    </Form>
  );
};

const leaveTypeSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required.")
    .max(50, "Character Limit exceeded"),
  numLeavesAvailable: z
    .number()
    .min(1, "Leaves must be at least 1.")
    .max(365, "Please Enter number less than 30"),
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
