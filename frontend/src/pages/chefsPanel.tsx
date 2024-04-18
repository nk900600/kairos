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
import { ArrowLeft, ClockIcon, Ellipsis, Salad } from "lucide-react";

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

const orders = [1, 2, 3, 4];

export default function ChefsPanelComponent() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time: any) => {
    const seconds = `0${time % 60}`.slice(-2);
    const minutes = `0${Math.floor(time / 60)}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);

    if (getHours != "00") {
      return `${getHours}:${minutes}:${seconds}`;
    }
    return `${minutes}:${seconds}`;
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
        <h1 className="flex-1  whitespace-nowrap text-lg font-semibold tracking-tight ">
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
        <TabsList className="grid w-full mb-4 lg:w-2/3 grid-cols-3">
          <TabsTrigger value="incoming">Incoming</TabsTrigger>
          <TabsTrigger value="preparing">Preparing</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="incoming">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6  ">
            {orders.map((val) => {
              return (
                <Card key="1" className="w-full max-w-sm">
                  <CardHeader className="p-4 lg:p-6 md:p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center w-[50px]">
                        <ClockIcon className="h-5 w-5" />
                        <CardTitle className="text-sm">
                          {formatTime(seconds)}
                        </CardTitle>
                      </div>
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
                  <CardContent className=" p-4    gap-2 lg:p-6 md:p-6  pt-0  lg:pt-0  md:pt-0  ">
                    <div className="grid gap-2">
                      <div className="flex items-center gap-3">
                        <VegIcon />
                        <Checkbox id="terms1" />
                        <label htmlFor="terms1" className="w-full ">
                          <div className="grid gap-1 text-sm">
                            <div className="font-medium">
                              1 x Spaghetti Bolognese
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Due in 5 mins
                            </div>
                          </div>
                        </label>
                      </div>
                      <div className="flex items-center gap-3">
                        <VegIcon />

                        <Checkbox id="terms2" />
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
                  <CardFooter className=" p-4    gap-2 lg:p-6 md:p-6  pt-0  lg:pt-0  md:pt-0   flex justify-center">
                    <Button className="w-full">Start preparing</Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="preparing">
          <Card key="1" className="w-full max-w-sm">
            <CardHeader className="p-4 lg:p-6 md:p-6">
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center w-[50px]">
                  <ClockIcon className="h-5 w-5" />
                  <CardTitle className="text-sm">
                    {formatTime(seconds)}
                  </CardTitle>
                </div>
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
            <CardContent className=" p-4    gap-2 lg:p-6 md:p-6  pt-0  lg:pt-0  md:pt-0  ">
              <div className="grid gap-2">
                <div className="flex items-center gap-4 ">
                  <Checkbox id="terms1" />
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
                  <Checkbox id="terms2" />
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
            <CardFooter className=" p-4    gap-2 lg:p-6 md:p-6  pt-0  lg:pt-0  md:pt-0   flex justify-center">
              <Button className="w-full">Mark as Completed</Button>
            </CardFooter>
          </Card>
        </TabsContent>
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
      </Tabs>
    </>
  );
}
