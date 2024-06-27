import {
  CalendarClock,
  CreditCard,
  DollarSign,
  Plus,
  ShoppingBag,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { DatePickerWithRange } from "./common/datePicker";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import SalesChart from "./common/chart";
import PieChartComponent from "./common/pieChart";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducer";
import { useEffect, useState } from "react";
import axiosInstance from "../redux/axios";
import { OrderStatuses } from "./chefsPanel";
import { EmptyPlaceholder } from "./common/emptyPlaceholder";
import { NavLink, useNavigate } from "react-router-dom";
import { LineChartComponent } from "./common/lineChart";
import { format } from "date-fns";
import { SelectionBoxComponent } from "./common/selectionBox";

export function DashBoardContent() {
  const { allEmployees, myAccount, isAdmin, allOrders, alltables } =
    useSelector((state: { table: RootState }) => state.table);

  const [employee, setEmployee] = useState<any>(null);
  const [orders, setOrders] = useState<any>(null);
  const [leaves, setLeaves] = useState<any>(null);
  const [lineData, setLineData] = useState<any>(null);
  const [table, setTableData] = useState<any>([]);
  const [order, setOrderData] = useState<any>([]);
  const [currentOverview, setCurrentOverview] = useState<any>({
    name: "Orders",
    id: "orders",
  });

  const navigate = useNavigate();

  const handleDateChnage = (from: any, to: any) => {
    // get employee Data
    axiosInstance.get("employees/get-employee").then((res) => {
      if (!res.data?.percentage?.includes("-")) {
        res.data.percentage = `+${res.data.percentage}`;
      }
      setEmployee(res.data);
    });
    axiosInstance
      .get("orders/get-orders", {
        params: {
          startDate: from,
          endDate: to,
        },
      })
      .then((res) => {
        if (!res.data?.percentage?.includes("-")) {
          res.data.percentage = `+${res.data.percentage}`;
        }
        setOrders(res.data);
      });
    axiosInstance.get("leaves/get-leaves").then((res) => {
      if (!res.data?.percentage?.includes("-")) {
        res.data.percentage = `+${res.data.percentage}`;
      }
      setLeaves(res.data);
    });
    axiosInstance
      .get("/tables-session/average-data", {
        params: {
          startDate: from,
          endDate: to,
        },
      })
      .then((res) => {
        res.data.dailyWaitTimeMetrics = res.data.dailyWaitTimeMetrics.map(
          (val: any) => {
            return {
              name: format(val.date, `do MMMM`),
              daily: val.waitTimePerDay.toFixed(2),
              average: val.averageWaitTime.toFixed(2),
              amt: val.waitTimePerDay.toFixed(2),
              dailylable: "Daily Wait per table",
              averagelable: "Average Wait per table",
              type: "table",
            };
          }
        );
        setTableData(res.data.dailyWaitTimeMetrics);
      });
    axiosInstance
      .get("orders/service-time", {
        params: {
          startDate: from,
          endDate: to,
        },
      })
      .then((res) => {
        res.data.dailyServiceTimeMetrics = res.data.dailyServiceTimeMetrics.map(
          (val: any) => {
            return {
              name: format(val.date, `do MMMM`),
              daily: val.ordersPerDay.toFixed(2),
              average: val.averageServiceTime.toFixed(2),
              amt: val.ordersPerDay.toFixed(2),
              dailylable: "Daily Orders",
              averagelable: "Average Orders",
              type: "order",
            };
          }
        );
        setLineData(res.data.dailyServiceTimeMetrics);
        setOrderData(res.data.dailyServiceTimeMetrics);
        setCurrentOverview({
          name: "Orders",
          id: "orders",
        });
      });
  };

  const handleOnChange = (type: any) => {
    if (type.id == "table") {
      setLineData(table);
    } else setLineData(order);
  };

  const handleViweAll = () => {
    navigate("/orders");
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-2 lg:gap-6 lg:p-6">
      <div className="flex items-center gap-4">
        <h1 className="flex flex-1  whitespace-nowrap text-2xl font-semibold tracking-tight ">
          Welcome back,
          <span className="font-bold ml-2 underline underline-offset-4">
            {myAccount?.employee?.firstName}
          </span>
        </h1>
        <NavLink to={"/place-order"}>
          <Button variant={"default"} className="ml-auto h-8 gap-2 flex ">
            <Plus className="h-4 w-4" />
            <span>New Order</span>
          </Button>
        </NavLink>
      </div>
      <div className="flex gap-4 justify-start md:justify-end items-center">
        <DatePickerWithRange onDateChange={handleDateChnage} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {orders?.allorders.reduce(
                (acc: any, val: any) => acc + val.totalAmount,
                0
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {orders?.amountPercentage}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {orders?.allorders?.length}
            </div>
            <p className="text-xs text-muted-foreground">
              {orders?.percentage}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Employees
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{employee?.count}</div>
            <p className="text-xs text-muted-foreground">
              {employee?.percentage}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Leaves
            </CardTitle>
            <CalendarClock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leaves?.allLeaves}</div>
            <p className="text-xs text-muted-foreground">
              {leaves?.percentage}% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-1 sm:col-span-4">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-xl font-semibold leading-none tracking-tight ">
              Overview of
              <SelectionBoxComponent
                current={currentOverview}
                onSelection={handleOnChange}
              ></SelectionBoxComponent>
            </h3>
          </div>
          <CardContent className="grid gap-8">
            {/* <SalesChart /> */}
            {/* {lineData?.filter((val: any) => val.average !== "0.00")?.length >
            0 ? ( */}
            <LineChartComponent data={lineData}></LineChartComponent>
            {/* ) : (
              <EmptyPlaceholder
                type="dashboard_chart"
                title="No Data Available"
                description="There is currently no data to display on this graph"
                buttonText=""
                className="md:p-0"
              ></EmptyPlaceholder>
            )} */}
          </CardContent>
        </Card>
        <Card className=" col-span-1 sm:col-span-3">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="flex justify-between align-center">
              <h3 className=" text-xl font-semibold leading-none tracking-tight">
                Active Orders
              </h3>
              {/* <Button
                onClick={handleViweAll}
                className="p-0 h-0"
                variant={"link"}
              >
                View All
              </Button> */}
            </div>
            <p className="text-sm text-muted-foreground">
              You have{" "}
              {
                allOrders.filter(
                  (val) =>
                    ![
                      OrderStatuses.CANCELLED,
                      OrderStatuses.COMPLETED,
                    ].includes(val.status)
                ).length
              }{" "}
              Active orders
            </p>
          </div>
          <CardContent className="grid gap-8">
            {allOrders
              .filter(
                (val) =>
                  ![OrderStatuses.CANCELLED, OrderStatuses.COMPLETED].includes(
                    val.status
                  )
              )
              .filter((val, index) => index < 6)
              .map((val) => {
                return (
                  <div className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                      <AvatarImage
                        alt="User avatar"
                        src={
                          allEmployees?.find(
                            (contact) => contact.id == val.createdBy
                          )?.userPic
                        }
                      />
                      <AvatarFallback
                        className="uppercase"
                        style={{
                          background: allEmployees?.find(
                            (contact) => contact.id == val.createdBy
                          )?.userPic,
                        }}
                      ></AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">
                        {
                          alltables?.find(
                            (table: any) =>
                              table.id == val?.TableSession?.tableId
                          )?.tableName
                        }
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {" "}
                        {
                          allEmployees?.find(
                            (contact) => contact.id == val.createdBy
                          )?.firstName
                        }{" "}
                        {
                          allEmployees?.find(
                            (contact) => contact.id == val.createdBy
                          )?.lastName
                        }
                      </p>
                    </div>
                    <div className="ml-auto font-medium">
                      {" "}
                      <Badge variant={"secondary"}> {val.status}</Badge>
                    </div>
                  </div>
                );
              })}

            {!allOrders.filter(
              (val) =>
                ![OrderStatuses.CANCELLED, OrderStatuses.COMPLETED].includes(
                  val.status
                )
            ).length && (
              <EmptyPlaceholder
                buttonText=""
                type="orders"
                title="No Active Orders Available"
                description=""
              />
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
