import {
  ArrowRight,
  MinusIcon,
  PackageIcon,
  PlusIcon,
  SquarePercent,
} from "lucide-react";

import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

import { ReactComponent as VegIcon } from "../VegIcon.svg";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import { Separator } from "../components/ui/separator";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const items = [1, 2, 3, 4];
export const CurrentOrder = ({ count = 0, menu }: any) => {
  const [isOpen, setOpen] = useState<boolean | undefined>(undefined);
  let sheetProps: any = {
    open: isOpen,
    onOpenChange: (data: any) => {
      setOpen(data);
    },
  };
  const handlers = useSwipeable({
    onSwipedRight: (eventData: any) => {
      setOpen(false);
    },
  });

  return (
    <div className="flex items-center space-x-4">
      <div className="rounded-lg border bg-card h-8 flex items-center gap-1">
        {count !== 0 && (
          <Button variant="ghost" size={"icon"} className="h-8">
            <MinusIcon className="h-4 w-4 -translate-x-0.5" />
          </Button>
        )}

        {!count ? (
          <span className={`text-sm font-semibold pl-4`}>Add</span>
        ) : (
          <span className="text-sm font-semibold">{count}</span>
        )}

        <Sheet {...sheetProps}>
          <SheetTrigger asChild>
            <Button variant="ghost" size={"icon"} className=" h-8 ">
              <PlusIcon className="h-4 w-4 -translate-x-0.5 " />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full" {...handlers}>
            {/* <header className="flex items-center h-14 border-b px-4">
                <div className="mr-4 -m-2.5">
                  <PackageIcon className="h-7 w-7" />
                  <span className="sr-only">Acme Inc</span>
                </div>
                <h1 className="font-semibold text-base">My Cart</h1>
                <Button className="ml-auto h-8" size="sm" variant="outline">
                  Continue shopping
                </Button>
              </header> */}

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
                  {items.map((item) => {
                    return (
                      <CardContent className="grid gap-2.5 p-4">
                        <div className="flex items-start gap-4 items-center">
                          <div className="flex flex-col items-center ">
                            <VegIcon className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">Paneer masala</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              #123456
                            </div>
                          </div>

                          <div className="flex-col items-center space-x-4">
                            <div className="rounded-lg border bg-card h-6 flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size={"icon"}
                                className="h-6"
                              >
                                <MinusIcon className="h-4 w-4 -translate-x-0.5" />
                              </Button>

                              <span className="text-sm font-semibold ">3</span>

                              <Button
                                variant="ghost"
                                size={"icon"}
                                className=" h-6 "
                              >
                                <PlusIcon className="h-4 w-4 -translate-x-0.5 " />
                              </Button>
                            </div>
                            <div className="ml-auto text-right">
                              <div className="font-medium text-sm mt-1">
                                $60.00
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* <div className="flex items-start gap-4">
                        <VegIcon className="h-5 w-5" />
                        <div className="flex-1">
                          <div className="font-medium">Paneer masala</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            #123456
                          </div>
                          <div className="flex items-center gap-4 my-2">
                            <div className="flex items-center space-x-4">
                              <div className="rounded-lg border bg-card h-8 flex items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size={"icon"}
                                  className="h-8"
                                >
                                  <MinusIcon className="h-4 w-4 -translate-x-0.5" />
                                </Button>
  
                                <span className="text-sm font-semibold ">3</span>
  
                                <Button
                                  variant="ghost"
                                  size={"icon"}
                                  className=" h-8 "
                                >
                                  <PlusIcon className="h-4 w-4 -translate-x-0.5 " />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="ml-auto text-right">
                          <div className="font-medium">$60.00</div>
                        </div>
                      </div> */}
                        {/* <Separator /> */}
                      </CardContent>
                    );
                  })}
                </Card>
              </div>
              <div className="space-y-4">
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
                              <SelectItem value="blueberry">
                                Blueberry
                              </SelectItem>
                              <SelectItem value="grapes">Grapes</SelectItem>
                              <SelectItem value="pineapple">
                                Pineapple
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* <div className="ml-auto">$60.00</div> */}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-4">
                <Card>
                  <CardContent className="grid gap-1 text-sm p-4">
                    <div className="flex items-center">
                      <div>Subtotal</div>
                      <div className="ml-auto">$60.00</div>
                    </div>
                    <div className="flex items-center">
                      <div>Tax</div>
                      <div className="ml-auto">$6.00</div>
                    </div>
                    <div className="flex items-center">
                      <div>Discount</div>
                      <div className="ml-auto">-$6.00</div>
                    </div>
                    <Separator className="border-color-gray-200" />
                    <div className="flex items-center font-medium">
                      <div>Total</div>
                      <div className="ml-auto">$60.00</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <Button className="h-10 flex gap-3">
                Sent to Chef
                <ArrowRight></ArrowRight>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
