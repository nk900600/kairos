import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  ClockIcon,
  Copy,
  CreditCard,
  Ellipsis,
  EllipsisIcon,
  ListFilter,
  MoreVertical,
  Truck,
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
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { NavLink } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { ReactComponent as VegIcon } from "../VegIcon.svg";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { useSwipeable } from "react-swipeable";
import { useEffect, useState } from "react";
import { GoBackButton } from "./common/goBackButton";
import { BreadcrumbComponent } from "./common/breadCrumbs";
import { RootState } from "../redux/reducer";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrders,
  fetchTables,
  updateOrderStatus,
} from "../redux/actions";
import { AppDispatch } from "../redux/store";
import { OrderStatuses } from "./chefsPanel";
import { EmptyPlaceholder } from "./common/emptyPlaceholder";
import { Badge } from "../components/ui/badge";
import { LiveTimerMinSec } from "../hooks/liveTImer";
import { EditOrderComponent } from "./sidepanels/editorder";
import { currencyMap } from "./menus";
import { format, parseISO } from "date-fns";
import { DatePickerWithRange } from "./common/datePicker";
import axiosInstance from "../redux/axios";
import { Skeleton } from "../components/ui/skeleton";

const AllTables = [
  {
    id: -1,
    value: "Show all",
    isChecked: true,
  },
  {
    id: 0,
    value: "Table 1",
    isChecked: false,
  },
  {
    id: 1,
    value: "Table 2",
    isChecked: false,
  },
  {
    id: 2,
    value: "Table 3",
    isChecked: false,
  },
  {
    id: 3,
    value: "Table 4",
    isChecked: false,
  },
];

export default function OrdersComponent() {
  const {
    alltables,
    allOrders: orders,
    allEmployees,
  } = useSelector((state: { table: RootState }) => state.table);
  const [isOpen, setOpen] = useState<boolean | undefined>(undefined);
  const [alltablesCopy, setAlltablesCopy] = useState<any>(alltables);
  const [editOrderData, setEditOrderData] = useState<any>();
  const [loading, setLoading] = useState<any>();
  const [orderData, setOrderData] = useState<any>([]);
  const [allOrders, setAllOrders] = useState<any>([]);

  const dispatch: AppDispatch = useDispatch();
  let sheetProps: any = {
    open: isOpen,
    onOpenChange: (data: any) => {
      setOpen(data);
    },
  };
  const handlers = useSwipeable({
    onSwipedRight: (eventData: any) => {
      console.log(eventData);
      setOpen(false);
    },
  });

  useEffect(() => {
    let data = JSON.parse(JSON.stringify(alltables)).map((data: any) => ({
      ...data,
      checked: false,
    }));
    setAlltablesCopy([{ tableName: "Show all", checked: true }, ...data]);
  }, [alltables]);

  useEffect(() => {
    setAllOrders(orders);
  }, [orders]);

  const handleOnCheck = (isChecked: any, data: any, index: number): any => {
    if (index != 0) {
      alltablesCopy[0].checked = false;
    }
    if (index == 0) {
      alltablesCopy.forEach((data: any) => {
        data.checked = false;
      });
      alltablesCopy[0].checked = true;
      setAlltablesCopy(JSON.parse(JSON.stringify(alltablesCopy)));
      return;
    }

    alltablesCopy[index].checked = isChecked;
    setAlltablesCopy(JSON.parse(JSON.stringify(alltablesCopy)));
  };

  const handleMarkAsServed = (order: any) => {
    dispatch(
      updateOrderStatus({ status: OrderStatuses.COMPLETED, id: order.id })
    );
  };
  const handleEditOrder = (order: any) => {
    setEditOrderData(order);
    setOpen(true);
  };
  const handleCardClick = (order: any) => {
    setOrderData(order);
    setOpen(true);
  };

  const handleDateChnage = (from: any, to: any) => {
    setLoading(true);
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
        setAllOrders(res.data.allorders);
        setLoading(false);
      });
  };

  return (
    <>
      <BreadcrumbComponent
        list={[
          { link: "/", label: "Dashboard" },
          { link: "/orders", label: "All Orders" },
        ]}
      />
      <div className="flex items-center gap-4">
        <GoBackButton />
        <h1 className="flex-1  whitespace-nowrap text-lg sm:text-2xl  font-semibold tracking-tight ">
          All Orders
        </h1>
        <div className="flex gap-4 justify-start md:justify-end items-center">
          <DatePickerWithRange
            onDateChange={handleDateChnage}
            defaultEnd={0}
            className={"h-8 hidden sm:flex"}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 h-8 ">
              <ListFilter className="h-4 w-4" />
              <span className="hidden sm:block">Filters</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-46" align="end">
            <DropdownMenuLabel>All Tables</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {alltablesCopy.map((data: any, i: number) => {
              return (
                <DropdownMenuCheckboxItem
                  checked={data.checked}
                  onCheckedChange={(e) => handleOnCheck(e, data, i)}
                >
                  {data.tableName}
                </DropdownMenuCheckboxItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex gap-4  flex sm:hidden">
        <DatePickerWithRange
          onDateChange={handleDateChnage}
          defaultEnd={0}
          className={"h-8 "}
        />
      </div>

      <Tabs defaultValue="serve" className="w-full">
        <TabsList className="grid w-full mb-4 lg:w-2/3 grid-cols-3">
          {/* <TabsTrigger value="confirm">Confirmed</TabsTrigger> */}
          <TabsTrigger value="serve">
            Serve
            {!!allOrders?.filter(
              (val: any) => val.status == OrderStatuses.READY_FOR_PICKUP
            ).length
              ? "(" +
                allOrders?.filter(
                  (val: any) => val.status == OrderStatuses.READY_FOR_PICKUP
                ).length +
                ")"
              : ""}
          </TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="canceled">Canceled </TabsTrigger>
        </TabsList>

        {loading && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6  ">
              {[1, 1, 1, 1].map((val) => {
                return (
                  <div className="flex flex-col space-y-3">
                    <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {!loading && (
          <>
            <TabsContent value="confirm">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6  ">
                {allOrders
                  ?.filter((val: any) => val.status == OrderStatuses.CONFIRMED)
                  ?.map((val: any) => {
                    return (
                      <>
                        <Card key="1" className="w-full ">
                          <CardHeader className="p-4 lg:p-6 md:p-6">
                            <div className="flex items-start gap-4">
                              <div className="flex-1">
                                <CardTitle className="text-base">
                                  {
                                    alltables?.find(
                                      (table: any) =>
                                        table.id == val?.TableSession?.tableId
                                    )?.tableName
                                  }
                                </CardTitle>

                                <CardDescription className="text-xs">
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
                                </CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className=" p-4    gap-2 lg:p-6 md:p-6  pt-0  lg:pt-0  md:pt-0  pb-0  lg:pb-0  md:pb-0  ">
                            <div className="grid gap-2">
                              {val.orderItems.map((item: any) => {
                                return (
                                  <>
                                    <div className="flex items-center gap-3">
                                      <VegIcon />

                                      <label
                                        htmlFor={item.id}
                                        className="w-full "
                                      >
                                        <div className="grid gap-1 text-sm">
                                          <div className="font-medium">
                                            {item.quantity} x{" "}
                                            {item.MenuItem.name}
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
                          <CardFooter className=" block  p-4 gap-2 lg:p-6 md:p-6  pt-4 lg:pt-0  md:pt-0  ">
                            <Separator className="my-4" />
                            <Button
                              onClick={() => handleEditOrder(val)}
                              className="  w-full gap-2"
                            >
                              <span> Edit</span>
                            </Button>
                          </CardFooter>
                        </Card>
                      </>
                    );
                  })}
              </div>

              {!allOrders?.filter(
                (val: any) => val.status == OrderStatuses.CONFIRMED
              ).length && (
                <EmptyPlaceholder
                  buttonText=""
                  type="orders"
                  title="No Orders Available"
                  description="No active orders at the moment. New orders will appear here once placed"
                />
              )}
            </TabsContent>

            <TabsContent value="serve">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6  ">
                {allOrders
                  ?.filter(
                    (val: any) => val.status == OrderStatuses.READY_FOR_PICKUP
                  )
                  .map((val: any) => {
                    return (
                      <>
                        <Card key="1" className="w-full ">
                          <CardHeader className="p-4 lg:p-6 md:p-6">
                            <div className="flex items-start gap-4">
                              <div className="flex-1">
                                <CardTitle className="text-base">
                                  {
                                    alltables?.find(
                                      (table: any) =>
                                        table.id == val?.TableSession?.tableId
                                    )?.tableName
                                  }
                                </CardTitle>

                                <CardDescription className="text-xs">
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
                                </CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className=" p-4    gap-2 lg:p-6 md:p-6  pt-0  lg:pt-0  md:pt-0  pb-0  lg:pb-0  md:pb-0  ">
                            <div className="grid gap-2">
                              {val.orderItems.map((item: any) => {
                                return (
                                  <>
                                    <div className="flex items-center gap-3">
                                      <VegIcon />

                                      <label
                                        htmlFor={item.id}
                                        className="w-full "
                                      >
                                        <div className="grid gap-1 text-sm">
                                          <div className="font-medium">
                                            {item.quantity} x{" "}
                                            {item.MenuItem.name}
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
                          <CardFooter className=" block p-4 gap-2 lg:p-6 md:p-6  pt-0  lg:pt-0  md:pt-0  ">
                            <Separator className="my-4" />
                            <Button
                              onClick={() => handleMarkAsServed(val)}
                              className="  w-full gap-2"
                            >
                              <span> Mark as served</span>
                            </Button>
                          </CardFooter>
                        </Card>
                      </>
                    );
                  })}
              </div>

              {!allOrders?.filter(
                (val: any) => val.status == OrderStatuses.READY_FOR_PICKUP
              ).length && (
                <EmptyPlaceholder
                  buttonText=""
                  type="orders"
                  title="No Orders Available"
                  description="No active orders at the moment. New orders will appear here once placed"
                />
              )}
            </TabsContent>

            <TabsContent value="completed">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6  ">
                {allOrders
                  ?.filter((val: any) => val.status == OrderStatuses.COMPLETED)
                  .map((val: any) => {
                    return (
                      <>
                        <Card
                          key="1"
                          className="w-full  hover:bg-muted/50  cursor-pointer"
                          onClick={() => handleCardClick(val)}
                        >
                          <CardHeader className="p-4 lg:p-6 md:p-6">
                            <div className="flex items-start gap-4">
                              <div className="flex-1">
                                <CardTitle className="text-base">
                                  {
                                    alltables?.find(
                                      (table: any) =>
                                        table.id == val?.TableSession?.tableId
                                    )?.tableName
                                  }
                                </CardTitle>

                                <CardDescription className="text-xs">
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
                                </CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className=" p-4    gap-2 lg:p-6 md:p-6  pt-0  lg:pt-0  md:pt-0  pb-0  lg:pb-0  md:pb-0  ">
                            <div className="grid gap-2">
                              {val.orderItems.map((item: any) => {
                                return (
                                  <>
                                    <div className="flex items-center gap-3">
                                      <VegIcon />

                                      <label
                                        htmlFor={item.id}
                                        className="w-full "
                                      >
                                        <div className="grid gap-1 text-sm">
                                          <div className="font-medium">
                                            {item.quantity} x{" "}
                                            {item.MenuItem.name}
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
                          <CardFooter className=" block p-4 gap-2 lg:p-6 md:p-6  pt-0  lg:pt-0  md:pt-0  ">
                            <Separator className="my-4" />
                            <div className="flex justify-between items-center">
                              <p className="text-xs text-gray-500">
                                {format(
                                  parseISO(val.orderDate),
                                  "dd MMM yyyy 'at' h:mma"
                                )}
                              </p>

                              <Button variant="ghost" className=" h-3 gap-2">
                                <span>
                                  {" "}
                                  {currencyMap.get("INR")}
                                  {val.totalAmount}
                                </span>
                                <ArrowRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardFooter>
                        </Card>
                      </>
                    );
                  })}
              </div>
              {!allOrders?.filter(
                (val: any) => val.status == OrderStatuses.COMPLETED
              ).length && (
                <EmptyPlaceholder
                  buttonText=""
                  type="orders"
                  title="No Orders Available"
                  description="No active orders at the moment. New orders will appear here once placed"
                />
              )}
            </TabsContent>
            <TabsContent value="canceled">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6  ">
                {allOrders
                  ?.filter((val: any) => val.status == OrderStatuses.CANCELLED)
                  .map((val: any) => {
                    return (
                      <>
                        <Card
                          key="1"
                          className="w-full  hover:bg-muted/50  cursor-pointer"
                          onClick={() => handleCardClick(val)}
                        >
                          <CardHeader className="p-4 lg:p-6 md:p-6">
                            <div className="flex items-center gap-4">
                              <div className="flex-1">
                                <CardTitle className="text-base">
                                  {
                                    alltables?.find(
                                      (table: any) =>
                                        table.id == val?.TableSession?.tableId
                                    )?.tableName
                                  }
                                </CardTitle>

                                <CardDescription className="text-xs">
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
                                </CardDescription>
                              </div>

                              <Badge variant={"destructive"}>
                                {"Canceled"}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className=" p-4    gap-2 lg:p-6 md:p-6  pt-0  lg:pt-0  md:pt-0  pb-0  lg:pb-0  md:pb-0  ">
                            <div className="grid gap-2">
                              {val.orderItems.map((item: any) => {
                                return (
                                  <>
                                    <div className="flex items-center gap-3">
                                      <VegIcon />

                                      <label
                                        htmlFor={item.id}
                                        className="w-full "
                                      >
                                        <div className="grid gap-1 text-sm">
                                          <div className="font-medium">
                                            {item.quantity} x{" "}
                                            {item.MenuItem.name}
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
                          <CardFooter className=" block p-4 gap-2 lg:p-6 md:p-6  pt-0  lg:pt-0  md:pt-0  ">
                            <Separator className="my-4" />
                            <div className="flex justify-between items-center">
                              <p className="text-xs text-gray-500">
                                {format(
                                  parseISO(val.orderDate),
                                  "dd MMM yyyy 'at' h:mma"
                                )}
                              </p>

                              <Button variant="ghost" className=" h-3 gap-2">
                                <span>
                                  {currencyMap.get("INR")}
                                  {val.totalAmount}
                                </span>
                                <ArrowRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardFooter>
                        </Card>
                      </>
                    );
                  })}
              </div>

              {!allOrders.filter(
                (val: any) => val.status == OrderStatuses.CANCELLED
              ).length && (
                <EmptyPlaceholder
                  buttonText=""
                  type="orders"
                  title="No Orders Available"
                  description="No active orders at the moment. New orders will appear here once placed"
                />
              )}
            </TabsContent>
          </>
        )}
      </Tabs>

      <Sheet {...sheetProps}>
        <SheetTrigger asChild></SheetTrigger>
        <SheetContent className="w-full" {...handlers}>
          <ViewOrder order={orderData}></ViewOrder>
          {/* <EditOrderComponent order={editOrderData}></EditOrderComponent> */}
        </SheetContent>
      </Sheet>
    </>
  );
}

export function ViewOrder({ order }: any) {
  const [orderData, setOrderData] = useState<any>(order);
  const [totalAmount, setTotalAmount] = useState<any>(0);
  const { alltables, allOrders, allEmployees } = useSelector(
    (state: { table: RootState }) => state.table
  );

  useEffect(() => {
    setTotalAmount(
      orderData.orderItems.reduce((total: any, item: any) => {
        const itemTotal = item.quantity * item.MenuItem.price;
        const customizationTotal = item.CustomizationChoices.reduce(
          (sum: any, customization: any) => {
            return sum + customization.additionalPrice;
          },
          0
        );

        return total + itemTotal + customizationTotal * item.quantity; // Multiply customization cost by item quantity
      }, 0)
    );
  }, [order]);
  return (
    <>
      <SheetHeader className="mb-4 mt-4 ">
        <SheetTitle className="flex justify-between items-center">
          {
            alltables.find(
              (val: any) => val.id == orderData.TableSession.tableId
            )?.tableName
          }

          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"outline"} className="h-8">
                <EllipsisIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Export as</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>PDF</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Excel</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </SheetTitle>
        <SheetDescription>
          Order Id - {orderData.id}{" "}
          {orderData.status == OrderStatuses.CANCELLED && (
            <Badge variant={"destructive"}>{"Canceled"}</Badge>
          )}{" "}
          <div>{format(new Date(orderData.createdAt), "MMMM dd, yyyy")}</div>
        </SheetDescription>
        <Separator className="my-2" />
      </SheetHeader>

      <CardContent className="p-0 mt-3 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">Order Details</div>
          <ul className="grid gap-3">
            {orderData.orderItems.map((item: any) => {
              return (
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    {item.MenuItem.name} x <span>2</span>
                    <div className="text-muted-foreground text-xs">
                      {item.CustomizationChoices.map(
                        (data: any) => data.name
                      ).join(", ")}
                    </div>
                  </span>
                  <span>
                    {" "}
                    {currencyMap.get(item.MenuItem.currency)}{" "}
                    {(item.CustomizationChoices.map(
                      (choice: any) => choice.additionalPrice
                    ).reduce((acc: any, val: any) => acc + val, 0) +
                      item.MenuItem.price) *
                      item.quantity}
                  </span>
                </li>
              );
            })}
          </ul>
          <Separator className="my-2" />
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>
                {" "}
                {currencyMap.get("INR")} {totalAmount}{" "}
              </span>
            </li>

            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span>
                {currencyMap.get("INR")} {(totalAmount * 0.18).toFixed(2)}
              </span>
            </li>
            <li className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground">Total</span>
              <span>
                {" "}
                {currencyMap.get("INR")}{" "}
                {Math.round(totalAmount + totalAmount * 0.18)}{" "}
              </span>
            </li>
          </ul>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Handler Information</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Name</dt>
              <dd>
                {" "}
                {
                  allEmployees?.find(
                    (contact) => contact.id == orderData.createdBy
                  )?.firstName
                }{" "}
                {
                  allEmployees?.find(
                    (contact) => contact.id == orderData.createdBy
                  )?.lastName
                }
              </dd>
            </div>

            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Employee Id</dt>
              <dd>
                <a href="tel:">
                  {" "}
                  {
                    allEmployees?.find(
                      (contact) => contact.id == orderData.createdBy
                    ).id
                  }
                </a>
              </dd>
            </div>
          </dl>
        </div>
        {/* <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Customer Information</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Customer</dt>
              <dd>Liam Johnson</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Phone</dt>
              <dd>
                <a href="tel:">+1 234 567 890</a>
              </dd>
            </div>
          </dl>
        </div> */}

        {orderData.status != OrderStatuses.CANCELLED && (
          <>
            <Separator className="my-4" />
            <div className="grid gap-3">
              <div className="font-semibold">Payment Information</div>
              <dl className="grid gap-3">
                <div className="flex items-center justify-between">
                  <dt className="flex items-center gap-1 text-muted-foreground">
                    <CircleDollarSign className="h-4 w-4" />
                    Cash
                  </dt>
                  {/* <dd>**** **** **** 4532</dd> */}
                </div>
              </dl>
            </div>
          </>
        )}
        <Separator className="my-4" />
      </CardContent>
    </>
  );
}
