import {
  ArrowRight,
  MinusIcon,
  PackageIcon,
  PlusIcon,
  SquarePercent,
} from "lucide-react";

import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

import { ReactComponent as VegIcon } from "../../VegIcon.svg";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import { Separator } from "../../components/ui/separator";
import { ScrollArea } from "../../components/ui/scroll-area";
import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { currencyMap } from "../menus";
import { AppDispatch } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  createOrder,
  deleteAllCartItemFromTableSession,
  deleteItemToCart,
  updateItemToCart,
} from "../../redux/actions";
import { EmptyPlaceholder } from "../common/emptyPlaceholder";
import { RootState } from "../../redux/reducer";

export function EditOrderComponent({ order }: any) {
  const [orderData, setOrderData] = useState<any>(order);
  const [totalAmount, setTotalAmount] = useState<any>(0);
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
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
  }, [orderData]);

  const handleMinusClick = (orderItem: any, index: any) => {
    let orr = JSON.parse(JSON.stringify(orderData));
    orr.orderItems[index].quantity = orr.orderItems[index].quantity - 1;
    // orr = JSON.parse(JSON.stringify(orr));
    setOrderData(orr);
  };

  const handleAddClick = (orderItem: any, index: any) => {
    let orr = JSON.parse(JSON.stringify(orderData));
    orr.orderItems[index].quantity += 1;
    // orr = JSON.parse(JSON.stringify(orr));
    setOrderData(orr);
  };

  const handleUpdate = async () => {};

  return (
    <>
      <ScrollArea className="h-full ">
        <SheetHeader className="mb-4">
          <SheetTitle>
            {
              alltables.find((val) => val.id == orderData.TableSession.tableId)
                ?.tableName
            }
          </SheetTitle>
          <SheetDescription>
            {" "}
            {
              allEmployees?.find((contact) => contact.id == orderData.createdBy)
                ?.firstName
            }{" "}
            {
              allEmployees?.find((contact) => contact.id == orderData.createdBy)
                ?.lastName
            }
          </SheetDescription>
          <Separator className="my-2" />
        </SheetHeader>
        {!!orderData ? (
          <>
            <div className="flex flex-col gap-4">
              <Card>
                {orderData.orderItems.map((item: any, index: number) => {
                  return (
                    <CardContent className="grid gap-2.5 p-4">
                      <div className="flex items-start gap-4 items-center text-sm">
                        <div className="flex flex-col items-center ">
                          <VegIcon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold">
                            {item.MenuItem.name}
                          </div>
                          <div className="text-xs text-muted-foreground dark:text-gray-400">
                            {item.CustomizationChoices.map(
                              (data: any) => data.name
                            ).join(", ")}
                          </div>
                        </div>

                        <div className="flex-col items-center space-x-4">
                          <div className="rounded-lg border bg-card h-6 flex items-center gap-1">
                            <Button
                              onClick={() => handleMinusClick(item, index)}
                              variant="ghost"
                              size={"icon"}
                              className="h-6"
                            >
                              <MinusIcon className="h-4 w-4 -translate-x-0.5" />
                            </Button>

                            <span className="text-sm font-semibold ">
                              {item.quantity}
                            </span>

                            <Button
                              onClick={() => handleAddClick(item, index)}
                              variant="ghost"
                              size={"icon"}
                              className=" h-6 "
                            >
                              <PlusIcon className="h-4 w-4 -translate-x-0.5 " />
                            </Button>
                          </div>
                          <div className="ml-auto text-right">
                            <div className="font-medium text-sm mt-1">
                              {currencyMap.get(item.MenuItem.currency)}{" "}
                              {(item.CustomizationChoices.map(
                                (choice: any) => choice.additionalPrice
                              ).reduce((acc: any, val: any) => acc + val, 0) +
                                item.MenuItem.price) *
                                item.quantity}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  );
                })}
              </Card>
              {/* TODO: Disocunt feature */}
              {/* <div className="space-y-4">
              <Card>
                <CardContent className="grid gap-1 text-sm p-4">
                  <div className="flex items-center">
                    <div className="flex gap-2">
                      <SquarePercent />
                      Discount
                    </div>
                    <div className="ml-auto">
                      <Select>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Fruits</SelectLabel>
                            <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="banana">Banana</SelectItem>
                            <SelectItem value="blueberry">Blueberry</SelectItem>
                            <SelectItem value="grapes">Grapes</SelectItem>
                            <SelectItem value="pineapple">Pineapple</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
  
                    <div className="ml-auto">$60.00</div>
                  </div>
                </CardContent>
              </Card>
            </div> */}
              <div className="space-y-4">
                <Card>
                  <CardContent className="grid gap-1 text-sm p-4">
                    <div className="flex items-center">
                      <div>Subtotal</div>
                      <div className="ml-auto">
                        {" "}
                        {currencyMap.get("INR")} {totalAmount}{" "}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div>GST 18%</div>
                      <div className="ml-auto">
                        {" "}
                        {currencyMap.get("INR")}{" "}
                        {(totalAmount * 0.18).toFixed(2)}
                      </div>
                    </div>
                    {/* <div className="flex items-center">
                    <div>Discount</div>
                    <div className="ml-auto">-$6.00</div>
                  </div> */}
                    <Separator className="border-color-gray-200" />
                    <div className="flex items-center font-medium">
                      <div>Total</div>
                      <div className="ml-auto">
                        {currencyMap.get("INR")}{" "}
                        {Math.round(totalAmount + totalAmount * 0.18)}{" "}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <Button
                loading={isLoading}
                onClick={handleUpdate}
                className="h-10 flex gap-3"
              >
                Save
              </Button>
            </div>
          </>
        ) : (
          <EmptyPlaceholder
            title="Cart is Currently Empty"
            description="Your cart looks a little empty! Browse our categories to add items to your cart."
            type="currentOrder"
            buttonText=""
          ></EmptyPlaceholder>
        )}
      </ScrollArea>
    </>
  );
}
