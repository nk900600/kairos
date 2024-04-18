import {
  Armchair,
  ArrowLeft,
  CirclePlus,
  ClockIcon,
  Ellipsis,
  ListFilter,
  Ratio,
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
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { DrawerDialogComponent } from "../common/drawerDialog";

import { useLocation } from "react-router-dom";
import { GoBackButton } from "./common/goBackButton";
import { BreadcrumbComponent } from "./common/breadCrumbs";

const Alltables = [
  {
    id: 4,
    tableName: "Table 1",
    capacity: 4,
    status: "Reserved",
    reservationName: "Nikhil Kumar",
    reservationTime: "2024-03-30T11:38:30.000Z",
    reservationPartySize: 4,
    imageUrl: null,
    firmId: 1,
    createdBy: 1,
    updatedBy: null,
    createdAt: "2024-03-31T11:04:06.000Z",
    updatedAt: "2024-04-04T04:06:17.000Z",
  },
  {
    id: 5,
    tableName: "Table 2",
    capacity: 2,
    status: "Available",
    reservationName: "",
    reservationTime: "",
    reservationPartySize: 0,
    imageUrl: null,
    firmId: 1,
    createdBy: 1,
    updatedBy: null,
    createdAt: "2024-04-01T11:00:00.000Z",
    updatedAt: "2024-04-04T04:08:17.000Z",
  },
  {
    id: 6,
    tableName: "Table 3",
    capacity: 6,
    status: "Occupied",
    reservationName: "Arjun Patel",
    reservationTime: "2024-03-31T19:45:30.000Z",
    reservationPartySize: 6,
    imageUrl: null,
    firmId: 1,
    createdBy: 2,
    updatedBy: null,
    createdAt: "2024-03-31T12:04:06.000Z",
    updatedAt: "2024-04-04T04:10:17.000Z",
  },
  {
    id: 7,
    tableName: "Table 4",
    capacity: 8,
    status: "Cleaning",
    reservationName: "",
    reservationTime: "",
    reservationPartySize: 0,
    imageUrl: null,
    firmId: 1,
    createdBy: 1,
    updatedBy: null,
    createdAt: "2024-04-01T13:04:06.000Z",
    updatedAt: "2024-04-04T04:12:17.000Z",
  },
  {
    id: 8,
    tableName: "Table 5",
    capacity: 4,
    status: "Maintenance",
    reservationName: "",
    reservationTime: "",
    reservationPartySize: 0,
    imageUrl: null,
    firmId: 1,
    createdBy: 3,
    updatedBy: null,
    createdAt: "2024-04-02T11:04:06.000Z",
    updatedAt: "2024-04-04T04:14:17.000Z",
  },
  {
    id: 9,
    tableName: "Table 6",
    capacity: 2,
    status: "Reserved",
    reservationName: "Anjali Rao",
    reservationTime: "2024-04-01T20:00:30.000Z",
    reservationPartySize: 2,
    imageUrl: null,
    firmId: 1,
    createdBy: 1,
    updatedBy: null,
    createdAt: "2024-04-03T11:04:06.000Z",
    updatedAt: "2024-04-04T04:16:17.000Z",
  },
  {
    id: 10,
    tableName: "Table 7",
    capacity: 4,
    status: "Available",
    reservationName: "",
    reservationTime: "",
    reservationPartySize: 0,
    imageUrl: null,
    firmId: 1,
    createdBy: 4,
    updatedBy: null,
    createdAt: "2024-04-04T11:04:06.000Z",
    updatedAt: "2024-04-04T04:18:17.000Z",
  },
];

const AllDesgination = [
  {
    id: 0,
    value: "Available",
    isChecked: true,
  },
  {
    id: 1,
    value: "Reserved",
    isChecked: false,
  },
  {
    id: 2,
    value: "Cleaning",
    isChecked: false,
  },
  {
    id: 3,
    value: "Maintaince",
    isChecked: false,
  },
];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function TableComponent() {
  let query = useQuery();

  const [tables] = useState(Alltables);
  const [tabValue, setTableValue] = useState("available");
  const handleClick = (e: any) => {
    console.log(e);
    setTableValue(e);
  };

  useEffect(() => {
    let mytables = query.get("mytables");
    if (mytables) setTableValue("occupied");
  }, []);

  const handleOnCheck = (e: any, data: any, i: number) => {};
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
        <h1 className="flex-1  whitespace-nowrap text-lg font-semibold tracking-tight ">
          All Tables
        </h1>

        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 h-8 ">
                <ListFilter className="h-4 w-4" />
                <span className="hidden sm:block">Filters</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Desigination</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {AllDesgination.map((data, i) => {
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

          <DrawerDialogComponent
            triggerButton={
              <Button variant="outline" className=" h-8  gap-2">
                <CirclePlus className="h-4 w-4" />
                <span className="hidden sm:block">Add Table</span>
              </Button>
            }
            title={"Add Table"}
            description={"New Table is added"}
          ></DrawerDialogComponent>
        </div>
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
            <span className="hidden sm:block">Occupied / Reserved</span>
            <span className="block sm:hidden">Occ / Res</span>
          </TabsTrigger>
          <TabsTrigger value="others">Others</TabsTrigger>
        </TabsList>
        <TabsContent value="available">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6  ">
            {tables
              .filter((table) => table.status == "Available")
              .map((table) => {
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
                        {/* <div className="flex-1">
                          <Badge> {table.status}</Badge>
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
                            <DropdownMenuContent className="w-56" align="end">
                              <DropdownMenuLabel>Mark as</DropdownMenuLabel>
                              <DropdownMenuSeparator />

                              {AllDesgination.map((data, i) => {
                                return (
                                  <DropdownMenuCheckboxItem
                                    checked={data.isChecked}
                                    onCheckedChange={(e) =>
                                      handleOnCheck(e, data, i)
                                    }
                                  >
                                    {data.value}
                                  </DropdownMenuCheckboxItem>
                                );
                              })}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardHeader>
                    <CardFooter className="flex justify-center   p-4  gap-2 lg:p-6 md:p-6  lg:pt-0  md:pt-0  pt-0">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full gap-2"
                      >
                        {/* <CirclePlus className="h-4 w-4" /> */}
                        <span>Create Order </span>
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
          </div>
        </TabsContent>
        <TabsContent value="occupied">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6  ">
            {tables
              .filter(
                (table) =>
                  table.status == "Occupied" || table.status == "Reserved"
              )
              .map((table) => {
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
                          <Badge variant={"secondary"}> {table.status}</Badge>
                        </div>
                        <div className="ml-auto">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="  h-8 w-8 "
                          >
                            <Ellipsis className="h-4 w-4" />
                            <span className="sr-only">Back</span>
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-col text-sm p-4    gap-2 lg:p-6 md:p-6  pt-0  lg:pt-0  md:pt-0   ">
                      <div className="flex items-center">
                        <UserIcon className="h-3 w-3 mr-1.5" />
                        <div className="text-sm">
                          <span className="text-muted-foreground text-xs">
                            Assigned to:
                          </span>{" "}
                          <span> John Smith</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="h-3 w-3 mr-1.5" />
                        <div className="text-sm">
                          <span className="text-muted-foreground text-xs">
                            Timer:
                          </span>
                          {"  "}
                          <span>20 mins 52 sec</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-center   p-4  gap-2 lg:p-6 md:p-6  lg:pt-0  md:pt-0  pt-0">
                      <Button variant="outline" size="sm" className="w-full">
                        Close tab
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full gap-2"
                      >
                        {/* <CirclePlus className="h-4 w-4" /> */}
                        <span className="">New Order </span>
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
          </div>
        </TabsContent>
        <TabsContent value="others">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6  ">
            {tables
              .filter(
                (table) =>
                  !["Occupied", "Available", "Reserved"].includes(table.status)
              )
              .map((table) => {
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
                          <Button
                            variant="ghost"
                            size="icon"
                            className="  h-8 w-8 "
                          >
                            <Ellipsis className="h-4 w-4" />
                            <span className="sr-only">Back</span>
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-col text-sm p-4    gap-2 lg:p-6 md:p-6  pt-0  lg:pt-0  md:pt-0   ">
                      <div className="flex items-center">
                        <ClockIcon className="h-3 w-3 mr-1.5" />
                        <div className="text-sm">
                          <span className="text-muted-foreground text-xs">
                            Timer:
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
