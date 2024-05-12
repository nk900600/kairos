import {
  Armchair,
  ArrowLeft,
  CirclePlus,
  ClockIcon,
  Edit,
  Edit2,
  Edit3,
  Ellipsis,
  ListFilter,
  Pencil,
  Plug,
  Plus,
  Ratio,
  Trash2,
  UserIcon,
  Users,
} from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { DrawerDialogComponent } from "../common/drawerDialog";

import { useLocation } from "react-router-dom";
import { GoBackButton } from "./common/goBackButton";
import { BreadcrumbComponent } from "./common/breadCrumbs";
import { useDispatch, useSelector } from "react-redux";
import {
  addTable,
  createTableSession,
  deleteTable,
  fetchAllTableSession,
  fetchTables,
  updateTable,
  updateTableStatus,
} from "../redux/actions";
import { AppDispatch } from "../redux/store";
import { RootState } from "../redux/reducer";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import DrawerContext from "../context/drawerContext";
import { EmptyPlaceholder } from "./common/emptyPlaceholder";
import { dateConvertor } from "../util/date";
import { format } from "date-fns";
import { LiveTimer } from "../hooks/liveTImer";
const AllDesgination = [
  {
    id: 0,
    value: "Available",
    isChecked: true,
  },
  {
    id: 2,
    value: "Cleaning",
    isChecked: false,
  },
  {
    id: 3,
    value: "Maintenance",
    isChecked: false,
  },
];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function TableComponent() {
  const {
    open,
    setOpen,
    title,
    setTitle,
    setComponent,
    setDescription,
    setCompProps,
  } = useContext(DrawerContext);
  let query = useQuery();

  const {
    alltables: tables,
    allTableSessions,
    allEmployees,
  } = useSelector((state: { table: RootState }) => state.table);
  const [tabValue, setTableValue] = useState("available");
  const [openMenu, setOpenMenu] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = (e: any) => {
    setTableValue(e);
  };

  useEffect(() => {
    let mytables = query.get("mytables");
    if (mytables) setTableValue("occupied");
  }, [dispatch]);

  const handleEditClick = (table: any) => {
    setOpen(true);
    setTitle("Edit Table");
    setDescription(" ");
    setCompProps({ tableData: table });
  };

  const handleAddClick = (event: any) => {
    setOpen(true);
    setTitle("Add Table");
    setComponent("manageTable");
    setDescription("Please add New Table ");
  };

  const handleReservationClick = (event: any) => {
    setOpen(true);
    setTitle("Create Reservation");
    setDescription("Please Create a new resertvation ");
    setComponent("manageReservation");
  };

  const DropdownMenuList = (table: any) => (
    <DropdownMenuContent className="w-56" align="end">
      <DropdownMenuLabel>Mark as</DropdownMenuLabel>
      <DropdownMenuSeparator />

      {AllDesgination.map((data, i) => {
        return (
          <DropdownMenuCheckboxItem
            checked={data.value == table.status}
            onCheckedChange={(e) => handleOnCheck(data.value, table)}
          >
            {data.value}
          </DropdownMenuCheckboxItem>
        );
      })}

      {/* {["Available"].includes(table.status) && (
        <>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleReservationClick(table)}>
            <Plus className="mr-2 h-4 w-4 " />
            <span>Create reservation</span>
          </DropdownMenuItem>
        </>
      )} */}
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={() => handleEditClick(table)}>
        <>
          <Pencil className="mr-2 h-4 w-4 " />
          <span>Edit</span>
        </>
      </DropdownMenuItem>

      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={() => dispatch(deleteTable(table.id))}>
        <Trash2 className="mr-2 h-4 w-4 text-destructive" />
        <span>Delete</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );

  const handleOnCheck = (status: any, table: any) => {
    dispatch(updateTableStatus({ id: table.id, status: status }));
  };
  const handleNewOrderClick = async (table: any) => {
    await dispatch(
      createTableSession({
        startTime: Date.now(),
        customerName: "",
        customerMobile: 0,
        tableId: table.id,
      })
    ).unwrap();
    navigate("/place-order/table/" + table.id);
  };
  const handleOrderClick = async (table: any) => {
    navigate("/place-order/table/" + table.id);
  };

  const allAvailableTables = tables.filter(
    (table: any) => table.status == "Available"
  );

  return (
    <>
      <BreadcrumbComponent
        list={[
          { link: "/", label: "Dashboard" },
          { link: "/tables", label: "All Tables" },
        ]}
      />
      <div className="flex items-center gap-4">
        <GoBackButton />
        <h1 className="flex-1  whitespace-nowrap text-lg sm:text-2xl  font-semibold tracking-tight ">
          All Tables
        </h1>

        <Button
          variant="outline"
          onClick={handleAddClick}
          className=" h-8  gap-2"
        >
          <CirclePlus className="h-4 w-4" />
          <span className="hidden sm:block">Add Table</span>
        </Button>
      </div>
      <Tabs
        defaultValue={tabValue}
        value={tabValue}
        onValueChange={handleClick}
        className="w-full"
      >
        <TabsList className="grid w-full mb-4 lg:w-2/3 grid-cols-3">
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="occupied">
            <span className="hidden sm:block">Occupied</span>
            <span className="block sm:hidden">Occupied</span>

            {/*  Future: <span className="block sm:hidden">Occ / Res</span> */}
          </TabsTrigger>
          <TabsTrigger value="others">Others</TabsTrigger>
        </TabsList>
        <TabsContent value="available">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6  ">
            {allAvailableTables.map((table: any) => {
              return (
                <Card className="flex w-full flex-col items">
                  <CardHeader className="flex p-4 gap-2 lg:p-6 md:p-6">
                    <div className=" flex w-full items-center gap-3 rounded-md ">
                      <Ratio className=" h-6 w-6 " />
                      <div className="flex-col">
                        <CardTitle className="text-base">
                          {table.tableName}
                        </CardTitle>

                        <CardDescription className="text-xs">
                          Seats {table.capacity}
                        </CardDescription>
                      </div>
                      <div className="ml-auto">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="  h-8 w-8 "
                            >
                              <Ellipsis className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          {DropdownMenuList(table)}
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardHeader>
                  <CardFooter className="flex justify-center   p-4  gap-2 lg:p-6 md:p-6  lg:pt-0  md:pt-0  pt-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-2"
                      onClick={() => handleNewOrderClick(table)}
                    >
                      <span>Create Order </span>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
          {!allAvailableTables?.length && (
            <EmptyPlaceholder
              title="No Tables Available"
              description="Sorry, we are fully booked at the moment. Please check back later or try reserving for another time."
              buttonText=""
              type="table"
            ></EmptyPlaceholder>
          )}
        </TabsContent>
        <TabsContent value="occupied">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6  ">
            {tables
              .filter(
                (table: any) =>
                  table.status == "Occupied" || table.status == "Reserved"
              )
              .map((table: any) => {
                return (
                  <Card className="flex w-full flex-col items">
                    <CardHeader className="flex p-4 gap-2 lg:p-6 md:p-6">
                      <div className=" flex w-full items-center gap-3 rounded-md ">
                        <Ratio className=" h-6 w-6 " />

                        <div className="flex-col">
                          <CardTitle className="text-base ">
                            {table.tableName}
                          </CardTitle>

                          <CardDescription className="text-xs">
                            Seats {table.capacity}
                          </CardDescription>
                        </div>
                        <div className="flex-1">
                          <Badge variant={"secondary"}> {table.status}</Badge>
                        </div>
                        {/* <div className="ml-auto">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="  h-8 w-8 "
                          >
                            <Ellipsis className="h-4 w-4" />
                            <span className="sr-only">Back</span>
                          </Button>
                        </div> */}
                        <div className="ml-auto">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="  h-8 w-8 "
                              >
                                <Ellipsis className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            {DropdownMenuList(table)}
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-col text-sm p-4    gap-2 lg:p-6 md:p-6  pt-0  lg:pt-0  md:pt-0   ">
                      <div className="flex items-center">
                        <UserIcon className="h-3 w-3 mr-1.5" />
                        <div className="text-sm">
                          <span className="text-muted-foreground text-xs">
                            {table.status != "Occupied"
                              ? "Reserved for:"
                              : "Assigned to:"}
                          </span>{" "}
                          <span>
                            {table.status != "Occupied"
                              ? table.reservationName
                              : allEmployees?.find(
                                  (val) => val.id == table.createdBy
                                )?.firstName +
                                " " +
                                allEmployees?.find(
                                  (val) => val.id == table.createdBy
                                )?.lastName}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="h-3 w-3 mr-1.5" />
                        <div className="text-sm">
                          <span className="text-muted-foreground text-xs ">
                            {table.status != "Occupied"
                              ? "Reservation at:"
                              : "Timer:"}
                          </span>
                          {"  "}
                          <span>
                            {/* {allTableSessions?.find(
                              (session) => session.tableId == table.id
                            )?.startTime
                              ? format(
                                  allTableSessions?.find(
                                    (session) => session.tableId == table.id
                                  )?.startTime || Date.now(),
                                  "HH:mm:ss"
                                )


                              : ""} */}

                            {/* <LiveTimer/> */}

                            {allTableSessions?.find(
                              (session) => session.tableId == table.id
                            )?.startTime && (
                              <LiveTimer
                                key={table.id}
                                initialDate={
                                  allTableSessions?.find(
                                    (session) => session.tableId == table.id
                                  )?.startTime
                                }
                              />
                            )}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-center   p-4  gap-2 lg:p-6 md:p-6  lg:pt-0  md:pt-0  pt-0">
                      <Button variant="outline" size="sm" className="w-full">
                        {table.status != "Occupied"
                          ? "Cancel Reservation"
                          : "Close tab"}
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full gap-2"
                        onClick={() => handleOrderClick(table)}
                      >
                        <span className="">Create Order</span>
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}

            {/* {!availbleTables?.length && (
              <EmptyPlaceholder
                title="No Tables Available"
                description="Sorry, we are fully booked at the moment. Please check back later or try reserving for another time."
                buttonText=""
                image="./closed_stores.gif"
              ></EmptyPlaceholder>
            )} */}
          </div>
        </TabsContent>
        <TabsContent value="others">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6  ">
            {tables
              .filter(
                (table: any) =>
                  !["Occupied", "Available", "Reserved"].includes(table.status)
              )
              .map((table: any) => {
                return (
                  <Card className="flex w-full flex-col items">
                    <CardHeader className="flex p-4 gap-2 lg:p-6 md:p-6">
                      <div className=" flex w-full items-center gap-3 rounded-md ">
                        <Ratio className=" h-6 w-6 " />
                        <div className="flex-col">
                          <CardTitle className="text-base">
                            {table.tableName}
                          </CardTitle>

                          <CardDescription className="text-xs">
                            Seats {table.capacity}
                          </CardDescription>
                        </div>
                        <div className="flex-1">
                          {table.status === "Available" && (
                            <Badge> {table.status}</Badge>
                          )}
                          {(table.status == "Reserved" ||
                            table.status == "Occupied") && (
                            <Badge variant={"secondary"}> {table.status}</Badge>
                          )}
                          {table.status !== "Reserved" &&
                            table.status !== "Occupied" &&
                            table.status !== "Available" && (
                              <Badge variant={"destructive"}>
                                {" "}
                                {table.status}
                              </Badge>
                            )}
                        </div>
                        <div className="ml-auto">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="  h-8 w-8 "
                              >
                                <Ellipsis className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            {DropdownMenuList(table)}
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-col text-sm p-4    gap-2 lg:p-6 md:p-6  pt-0  lg:pt-0  md:pt-0   ">
                      <div className="flex items-center">
                        <ClockIcon className="h-3 w-3 mr-1.5" />
                        <div className="text-sm">
                          <span className="text-muted-foreground text-xs">
                            Unavailable Since:
                          </span>
                          {"  "}
                          <span>20 mins 52 sec</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}

// Define the form validation schema using Zod
const tableSchema = z.object({
  tableName: z
    .string()
    .min(1, "Table name is required.")
    .max(50, "Character lkmit exceeded"),
  capacity: z
    .number()
    .min(1, "Seat capacity must be at least 1.")
    .max(30, "Please Enter number less than 30"),
});

export const ManageTable = ({ tableData = {} }: any) => {
  const { open, setOpen }: any = useContext(DrawerContext);

  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(tableSchema),
    defaultValues: {
      tableName: tableData?.tableName || "",
      capacity: tableData?.capacity || "",
    },
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      // Dispatch the addTable action and wait for it to complete
      if (tableData?.tableName) {
        tableData = JSON.parse(JSON.stringify(tableData));
        tableData.tableName = data.tableName;
        tableData.capacity = data.capacity;
        await dispatch(updateTable(tableData)).unwrap();
      } else {
        await dispatch(addTable(data)).unwrap();
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
          name="tableName"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="tableName">Table Name</FormLabel>
              <FormControl>
                <Input id="tableName" placeholder="Table 1" {...field} />
              </FormControl>
              {fieldState.error && (
                <FormMessage>{fieldState.error.message}</FormMessage>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="capacity"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="capacity">Seat Capacity</FormLabel>
              <FormControl>
                <Input
                  id="capacity"
                  type="number"
                  placeholder="4"
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

// Define the form validation schema using Zod
const resetvationSchema = z.object({
  tableName: z
    .string()
    .min(1, "Table name is required.")
    .max(50, "Character lkmit exceeded"),
  capacity: z
    .number()
    .min(1, "Seat capacity must be at least 1.")
    .max(30, "Please Enter number less than 30"),
});

export const ManageReservation = ({ tableData = {} }: any) => {
  const { open, setOpen }: any = useContext(DrawerContext);

  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(resetvationSchema),
    defaultValues: {
      reservationName: tableData?.reservationName || "",
      reservationTime: tableData?.reservationTime || "",
    },
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      // Dispatch the addTable action and wait for it to complete
      if (tableData?.reservationName) {
        tableData = JSON.parse(JSON.stringify(tableData));
        tableData.reservationName = data.reservationName;
        tableData.reservationTime = data.reservationTime;
        await dispatch(updateTable(tableData)).unwrap();
      } else {
        await dispatch(addTable(data)).unwrap();
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
          name="reservationName"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="reservationName">Customer Name</FormLabel>
              <FormControl>
                <Input
                  id="reservationName"
                  placeholder="Joe rogan"
                  {...field}
                />
              </FormControl>
              {fieldState.error && (
                <FormMessage>{fieldState.error.message}</FormMessage>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reservationTime"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="reservationTime">Reservation Time</FormLabel>
              <FormControl>
                <Input
                  id="reservationTime"
                  type="number"
                  placeholder="4"
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
