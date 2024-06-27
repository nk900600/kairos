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
import { useDispatch, useSelector } from "react-redux";
import {
  createOrder,
  deleteAllCartItemFromTableSession,
  deleteItemToCart,
  updateItemToCart,
} from "../../redux/actions";
import { EmptyPlaceholder } from "../common/emptyPlaceholder";
import { RootState } from "@/src/redux/reducer";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const items = [1, 2, 3];

export function CurrentOrderContentComponent({
  cart,
  tableSessionId,
  onCloseClick,
}: any) {
  const [cartData, setCartData] = useState<any>(cart);
  const [totalAmount, setTotalAmount] = useState<any>(0);
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { myAccount }: any = useSelector(
    (state: { table: RootState }) => state.table
  );
  const navigate = useNavigate();
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
    try {
      if (cartItem.quantity == 1) {
        localCartData[index].quantity = 0;
        localCartData = localCartData.filter(
          (val: any) => val.id != cartItem.id
        );
        setCartData(localCartData);
        dispatch(deleteItemToCart(cartItem.id));
      } else {
        let payload = { quantity: cartItem.quantity - 1, id: cartItem.id };
        dispatch(updateItemToCart(payload)).unwrap();
        localCartData[index].quantity = cartItem.quantity - 1;
        setCartData(localCartData);
      }
    } catch (e) {}
  };

  const handleAddClick = (cartItem: any, index: any) => {
    let localCartData = JSON.parse(JSON.stringify(cartData));
    const payload = { quantity: cartItem.quantity + 1, id: cartItem.id };
    dispatch(updateItemToCart(payload)).unwrap();
    localCartData[index].quantity = cartItem.quantity + 1;
    setCartData(localCartData);
  };

  const handleSendToChef = async () => {
    if (!myAccount?.subscripition.isActive) {
      toast.error("Please have an active subscription to place an order");
      return;
    }
    setIsLoading(true);
    const payload = {
      tableSessionId: tableSessionId,
      status: "Confirmed",
      totalAmount: Math.round(totalAmount + totalAmount * 0.18),
      orderItems: cartData.map((item: any) => ({
        MenuItemId: item.MenuItem.id,
        quantity: item.quantity,
        amount: item.MenuItem.price,
        customizations: item.CartItemCustomizations.map(
          (val: any) => val.customizationChoiceId
        ),
      })),
    };
    try {
      await dispatch(createOrder(payload)).unwrap();
      await dispatch(
        deleteAllCartItemFromTableSession(tableSessionId)
      ).unwrap();
      navigate("/tables?mytables=true");
    } catch (e) {}
    setIsLoading(false);
    onCloseClick();
  };

  return (
    <>
      <ScrollArea className="h-full ">
        <SheetHeader className="mb-4">
          <SheetTitle className="flex items-center gap-3">
            {/* <PackageIcon className="h-7 w-7" /> */}
            <span className="sr-only">The shop busniess inc</span>
            <h1 className="font-semibold text-base">My Cart</h1>
          </SheetTitle>
          <Separator className="my-2" />
        </SheetHeader>

        {!!cartData.length ? (
          <>
            <CardContent className="grid gap-2.5 p-0 text-sm">
              <div className="flex flex-col gap-4">
                {cartData.map((item: any, index: number) => {
                  return (
                    <div className="flex items-start gap-4 items-center">
                      <div className="flex flex-col items-center ">
                        <VegIcon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">
                          {item.MenuItem.name}
                        </div>
                        <div className="text-xm text-gray-500 dark:text-gray-400">
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
                  );
                })}
                {/* TODO: Disocunt feature */}
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
                    <span className="text-muted-foreground">Tax - 18%</span>
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

                <Button
                  loading={isLoading}
                  onClick={handleSendToChef}
                  className="h-10 flex gap-3"
                >
                  Sent to Chef
                  <ArrowRight></ArrowRight>
                </Button>
              </div>
            </CardContent>
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
