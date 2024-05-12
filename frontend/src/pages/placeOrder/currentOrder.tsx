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
import { useDispatch } from "react-redux";
import { deleteItemToCart, updateItemToCart } from "../../redux/actions";

const items = [1, 2, 3];

export function CurrentOrderContentComponent({ cart, tableSessionId }: any) {
  const [cartData, setCartData] = useState<any>(cart);
  const [totalAmount, setTotalAmount] = useState<any>(0);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    setTotalAmount(
      cartData.reduce((total: any, item: any) => {
        const itemTotal = item.quantity * item.MenuItem.price;
        const customizationTotal = item.CartItemCustomizations.reduce(
          (sum: any, customization: any) => {
            return sum + customization.CustomizationChoice.additionalPrice;
          },
          0
        );

        return total + itemTotal + customizationTotal * item.quantity; // Multiply customization cost by item quantity
      }, 0)
    );
  }, [cartData]);

  const handleMinusClick = (cartItem: any, index: any) => {
    let localCartData = JSON.parse(JSON.stringify(cartData));
    if (cartItem.quantity == 1) {
      localCartData[index].quantity = 0;
      localCartData = localCartData.filter((val: any) => val.id != cartItem.id);
      setCartData(localCartData);
      dispatch(deleteItemToCart(cartItem.id));
    } else {
      let payload = { quantity: cartItem.quantity - 1, id: cartItem.id };
      dispatch(updateItemToCart(payload)).unwrap();
      localCartData[index].quantity = cartItem.quantity - 1;
      setCartData(localCartData);
    }
  };

  const handleAddClick = (cartItem: any, index: any) => {
    let localCartData = JSON.parse(JSON.stringify(cartData));
    const payload = { quantity: cartItem.quantity + 1, id: cartItem.id };
    dispatch(updateItemToCart(payload)).unwrap();
    localCartData[index].quantity = cartItem.quantity + 1;
    setCartData(localCartData);
  };

  return (
    <>
      <ScrollArea className="h-full ">
        <SheetHeader className="mb-4">
          <SheetTitle className="flex items-center gap-3">
            {/* <VegIcon className="h-5 w-5" />
        Paneer masala */}
            {/* <div className="mr-4 -m-2.5"> */}
            <PackageIcon className="h-7 w-7" />
            <span className="sr-only">Acme Inc</span>
            {/* </div> */}
            <h1 className="font-semibold text-base">My Cart</h1>
          </SheetTitle>
          {/* <SheetDescription>Date: November 23, 2023.</SheetDescription> */}
          <Separator className="my-2" />
        </SheetHeader>
        <div className="flex flex-col gap-4">
          <div className="">
            <Card>
              {cartData.map((item: any, index: number) => {
                return (
                  <CardContent className="grid gap-2.5 p-4">
                    <div className="flex items-start gap-4 items-center">
                      <div className="flex flex-col items-center ">
                        <VegIcon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{item.MenuItem.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {item.CartItemCustomizations.map(
                            (data: any) => data.CustomizationChoice.name
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
                            {(item.CartItemCustomizations.map(
                              (choice: any) =>
                                choice.CustomizationChoice.additionalPrice
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
          </div>
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
                    {currencyMap.get("INR")} {(totalAmount * 0.18).toFixed(2)}
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
          <Button className="h-10 flex gap-3">
            Sent to Chef
            <ArrowRight></ArrowRight>
          </Button>
        </div>
      </ScrollArea>
    </>
  );
}
