import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
} from "../components/ui/form";
import { Checkbox } from "../components/ui/checkbox";
import {
  ArrowLeft,
  Check,
  ClockIcon,
  Ellipsis,
  Salad,
  Trash2Icon,
  TrashIcon,
} from "lucide-react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as VegIcon } from "../VegIcon.svg";
import { CommandSeparator } from "../components/ui/command";
import { Separator } from "../components/ui/separator";
import { GoBackButton } from "./common/goBackButton";
import { BreadcrumbComponent } from "./common/breadCrumbs";
import { RootState } from "../redux/reducer";
import { useDispatch, useSelector } from "react-redux";
import { LiveTimerMinSec } from "../hooks/liveTImer";
import { updateOrderItemStatus, updateOrderStatus } from "../redux/actions";
import { AppDispatch } from "../redux/store";
import { EmptyPlaceholder } from "./common/emptyPlaceholder";

const AllDesgination = [
  {
    id: 0,
    value: "Available",
    isChecked: true,
  },
];

export const OrderStatuses = Object.freeze({
  ADDED_TO_ORDER: "Added to Order",
  MODIFIED: "Modified",
  CONFIRMED: "Confirmed",
  PREPARING: "Preparing",
  READY_FOR_PICKUP: "Ready for Pickup",
  CANCELLED: "Cancelled",
  SERVED: "Served",
  COMPLETED: "Completed",
});

export default function ChefsPanelComponent() {
  useEffect(() => {}, []);

  const { allOrders, alltables, allEmployees } = useSelector(
    (state: { table: RootState }) => state.table
  );
  const dispatch: AppDispatch = useDispatch();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const handlePreparingClick = (order: any) => {
    dispatch(
      updateOrderStatus({ status: OrderStatuses.PREPARING, id: order.id })
    );
  };
  const handleFinishClick = (order: any) => {
    dispatch(
      updateOrderStatus({
        status: OrderStatuses.READY_FOR_PICKUP,
        id: order.id,
      })
    );
  };
  const handleItemClick = (check: any, order: any) => {
    dispatch(updateOrderItemStatus({ isCompleted: check, id: order.id }));
  };
  const handleCancelClick = (order: any) => {
    // dispatch(updateOrderItemStatus({ isCompleted: check, id: order.id }));
    setConfirmDelete(false);
    dispatch(
      updateOrderStatus({ status: OrderStatuses.CANCELLED, id: order.id })
    );
  };
  const handleConfirmDelete = (e: any) => {
    e.preventDefault();
    setConfirmDelete(true);
  };
  return (
    <>
      <BreadcrumbComponent
        list={[
          { link: "/", label: "Dashboard" },
          { link: "/chef-panel", label: "Chef's Panel" },
        ]}
      />

      <div className="flex items-center gap-4">
        <GoBackButton />
        <h1 className="flex-1  whitespace-nowrap text-lg sm:text-2xl  font-semibold tracking-tight ">
          Chef's Panel
        </h1>
        {/* {addButtonLabel && (
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
          </DrawerDialogComponent>
        )} */}
      </div>
      <Tabs defaultValue="incoming" className="w-full ">
        <TabsList className="grid w-full mb-4 lg:w-1/2 grid-cols-1">
          <TabsTrigger value="incoming">
            Incoming
            {!!allOrders.filter(
              (val: any) => val.status == OrderStatuses.CONFIRMED
            ).length
              ? " ( " +
                allOrders.filter(
                  (val: any) => val.status == OrderStatuses.CONFIRMED
                ).length +
                " )"
              : ""}
          </TabsTrigger>
          {/* <TabsTrigger value="preparing">Preparing</TabsTrigger> */}
        </TabsList>

        <TabsContent value="incoming">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6  ">
            {allOrders
              .filter(
                (val) =>
                  val.status == OrderStatuses.CONFIRMED ||
                  val.status == OrderStatuses.PREPARING
              )
              .map((val: any) => {
                return (
                  <Card key="1" className="w-full">
                    <CardHeader className="p-4 lg:p-6 md:p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex flex-col items-center w-[50px]">
                          <ClockIcon className="h-5 w-5" />
                          <CardTitle className="text-sm">
                            <LiveTimerMinSec initialDate={val.orderDate} />
                          </CardTitle>
                        </div>
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

                        <div className="ml-auto">
                          <DropdownMenu
                            onOpenChange={() => setConfirmDelete(false)}
                          >
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
                              {/* <DropdownMenuItem
                                onClick={() => handleFinishClick(val)}
                              >
                                <>
                                  <Check className="mr-2 h-4 w-4 " />
                                  <span> Finish</span>
                                </>
                              </DropdownMenuItem> */}
                              {/* <DropdownMenuSeparator /> */}
                              {!confirmDelete && (
                                <DropdownMenuItem
                                  onClick={(e) => handleConfirmDelete(e)}
                                >
                                  <>
                                    <Trash2Icon className="mr-2 h-4 w-4 text-destructive " />
                                    <span>Cancel</span>
                                  </>
                                </DropdownMenuItem>
                              )}
                              {confirmDelete && (
                                <DropdownMenuItem
                                  onClick={() => handleCancelClick(val)}
                                >
                                  <>
                                    <Trash2Icon className="mr-2 h-4 w-4 text-destructive " />
                                    <span>Confirm Cancel</span>
                                  </>
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className=" p-4    gap-2 lg:p-6 md:p-6  pt-0  lg:pt-0  md:pt-0  ">
                      <div className="grid gap-2">
                        {val.orderItems.map((item: any) => {
                          return (
                            <>
                              <div className="flex items-center gap-3">
                                <VegIcon />
                                {val.status == OrderStatuses.PREPARING && (
                                  <Checkbox
                                    onCheckedChange={(e) =>
                                      handleItemClick(e, item)
                                    }
                                    id={item.id}
                                    checked={item.isCompleted}
                                  />
                                )}
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

                    <CardFooter className=" p-4    gap-2 lg:p-6 md:p-6  pt-0  lg:pt-0  md:pt-0   flex justify-center">
                      {val.status == OrderStatuses.PREPARING ? (
                        <Button
                          className="w-full"
                          onClick={() => handleFinishClick(val)}
                          disabled={
                            val.orderItems.filter(
                              (inner: any) => !inner.isCompleted
                            ).length
                          }
                        >
                          Finish
                        </Button>
                      ) : (
                        <Button
                          className="w-full"
                          onClick={() => handlePreparingClick(val)}
                        >
                          Start preparing
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                );
              })}
          </div>
        </TabsContent>

        {/* <TabsContent value="preparing">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6  ">
            {allOrders
              .filter((val) => val.status == OrderStatuses.PREPARING)
              .map((val: any) => {
                return (
                  <Card key="1" className="w-full">
                    <CardHeader className="p-4 lg:p-6 md:p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex flex-col items-center w-[50px]">
                          <ClockIcon className="h-5 w-5" />
                          <CardTitle className="text-sm">
                            <LiveTimerMinSec initialDate={val.orderDate} />
                          </CardTitle>
                        </div>
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
                                  <DropdownMenuCheckboxItem>
                                    {data.value}
                                  </DropdownMenuCheckboxItem>
                                );
                              })}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className=" p-4    gap-2 lg:p-6 md:p-6  pt-0  lg:pt-0  md:pt-0  ">
                      <div className="grid gap-2">
                        {val.orderItems.map((item: any) => {
                          return (
                            <>
                              <div className="flex items-center gap-3">
                                <VegIcon />
                                <Checkbox id={item.id} />
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
                    <CardFooter className=" p-4    gap-2 lg:p-6 md:p-6  pt-0  lg:pt-0  md:pt-0   flex justify-center">
                      <Button className="w-full">Start preparing</Button>
                    </CardFooter>
                  </Card>
                );
              })}
          </div>
        </TabsContent> */}
        <TabsContent value="history">
          <Card key="1" className="w-full max-w-sm">
            <CardHeader className="p-4 lg:p-6 md:p-6">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <CardTitle className="text-base">Table - 5</CardTitle>

                  <CardDescription className="text-xs">
                    Order no - 123
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
                    <DropdownMenuContent className="w-56" align="end">
                      <DropdownMenuLabel>Mark as</DropdownMenuLabel>
                      <DropdownMenuSeparator />

                      {AllDesgination.map((data, i) => {
                        return (
                          <DropdownMenuCheckboxItem>
                            {data.value}
                          </DropdownMenuCheckboxItem>
                        );
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent className=" p-4    gap-2 lg:p-6 md:p-6  pt-0  lg:pt-0  md:pt-0  pb-0  lg:pb-0  md:pb-0  ">
              <div className="grid gap-2">
                <div className="flex items-center gap-4 ">
                  <label htmlFor="terms1" className="w-full ">
                    <div className="grid gap-1 text-sm">
                      <div className="font-medium">1 x Spaghetti Bolognese</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Due in 5 mins
                      </div>
                    </div>
                  </label>
                </div>
                <div className="flex items-center gap-4 ">
                  <label htmlFor="terms2" className="w-full ">
                    <div className="grid gap-1 text-sm">
                      <div className="font-medium">2 x Iced Tea</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Due in 3 mins
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </CardContent>
            <CardFooter className=" block p-4 gap-2 lg:p-6 md:p-6  pt-0  lg:pt-0  md:pt-0  ">
              <Separator className="my-4" />
              <p className="text-xs text-gray-500">21 Nov 2023 at 5:46PM</p>
            </CardFooter>
          </Card>
        </TabsContent>

        {!allOrders.filter(
          (val) =>
            val.status == OrderStatuses.CONFIRMED ||
            val.status == OrderStatuses.PREPARING
        ).length && (
          <EmptyPlaceholder
            buttonText=""
            type="chefs"
            title="No New Tickets Available"
            description="No new tickets at the moment. New tickets will appear here once placed"
          />
        )}
      </Tabs>
    </>
  );
}
