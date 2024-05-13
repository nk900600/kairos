import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  Ellipsis,
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
import { fetchAllOrders, fetchTables } from "../redux/actions";
import { AppDispatch } from "../redux/store";
import { OrderStatuses } from "./chefsPanel";
import { EmptyPlaceholder } from "./common/emptyPlaceholder";
import { Badge } from "../components/ui/badge";

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
  const { alltables, allOrders, allEmployees } = useSelector(
    (state: { table: RootState }) => state.table
  );
  const [isOpen, setOpen] = useState<boolean | undefined>(undefined);
  const [alltablesCopy, setAlltablesCopy] = useState<any>(alltables);

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
        <h1 className="flex-1  whitespace-nowrap text-lg font-semibold tracking-tight ">
          All Orders
        </h1>
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

      <Tabs defaultValue="serve" className="w-full">
        <TabsList className="grid w-full mb-4 lg:w-2/3 grid-cols-4">
          <TabsTrigger value="confirm">Confirmed</TabsTrigger>
          <TabsTrigger value="serve">Serve</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="canceled">Canceled </TabsTrigger>
        </TabsList>

        <TabsContent value="confirm">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6  ">
            {allOrders
              .filter((val) => val.status == OrderStatuses.CONFIRMED)
              .map((val: any) => {
                return (
                  <>
                    <Card
                      key="1"
                      className="w-full  hover:bg-muted/50  cursor-pointer"
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
                      <CardFooter className=" block p-4 gap-2 lg:p-6 md:p-6  pt-0  lg:pt-0  md:pt-0  ">
                        <Separator className="my-4" />
                        <div className="flex justify-between items-center">
                          <p className="text-xs text-gray-500">
                            21 Nov 2023 at 5:46PM
                          </p>

                          <Button variant="ghost" className=" h-3 gap-2">
                            <span> $239</span>
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </>
                );
              })}
          </div>

          {!allOrders.filter((val) => val.status == OrderStatuses.CONFIRMED)
            .length && (
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
              .filter((val) => val.status == OrderStatuses.READY_FOR_PICKUP)
              .map((val: any) => {
                return (
                  <>
                    <Sheet {...sheetProps}>
                      <SheetTrigger asChild>
                        <Card
                          key="1"
                          className="w-full  hover:bg-muted/50  cursor-pointer"
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
                                21 Nov 2023 at 5:46PM
                              </p>

                              <Button variant="ghost" className=" h-3 gap-2">
                                <span> $239</span>
                                <ArrowRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardFooter>
                        </Card>
                      </SheetTrigger>
                      <SheetContent className="w-full" {...handlers}>
                        <SheetDemo></SheetDemo>
                      </SheetContent>
                    </Sheet>
                  </>
                );
              })}
          </div>

          {!allOrders.filter(
            (val) => val.status == OrderStatuses.READY_FOR_PICKUP
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
              .filter((val) => val.status == OrderStatuses.COMPLETED)
              .map((val: any) => {
                return (
                  <>
                    <Sheet {...sheetProps}>
                      <SheetTrigger asChild>
                        <Card
                          key="1"
                          className="w-full  hover:bg-muted/50  cursor-pointer"
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
                                21 Nov 2023 at 5:46PM
                              </p>

                              <Button variant="ghost" className=" h-3 gap-2">
                                <span> $239</span>
                                <ArrowRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardFooter>
                        </Card>
                      </SheetTrigger>
                      <SheetContent className="w-full" {...handlers}>
                        <SheetDemo></SheetDemo>
                      </SheetContent>
                    </Sheet>
                  </>
                );
              })}
          </div>
          {!allOrders.filter((val) => val.status == OrderStatuses.COMPLETED)
            .length && (
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
              .filter((val) => val.status == OrderStatuses.CANCELLED)
              .map((val: any) => {
                return (
                  <>
                    <Sheet {...sheetProps}>
                      <SheetTrigger asChild>
                        <Card
                          key="1"
                          className="w-full  hover:bg-muted/50  cursor-pointer"
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
                                21 Nov 2023 at 5:46PM
                              </p>

                              <Button variant="ghost" className=" h-3 gap-2">
                                <span> $239</span>
                                <ArrowRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardFooter>
                        </Card>
                      </SheetTrigger>
                      <SheetContent className="w-full" {...handlers}>
                        <SheetDemo></SheetDemo>
                      </SheetContent>
                    </Sheet>
                  </>
                );
              })}
          </div>

          {!allOrders.filter((val) => val.status == OrderStatuses.CANCELLED)
            .length && (
            <EmptyPlaceholder
              buttonText=""
              type="orders"
              title="No Orders Available"
              description="No active orders at the moment. New orders will appear here once placed"
            />
          )}
        </TabsContent>
      </Tabs>

      {/* <SheetDemo></SheetDemo> */}
    </>
  );
}

export function SheetDemo() {
  return (
    <>
      <SheetHeader className="mb-4">
        <SheetTitle>Order - Oe31b70H</SheetTitle>
        <SheetDescription>Date: November 23, 2023.</SheetDescription>
        <Separator className="my-2" />
      </SheetHeader>
      <CardContent className="p-0 mt-3 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">Order Details</div>
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Glimmer Lamps x <span>2</span>
              </span>
              <span>$250.00</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Aqua Filters x <span>1</span>
              </span>
              <span>$49.00</span>
            </li>
          </ul>
          <Separator className="my-2" />
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>$299.00</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>$5.00</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span>$25.00</span>
            </li>
            <li className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground">Total</span>
              <span>$329.00</span>
            </li>
          </ul>
        </div>

        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Handler Information</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Name</dt>
              <dd>Liam Johnson</dd>
            </div>

            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Employee Id</dt>
              <dd>
                <a href="tel:">890</a>
              </dd>
            </div>
          </dl>
        </div>
        <Separator className="my-4" />
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
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Payment Information</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-1 text-muted-foreground">
                <CreditCard className="h-4 w-4" />
                Visa
              </dt>
              <dd>**** **** **** 4532</dd>
            </div>
          </dl>
        </div>
      </CardContent>
    </>
  );
}

export function Component() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            Order Oe31b70H
            <Button
              size="icon"
              variant="outline"
              className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Copy className="h-3 w-3" />
              <span className="sr-only">Copy Order ID</span>
            </Button>
          </CardTitle>
          <CardDescription>Date: November 23, 2023</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <Truck className="h-3.5 w-3.5" />
            <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
              Track Order
            </span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline" className="h-8 w-8">
                <MoreVertical className="h-3.5 w-3.5" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Export</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Trash</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">Order Details</div>
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Glimmer Lamps x <span>2</span>
              </span>
              <span>$250.00</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Aqua Filters x <span>1</span>
              </span>
              <span>$49.00</span>
            </li>
          </ul>
          <Separator className="my-2" />
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>$299.00</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>$5.00</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span>$25.00</span>
            </li>
            <li className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground">Total</span>
              <span>$329.00</span>
            </li>
          </ul>
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-3">
            <div className="font-semibold">Shipping Information</div>
            <address className="grid gap-0.5 not-italic text-muted-foreground">
              <span>Liam Johnson</span>
              <span>1234 Main St.</span>
              <span>Anytown, CA 12345</span>
            </address>
          </div>
          <div className="grid auto-rows-max gap-3">
            <div className="font-semibold">Billing Information</div>
            <div className="text-muted-foreground">
              Same as shipping address
            </div>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Customer Information</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Customer</dt>
              <dd>Liam Johnson</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Email</dt>
              <dd>
                <a href="mailto:">liam@acme.com</a>
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Phone</dt>
              <dd>
                <a href="tel:">+1 234 567 890</a>
              </dd>
            </div>
          </dl>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Payment Information</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-1 text-muted-foreground">
                <CreditCard className="h-4 w-4" />
                Visa
              </dt>
              <dd>**** **** **** 4532</dd>
            </div>
          </dl>
        </div>
      </CardContent>
    </Card>
  );
}
