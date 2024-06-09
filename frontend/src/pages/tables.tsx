import {
  Armchair,
  ArrowLeft,
  ArrowRight,
  CircleDollarSign,
  CirclePlus,
  ClockIcon,
  CreditCard,
  DollarSign,
  DownloadIcon,
  Edit,
  Edit2,
  Edit3,
  Ellipsis,
  ListFilter,
  Pencil,
  Plug,
  Plus,
  Ratio,
  ShoppingBag,
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
import { ReactComponent as VegIcon } from "../VegIcon.svg";
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
  createBulkTable,
  createTableSession,
  deleteTable,
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
import { format, parseISO } from "date-fns";
import { LiveTimer } from "../hooks/liveTImer";
import { Separator } from "../components/ui/separator";
import { currencyMap } from "./menus";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import { useSwipeable } from "react-swipeable";
import { OrderStatuses } from "./chefsPanel";
import { ScrollArea } from "../components/ui/scroll-area";
import { useQuery } from "../util/query";
import { toast } from "sonner";
import { validateData } from "../util/validateExcelFromSchema";
import * as XLSX from "xlsx";
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

const TableStatus = Object.freeze({
  AVAILABLE: "Available",
  OCCUPIED: "Occupied",
  RESERVED: "Reserved",
  CLEANING: "Cleaning",
  MAINTENANCE: "Maintenance",
});

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
  const [currentTable, setCurrentTable] = useState<any>();
  const [currentTableSession, setCurrentTableSession] = useState<any>();

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = (e: any) => {
    setTableValue(e);
  };
  const [isOpen, setOpenPanel] = useState<boolean | undefined>(undefined);

  let sheetProps: any = {
    open: isOpen,
    onOpenChange: (data: any) => {
      setOpenPanel(data);
    },
  };
  const handlers = useSwipeable({
    onSwipedRight: (eventData: any) => {
      console.log(eventData);
      setOpenPanel(false);
    },
  });

  useEffect(() => {
    let mytables = query.get("mytables");
    if (mytables) setTableValue("occupied");
  }, [dispatch]);
  useEffect(() => {
    setCurrentTableSession(
      allTableSessions?.filter((val) => val.status == "Active")
    );
  }, [allTableSessions]);

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
      {!["Occupied", "Reserved"].includes(table.status) && (
        <>
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
        </>
      )}
    </DropdownMenuContent>
  );

  const handleOnCheck = (status: any, table: any) => {
    dispatch(updateTableStatus({ id: table.id, status: status }));
  };
  const handleNewOrderClick = async (table: any) => {
    try {
      await dispatch(
        createTableSession({
          startTime: Date.now(),
          customerName: "",
          customerMobile: 0,
          tableId: table.id,
        })
      ).unwrap();
      navigate("/place-order/table/" + table.id);
    } catch (e) {}
  };
  const handleOrderClick = async (table: any) => {
    navigate("/place-order/table/" + table.id);
  };
  const handleCloseTabClick = async (table: any) => {
    setCurrentTable(table);
    setOpenPanel(true);
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
          {!!tables.length && !allAvailableTables?.length && (
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
                            {currentTableSession?.find(
                              (session: any) => session.tableId == table.id
                            )?.startTime && (
                              <LiveTimer
                                key={table.id}
                                initialDate={
                                  currentTableSession?.find(
                                    (session: any) =>
                                      session.tableId == table.id
                                  )?.startTime
                                }
                              />
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <ShoppingBag className="h-3 w-3 mr-1.5" />
                        <div className="text-sm">
                          <span className="text-muted-foreground text-xs ">
                            Orders
                          </span>
                          {"  "}
                          <span>
                            {
                              currentTableSession?.find(
                                (session: any) => session.tableId == table.id
                              )?.orderCount
                            }
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-center   p-4  gap-2 lg:p-6 md:p-6  lg:pt-0  md:pt-0  pt-0">
                      {currentTableSession?.find(
                        (session: any) => session.tableId == table.id
                      )?.orderCount != 0 ? (
                        <>
                          {" "}
                          <Button
                            onClick={() => handleCloseTabClick(table)}
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            {table.status != "Occupied"
                              ? "Cancel Reservation"
                              : "Close tab"}
                          </Button>
                        </>
                      ) : (
                        <Button
                          onClick={() =>
                            dispatch(
                              updateTableStatus({
                                id: table.id,
                                status: "Available",
                              })
                            )
                          }
                          variant="outline"
                          size="sm"
                          className="w-full"
                        >
                          {table.status != "Occupied"
                            ? "Cancel Reservation"
                            : "Make it Available"}
                        </Button>
                      )}

                      <Button
                        variant="default"
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
          </div>
          {!!tables.length &&
            !tables.filter(
              (table: any) =>
                table.status == "Occupied" || table.status == "Reserved"
            )?.length && (
              <EmptyPlaceholder
                title="No Tables Occupied"
                description="No tables are in use at the moment. Enjoy the calm before the rush, or seat your first guest now!"
                buttonText=""
                type="table"
              ></EmptyPlaceholder>
            )}
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
                          <span className=" text-sm">
                            {" "}
                            {format(
                              parseISO(table.updatedAt),
                              "dd MMM yyyy 'at' h:mma"
                            )}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
          {!!tables.length &&
            !tables.filter(
              (table: any) =>
                !["Occupied", "Available", "Reserved"].includes(table.status)
            )?.length && (
              <EmptyPlaceholder
                title="Bravo! All tables are in use "
                description="Congratulations! All tables are currently in use. Ensure every guest has a wonderful dining experience.!"
                buttonText=""
                type="table"
              ></EmptyPlaceholder>
            )}
        </TabsContent>
        {!tables.length && (
          <EmptyPlaceholder
            title="No Tables Added yet"
            description="To ensure we can accommodate more guests and optimize our seating arrangement, please add a new table to your restaurant management system."
            buttonText="Add Table"
            type="table"
            onButtonClick={() => handleAddClick("")}
          ></EmptyPlaceholder>
        )}
      </Tabs>

      <Sheet {...sheetProps}>
        <SheetTrigger asChild></SheetTrigger>
        <SheetContent className="w-full" {...handlers}>
          <ClosetabPanel
            tableSessionObj={currentTableSession?.find(
              (session: any) => session.tableId == currentTable?.id
            )}
            onClose={() => setOpenPanel(false)}
          ></ClosetabPanel>
          {/* <EditOrderComponent order={editOrderData}></EditOrderComponent> */}
        </SheetContent>
      </Sheet>
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
  const [currentStep, setCurrentStep] = useState(
    tableData?.id ? "one" : "bulk"
  );
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
  const handleCurrentStepClick = (step: any) => {
    setCurrentStep(step);
  };

  return (
    <>
      {currentStep == "bulk" && (
        <BulkCreationTable
          success={() => setOpen(false)}
          currentStepClick={handleCurrentStepClick}
        />
      )}

      {currentStep == "one" && (
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

            <div className="flex gap-4">
              {!tableData?.id && (
                <Button
                  variant={"secondary"}
                  onClick={() => setCurrentStep("bulk")}
                >
                  Back
                </Button>
              )}
              <Button loading={isLoading} type="submit" className="w-full">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </>
  );
};

const addTableBulkSchema = z.object({
  "Table Name": z
    .string()
    .min(1, "Table name is required.")
    .max(50, "Character lkmit exceeded"),
  "No of seats": z
    .number()
    .min(1, "Seat capacity must be at least 1.")
    .max(30, "Please Enter number less than 30"),
});

export const BulkCreationTable = ({ currentStepClick, success }: any) => {
  const [excelErrors, setExcelError] = useState<any>([]);
  const [excelData, setExcelData] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
  const dispatch: AppDispatch = useDispatch();
  const handleExcelDownload = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const url =
      "https://kairos-public-images.s3.eu-north-1.amazonaws.com/bulk_creation_template/Sample_Table_Template.xlsx";
    const link = document.createElement("a");
    link.href = url;
    link.download = "Sample_Menu_Template.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileChange = async (e: any) => {
    setExcelError(null);
    setExcelData(null);
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const validationErrors = validateData(jsonData, addTableBulkSchema);
        if (validationErrors.length > 0) {
          validationErrors.forEach((row: any) => {
            row.errors.forEach((e: any) => {
              toast.error(
                `Excel error: Row ${row.row}, Col name:${e.path}, error:${e.message}`
              );
            });
          });
          setExcelError(validationErrors);
        } else {
          setExcelData(jsonData);
        }
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const handleExcelUpload = async () => {
    if (excelErrors && excelErrors.length > 0) {
      excelErrors.forEach((row: any) => {
        row.errors.forEach((e: any) => {
          toast.error(
            `Excel error: Row ${row.row}, Col name:${e.path}, error:${e.message}`
          );
        });
      });
      return;
    }
    if (excelData.length == 0) {
      toast.error(`No Employee Data found`);
      return;
    }
    try {
      setLoading(true);
      let payload = excelData.map((table: any) => ({
        tableName: table["Table Name"],
        capacity: table["No of seats"],
      }));

      await dispatch(createBulkTable(payload)).unwrap();
      setLoading(false);
      success();
    } catch (e) {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="grid gap-4">
        <div className="grid gap-1">
          {/* <FormLabel>Bulk Upload</FormLabel> */}
          <Label htmlFor="file-upload">Bulk Upload</Label>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Upload an Excel file to create multiple tables at once.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Input
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            accept=".xlsx, .xls, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          />
          <Button onClick={handleExcelUpload} loading={loading}>
            Upload
          </Button>
        </div>

        <div
          onClick={(e) => handleExcelDownload(e)}
          className="flex gap-2 bg-blue-100 items-center justify-between cursor-pointer  rounded-lg border p-3 shadow-sm"
        >
          {/* <FormLabel>Bulk Upload</FormLabel> */}
          <div className="grid gap-1 ">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Download an Sample Excel file
            </p>
          </div>

          <DownloadIcon className="w-4 h-4"></DownloadIcon>
        </div>
      </div>

      <Separator orientation="horizontal" />
      <div className="grid gap-4">
        <div className="grid gap-1">
          <Label htmlFor="create-item">Create Single table</Label>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Click the button to create a new item.
          </p>
        </div>
        <Button id="create-item" onClick={() => currentStepClick("one")}>
          Add Single Table
        </Button>
      </div>
    </>
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

export function ClosetabPanel({ tableSessionObj, onClose }: any) {
  const [orderData, setOrderData] = useState<any>([]);
  const [totalAmount, setTotalAmount] = useState<any>(0);
  const [currentPayment, setCurrentPayment] = useState<any>("cash");
  const [loading, setLoading] = useState<any>(false);
  const { alltables, allOrders, allEmployees } = useSelector(
    (state: { table: RootState }) => state.table
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    setTotalAmount(
      allOrders
        .filter((val) => val.tableSessionId == tableSessionObj.id)
        .filter((val) => val.status != OrderStatuses.CANCELLED)
        .reduce((total: any, item: any) => total + item.totalAmount, 0)
    );
  }, [allOrders]);

  const handleSettleBill = async () => {
    setLoading(true);
    try {
      await dispatch(
        updateTableStatus({
          id: tableSessionObj.tableId,
          status: TableStatus.AVAILABLE,
        })
      ).unwrap();
    } catch (e) {
      setLoading(false);
    }
    onClose();
  };
  return (
    <>
      <ScrollArea className=" h-full">
        <SheetHeader className="mb-4">
          <SheetTitle>
            {
              alltables.find((val) => val.id == tableSessionObj.tableId)
                ?.tableName
            }
          </SheetTitle>
          <SheetDescription>
            Waiter -{" "}
            {
              allEmployees?.find(
                (contact) => contact.id == tableSessionObj.createdBy
              )?.firstName
            }{" "}
            {
              allEmployees?.find(
                (contact) => contact.id == tableSessionObj.createdBy
              )?.lastName
            }
          </SheetDescription>
          <Separator className="my-2" />
        </SheetHeader>
        <CardContent className="p-0 mt-3 text-sm">
          <div className="grid gap-3">
            <div className="font-semibold">All Order Details</div>
            <ul className="grid gap-3">
              {allOrders
                .filter((val) => val.tableSessionId == tableSessionObj.id)
                .map((orderData) => {
                  return (
                    <>
                      <span className="text-muted-foreground flex items-center gap-2">
                        Order - {orderData.id}
                        {/* <span className=""> */}
                        {"  "}{" "}
                        {orderData.status == OrderStatuses.CANCELLED && (
                          <Badge variant={"destructive"}>{"Canceled"}</Badge>
                        )}{" "}
                        {(orderData.status == OrderStatuses.CONFIRMED ||
                          orderData.status == OrderStatuses.PREPARING ||
                          orderData.status ==
                            OrderStatuses.READY_FOR_PICKUP) && (
                          // <span className="flex h-2 w-2 rounded-full bg-green-600"></span>
                          <Badge variant={"default"}>{orderData.status}</Badge>
                        )}{" "}
                        {/* </span> */}
                      </span>

                      <CardContent className=" p-4    gap-2 lg:p-6 md:p-6  pt-0  lg:pt-0  md:pt-0  pb-0  lg:pb-0  md:pb-0  px-0  lg:px-0  md:px-0  ">
                        <div className="grid gap-2">
                          {orderData.orderItems.map((item: any) => {
                            return (
                              <>
                                <div className="flex items-center gap-3">
                                  <VegIcon />

                                  <label htmlFor={item.id} className="w-full ">
                                    <div className="grid gap-1 text-sm">
                                      <div className="font-medium">
                                        {item.quantity} x {item.MenuItem.name}
                                      </div>
                                      <div className="text-xs text-gray-500 dark:text-gray-400">
                                        {item.CustomizationChoices.map(
                                          (choice: any) => choice.name
                                        ).join(",")}
                                      </div>
                                    </div>
                                  </label>
                                </div>
                              </>
                            );
                          })}
                        </div>
                      </CardContent>
                      <CardFooter className=" block p-4 gap-2 lg:p-6 md:p-6  pt-0  lg:pt-2  md:pt-2 lg:px-0  md:px-0 lg:pb-0 pb-0  md:pb-0  ">
                        <div className="flex justify-between items-center">
                          <p className="text-xs text-gray-500">
                            {format(
                              parseISO(orderData.orderDate),
                              "dd MMM yyyy 'at' h:mma"
                            )}
                          </p>

                          {/* <Button variant="ghost" className=" h-3 gap-2"> */}
                          <span>
                            {currencyMap.get("INR")}
                            {orderData.totalAmount}
                          </span>
                          {/* </Button> */}
                        </div>
                      </CardFooter>
                      <Separator className="mt-2" />
                    </>
                  );
                })}
            </ul>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between font-semibold">
                <span className="text-muted-foreground">Total</span>
                <span>
                  {" "}
                  {currencyMap.get("INR")}
                  {Math.round(totalAmount)}
                </span>
              </li>
            </ul>
          </div>

          <Separator className="my-4" />

          {allOrders
            .filter((val) => val.tableSessionId == tableSessionObj.id)
            .filter(
              (val) =>
                val.status == OrderStatuses.PREPARING ||
                val.status == OrderStatuses.CONFIRMED ||
                val.status == OrderStatuses.READY_FOR_PICKUP
            ).length ? (
            <div className="bg-blue-100 p-4 rounded-md dark:bg-gray-800">
              <div className="space-y-2">
                <p className="text-gray-500 dark:text-gray-400">
                  We can’t close the bill right now because some of your orders
                  are being prepared, confirmed, or are ready to be served. Once
                  everything is ready, we can settle up. Thanks for waiting!
                </p>
              </div>
            </div>
          ) : (
            <div className="px-2">
              <div className="grid gap-3">
                {/* <div className="font-semibold">Payment Information</div>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant={"outline"}
                    className={`px-6 py-6  text-center text-sm font-medium  flex flex-col items-center justify-center rounded-md h-full ${
                      currentPayment == "cash" && "border border-primary"
                    }`}
                    onClick={() => setCurrentPayment("cash")}
                  >
                    <DollarSign className="mb-2 h-8 w-8" />
                    <span>Cash</span>
                  </Button>
                  <Button
                    variant={"outline"}
                    className={`px-6 py-6 text-center text-sm font-medium  flex flex-col items-center justify-center rounded-md h-full ${
                      currentPayment == "card" && "border border-primary"
                    }`}
                    onClick={() => setCurrentPayment("card")}
                  >
                    <CreditCard className="mb-2 h-8 w-8" />
                    <span>Card</span>
                  </Button>
                </div> */}

                <Button loading={loading} onClick={handleSettleBill}>
                  {" "}
                  Settle Bill
                </Button>
                {/* <div className="p-6 pt-0 grid gap-6"><div role="radiogroup" aria-required="false" dir="ltr" className="grid grid-cols-3 gap-4" tabindex="0" style="outline: none;"><div><button type="button" role="radio" aria-checked="true" data-state="checked" value="card" className="aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 peer sr-only" id="card" aria-label="Card" tabindex="-1" data-radix-collection-item=""><span data-state="checked" className="flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle h-2.5 w-2.5 fill-current text-current"><circle cx="12" cy="12" r="10"></circle></svg></span></button><label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&amp;:has([data-state=checked])]:border-primary" for="card"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="mb-3 h-6 w-6"><rect width="20" height="14" x="2" y="5" rx="2"></rect><path d="M2 10h20"></path></svg>Card</label></div><div><button type="button" role="radio" aria-checked="false" data-state="unchecked" value="paypal" className="aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 peer sr-only" id="paypal" aria-label="Paypal" tabindex="-1" data-radix-collection-item=""></button><label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&amp;:has([data-state=checked])]:border-primary" for="paypal"><svg role="img" viewBox="0 0 24 24" className="mb-3 h-6 w-6"><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z" fill="currentColor"></path></svg>Paypal</label></div><div><button type="button" role="radio" aria-checked="false" data-state="unchecked" value="apple" className="aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 peer sr-only" id="apple" aria-label="Apple" tabindex="-1" data-radix-collection-item=""></button><label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&amp;:has([data-state=checked])]:border-primary" for="apple"><svg role="img" viewBox="0 0 24 24" className="mb-3 h-6 w-6"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" fill="currentColor"></path></svg>Apple</label></div></div><div className="grid gap-2"><label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="name">Name</label><input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="name" placeholder="First Last"></div><div className="grid gap-2"><label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="city">City</label><input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="city" placeholder=""></div><div className="grid gap-2"><label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="number">Card number</label><input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="number" placeholder=""></div><div className="grid grid-cols-3 gap-4"><div className="grid gap-2"><label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="month">Expires</label><button type="button" role="combobox" aria-controls="radix-:r8d:" aria-expanded="false" aria-autocomplete="none" dir="ltr" data-state="closed" data-placeholder="" className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&amp;>span]:line-clamp-1" id="month" aria-label="Month"><span style="pointer-events: none;">Month</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevron-down h-4 w-4 opacity-50" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg></button></div><div className="grid gap-2"><label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="year">Year</label><button type="button" role="combobox" aria-controls="radix-:r8e:" aria-expanded="false" aria-autocomplete="none" dir="ltr" data-state="closed" data-placeholder="" className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&amp;>span]:line-clamp-1" id="year" aria-label="Year"><span style="pointer-events: none;">Year</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevron-down h-4 w-4 opacity-50" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg></button></div><div className="grid gap-2"><label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="cvc">CVC</label><input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="cvc" placeholder="CVC"></div></div></div> */}
              </div>
            </div>
          )}
        </CardContent>
      </ScrollArea>
    </>
  );
}
