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

const allOrders = [
  {
    id: 8,
    totalAmount: 26,
    currency: "INR",
    orderDate: "2024-04-01T16:27:53.000Z",
    status: "Added to Order",
    isPriority: false,
    orderType: "dine-in",
    customerNotes: null,
    promoCodeApplied: null,
    discountAmount: 0,
    firmId: 1,
    createdBy: 1,
    updatedBy: null,
    createdAt: "2024-04-01T16:27:53.000Z",
    updatedAt: "2024-04-01T16:27:53.000Z",
    tableSessionId: 3,
    orderItems: [
      {
        id: 4,
        quantity: 1,
        amount: 6,
        currency: "INR",
        specialInstructions: null,
        isCompleted: false,
        createdAt: "2024-04-01T17:02:43.000Z",
        updatedAt: "2024-04-01T17:02:43.000Z",
        OrderId: 8,
        MenuItemId: 22,
        CustomizationChoices: [
          {
            id: 54,
            name: "Roasted Garlic",
            description: "Roasted Garlic",
            additionalPrice: 10,
            currency: "INR",
            dietType: "Vegetarian",
            createdAt: "2024-03-30T17:08:30.000Z",
            updatedAt: "2024-03-30T17:08:30.000Z",
            CustomizationId: 32,
            OrderItemCustomizationsChoices: {
              createdAt: "2024-04-01T17:02:43.000Z",
              updatedAt: "2024-04-01T17:02:43.000Z",
              OrderItemId: 4,
              CustomizationChoiceId: 54,
            },
          },
        ],
      },
      {
        id: 3,
        quantity: 20,
        amount: 10,
        currency: "INR",
        specialInstructions: null,
        isCompleted: false,
        createdAt: "2024-04-01T17:02:43.000Z",
        updatedAt: "2024-04-01T17:02:43.000Z",
        OrderId: 8,
        MenuItemId: 20,
        CustomizationChoices: [
          {
            id: 53,
            name: "Multigrain Honey Oats",
            description: "Multigrain Honey Oats",
            additionalPrice: 10,
            currency: "INR",
            dietType: "Vegetarian",
            createdAt: "2024-03-30T17:08:30.000Z",
            updatedAt: "2024-03-30T17:08:30.000Z",
            CustomizationId: 32,
            OrderItemCustomizationsChoices: {
              createdAt: "2024-04-01T17:02:43.000Z",
              updatedAt: "2024-04-01T17:02:43.000Z",
              OrderItemId: 3,
              CustomizationChoiceId: 53,
            },
          },
          {
            id: 54,
            name: "Roasted Garlic",
            description: "Roasted Garlic",
            additionalPrice: 10,
            currency: "INR",
            dietType: "Vegetarian",
            createdAt: "2024-03-30T17:08:30.000Z",
            updatedAt: "2024-03-30T17:08:30.000Z",
            CustomizationId: 32,
            OrderItemCustomizationsChoices: {
              createdAt: "2024-04-01T17:02:43.000Z",
              updatedAt: "2024-04-01T17:02:43.000Z",
              OrderItemId: 3,
              CustomizationChoiceId: 54,
            },
          },
        ],
      },
    ],
    TableSession: {
      id: 3,
      startTime: "2024-03-30T11:38:30.000Z",
      endTime: null,
      totalAmount: null,
      customerName:
        "Enjoy your favourite Grills sandwich with a choice of drink and a cookie or veg kebabs.",
      customerMobile: 1223123113,
      orderCount: 0,
      partySize: null,
      paymentStatus: "pending",
      paymentMethod: "Cash",
      specialRequests: null,
      serviceNotes: null,
      status: "Active",
      feedback: null,
      foodRating: null,
      serviceRating: null,
      overallRating: null,
      firmId: 1,
      createdBy: null,
      updatedBy: null,
      createdAt: "2024-03-31T11:16:16.000Z",
      updatedAt: "2024-03-31T11:16:16.000Z",
      tableId: 4,
      table: {
        id: 4,
        tableName: "Table 1",
        capacity: 4,
        status: "Reserved",
        reservationName: "Nikhil Kuamr",
        reservationTime: "2024-03-30T11:38:30.000Z",
        reservationPartySize: null,
        imageUrl: null,
        firmId: 1,
        createdBy: 1,
        updatedBy: null,
        createdAt: "2024-03-31T11:04:06.000Z",
        updatedAt: "2024-04-04T04:06:17.000Z",
      },
    },
  },
  {
    id: 8,
    totalAmount: 26,
    currency: "INR",
    orderDate: "2024-04-01T16:27:53.000Z",
    status: "Completed",
    isPriority: false,
    orderType: "dine-in",
    customerNotes: null,
    promoCodeApplied: null,
    discountAmount: 0,
    firmId: 1,
    createdBy: 1,
    updatedBy: null,
    createdAt: "2024-04-01T16:27:53.000Z",
    updatedAt: "2024-04-01T16:27:53.000Z",
    tableSessionId: 3,
    orderItems: [
      {
        id: 4,
        quantity: 1,
        amount: 6,
        currency: "INR",
        specialInstructions: null,
        isCompleted: false,
        createdAt: "2024-04-01T17:02:43.000Z",
        updatedAt: "2024-04-01T17:02:43.000Z",
        OrderId: 8,
        MenuItemId: 22,
        CustomizationChoices: [
          {
            id: 54,
            name: "Roasted Garlic",
            description: "Roasted Garlic",
            additionalPrice: 10,
            currency: "INR",
            dietType: "Vegetarian",
            createdAt: "2024-03-30T17:08:30.000Z",
            updatedAt: "2024-03-30T17:08:30.000Z",
            CustomizationId: 32,
            OrderItemCustomizationsChoices: {
              createdAt: "2024-04-01T17:02:43.000Z",
              updatedAt: "2024-04-01T17:02:43.000Z",
              OrderItemId: 4,
              CustomizationChoiceId: 54,
            },
          },
        ],
      },
      {
        id: 3,
        quantity: 20,
        amount: 10,
        currency: "INR",
        specialInstructions: null,
        isCompleted: false,
        createdAt: "2024-04-01T17:02:43.000Z",
        updatedAt: "2024-04-01T17:02:43.000Z",
        OrderId: 8,
        MenuItemId: 20,
        CustomizationChoices: [
          {
            id: 53,
            name: "Multigrain Honey Oats",
            description: "Multigrain Honey Oats",
            additionalPrice: 10,
            currency: "INR",
            dietType: "Vegetarian",
            createdAt: "2024-03-30T17:08:30.000Z",
            updatedAt: "2024-03-30T17:08:30.000Z",
            CustomizationId: 32,
            OrderItemCustomizationsChoices: {
              createdAt: "2024-04-01T17:02:43.000Z",
              updatedAt: "2024-04-01T17:02:43.000Z",
              OrderItemId: 3,
              CustomizationChoiceId: 53,
            },
          },
          {
            id: 54,
            name: "Roasted Garlic",
            description: "Roasted Garlic",
            additionalPrice: 10,
            currency: "INR",
            dietType: "Vegetarian",
            createdAt: "2024-03-30T17:08:30.000Z",
            updatedAt: "2024-03-30T17:08:30.000Z",
            CustomizationId: 32,
            OrderItemCustomizationsChoices: {
              createdAt: "2024-04-01T17:02:43.000Z",
              updatedAt: "2024-04-01T17:02:43.000Z",
              OrderItemId: 3,
              CustomizationChoiceId: 54,
            },
          },
        ],
      },
    ],
    TableSession: {
      id: 3,
      startTime: "2024-03-30T11:38:30.000Z",
      endTime: null,
      totalAmount: null,
      customerName:
        "Enjoy your favourite Grills sandwich with a choice of drink and a cookie or veg kebabs.",
      customerMobile: 1223123113,
      orderCount: 0,
      partySize: null,
      paymentStatus: "pending",
      paymentMethod: "Cash",
      specialRequests: null,
      serviceNotes: null,
      status: "Active",
      feedback: null,
      foodRating: null,
      serviceRating: null,
      overallRating: null,
      firmId: 1,
      createdBy: null,
      updatedBy: null,
      createdAt: "2024-03-31T11:16:16.000Z",
      updatedAt: "2024-03-31T11:16:16.000Z",
      tableId: 4,
      table: {
        id: 4,
        tableName: "Table 1",
        capacity: 4,
        status: "Reserved",
        reservationName: "Nikhil Kuamr",
        reservationTime: "2024-03-30T11:38:30.000Z",
        reservationPartySize: null,
        imageUrl: null,
        firmId: 1,
        createdBy: 1,
        updatedBy: null,
        createdAt: "2024-03-31T11:04:06.000Z",
        updatedAt: "2024-04-04T04:06:17.000Z",
      },
    },
  },
  {
    id: 8,
    totalAmount: 26,
    currency: "INR",
    orderDate: "2024-04-01T16:27:53.000Z",
    status: "Preparing",
    isPriority: false,
    orderType: "dine-in",
    customerNotes: null,
    promoCodeApplied: null,
    discountAmount: 0,
    firmId: 1,
    createdBy: 1,
    updatedBy: null,
    createdAt: "2024-04-01T16:27:53.000Z",
    updatedAt: "2024-04-01T16:27:53.000Z",
    tableSessionId: 3,
    orderItems: [
      {
        id: 4,
        quantity: 1,
        amount: 6,
        currency: "INR",
        specialInstructions: null,
        isCompleted: false,
        createdAt: "2024-04-01T17:02:43.000Z",
        updatedAt: "2024-04-01T17:02:43.000Z",
        OrderId: 8,
        MenuItemId: 22,
        CustomizationChoices: [
          {
            id: 54,
            name: "Roasted Garlic",
            description: "Roasted Garlic",
            additionalPrice: 10,
            currency: "INR",
            dietType: "Vegetarian",
            createdAt: "2024-03-30T17:08:30.000Z",
            updatedAt: "2024-03-30T17:08:30.000Z",
            CustomizationId: 32,
            OrderItemCustomizationsChoices: {
              createdAt: "2024-04-01T17:02:43.000Z",
              updatedAt: "2024-04-01T17:02:43.000Z",
              OrderItemId: 4,
              CustomizationChoiceId: 54,
            },
          },
        ],
      },
      {
        id: 3,
        quantity: 20,
        amount: 10,
        currency: "INR",
        specialInstructions: null,
        isCompleted: false,
        createdAt: "2024-04-01T17:02:43.000Z",
        updatedAt: "2024-04-01T17:02:43.000Z",
        OrderId: 8,
        MenuItemId: 20,
        CustomizationChoices: [
          {
            id: 53,
            name: "Multigrain Honey Oats",
            description: "Multigrain Honey Oats",
            additionalPrice: 10,
            currency: "INR",
            dietType: "Vegetarian",
            createdAt: "2024-03-30T17:08:30.000Z",
            updatedAt: "2024-03-30T17:08:30.000Z",
            CustomizationId: 32,
            OrderItemCustomizationsChoices: {
              createdAt: "2024-04-01T17:02:43.000Z",
              updatedAt: "2024-04-01T17:02:43.000Z",
              OrderItemId: 3,
              CustomizationChoiceId: 53,
            },
          },
          {
            id: 54,
            name: "Roasted Garlic",
            description: "Roasted Garlic",
            additionalPrice: 10,
            currency: "INR",
            dietType: "Vegetarian",
            createdAt: "2024-03-30T17:08:30.000Z",
            updatedAt: "2024-03-30T17:08:30.000Z",
            CustomizationId: 32,
            OrderItemCustomizationsChoices: {
              createdAt: "2024-04-01T17:02:43.000Z",
              updatedAt: "2024-04-01T17:02:43.000Z",
              OrderItemId: 3,
              CustomizationChoiceId: 54,
            },
          },
        ],
      },
    ],
    TableSession: {
      id: 3,
      startTime: "2024-03-30T11:38:30.000Z",
      endTime: null,
      totalAmount: null,
      customerName:
        "Enjoy your favourite Grills sandwich with a choice of drink and a cookie or veg kebabs.",
      customerMobile: 1223123113,
      orderCount: 0,
      partySize: null,
      paymentStatus: "pending",
      paymentMethod: "Cash",
      specialRequests: null,
      serviceNotes: null,
      status: "Active",
      feedback: null,
      foodRating: null,
      serviceRating: null,
      overallRating: null,
      firmId: 1,
      createdBy: null,
      updatedBy: null,
      createdAt: "2024-03-31T11:16:16.000Z",
      updatedAt: "2024-03-31T11:16:16.000Z",
      tableId: 4,
      table: {
        id: 4,
        tableName: "Table 1",
        capacity: 4,
        status: "Reserved",
        reservationName: "Nikhil Kuamr",
        reservationTime: "2024-03-30T11:38:30.000Z",
        reservationPartySize: null,
        imageUrl: null,
        firmId: 1,
        createdBy: 1,
        updatedBy: null,
        createdAt: "2024-03-31T11:04:06.000Z",
        updatedAt: "2024-04-04T04:06:17.000Z",
      },
    },
  },
  {
    id: 8,
    totalAmount: 26,
    currency: "INR",
    orderDate: "2024-04-01T16:27:53.000Z",
    status: "Confirmed",
    isPriority: false,
    orderType: "dine-in",
    customerNotes: null,
    promoCodeApplied: null,
    discountAmount: 0,
    firmId: 1,
    createdBy: 1,
    updatedBy: null,
    createdAt: "2024-04-01T16:27:53.000Z",
    updatedAt: "2024-04-01T16:27:53.000Z",
    tableSessionId: 3,
    orderItems: [
      {
        id: 4,
        quantity: 1,
        amount: 6,
        currency: "INR",
        specialInstructions: null,
        isCompleted: false,
        createdAt: "2024-04-01T17:02:43.000Z",
        updatedAt: "2024-04-01T17:02:43.000Z",
        OrderId: 8,
        MenuItemId: 22,
        CustomizationChoices: [
          {
            id: 54,
            name: "Roasted Garlic",
            description: "Roasted Garlic",
            additionalPrice: 10,
            currency: "INR",
            dietType: "Vegetarian",
            createdAt: "2024-03-30T17:08:30.000Z",
            updatedAt: "2024-03-30T17:08:30.000Z",
            CustomizationId: 32,
            OrderItemCustomizationsChoices: {
              createdAt: "2024-04-01T17:02:43.000Z",
              updatedAt: "2024-04-01T17:02:43.000Z",
              OrderItemId: 4,
              CustomizationChoiceId: 54,
            },
          },
        ],
      },
      {
        id: 3,
        quantity: 20,
        amount: 10,
        currency: "INR",
        specialInstructions: null,
        isCompleted: false,
        createdAt: "2024-04-01T17:02:43.000Z",
        updatedAt: "2024-04-01T17:02:43.000Z",
        OrderId: 8,
        MenuItemId: 20,
        CustomizationChoices: [
          {
            id: 53,
            name: "Multigrain Honey Oats",
            description: "Multigrain Honey Oats",
            additionalPrice: 10,
            currency: "INR",
            dietType: "Vegetarian",
            createdAt: "2024-03-30T17:08:30.000Z",
            updatedAt: "2024-03-30T17:08:30.000Z",
            CustomizationId: 32,
            OrderItemCustomizationsChoices: {
              createdAt: "2024-04-01T17:02:43.000Z",
              updatedAt: "2024-04-01T17:02:43.000Z",
              OrderItemId: 3,
              CustomizationChoiceId: 53,
            },
          },
          {
            id: 54,
            name: "Roasted Garlic",
            description: "Roasted Garlic",
            additionalPrice: 10,
            currency: "INR",
            dietType: "Vegetarian",
            createdAt: "2024-03-30T17:08:30.000Z",
            updatedAt: "2024-03-30T17:08:30.000Z",
            CustomizationId: 32,
            OrderItemCustomizationsChoices: {
              createdAt: "2024-04-01T17:02:43.000Z",
              updatedAt: "2024-04-01T17:02:43.000Z",
              OrderItemId: 3,
              CustomizationChoiceId: 54,
            },
          },
        ],
      },
    ],
    TableSession: {
      id: 3,
      startTime: "2024-03-30T11:38:30.000Z",
      endTime: null,
      totalAmount: null,
      customerName:
        "Enjoy your favourite Grills sandwich with a choice of drink and a cookie or veg kebabs.",
      customerMobile: 1223123113,
      orderCount: 0,
      partySize: null,
      paymentStatus: "pending",
      paymentMethod: "Cash",
      specialRequests: null,
      serviceNotes: null,
      status: "Active",
      feedback: null,
      foodRating: null,
      serviceRating: null,
      overallRating: null,
      firmId: 1,
      createdBy: null,
      updatedBy: null,
      createdAt: "2024-03-31T11:16:16.000Z",
      updatedAt: "2024-03-31T11:16:16.000Z",
      tableId: 4,
      table: {
        id: 4,
        tableName: "Table 1",
        capacity: 4,
        status: "Reserved",
        reservationName: "Nikhil Kuamr",
        reservationTime: "2024-03-30T11:38:30.000Z",
        reservationPartySize: null,
        imageUrl: null,
        firmId: 1,
        createdBy: 1,
        updatedBy: null,
        createdAt: "2024-03-31T11:04:06.000Z",
        updatedAt: "2024-04-04T04:06:17.000Z",
      },
    },
  },
];
export default function OrdersComponent() {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <NavLink to={"/"}>Dashboard</NavLink>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <NavLink to={"/menus"}>All Orders</NavLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className=" h-8 w-8">
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
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

            {AllTables.map((data, i) => {
              return (
                <DropdownMenuCheckboxItem checked={data.isChecked}>
                  {data.value}
                </DropdownMenuCheckboxItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Tabs defaultValue="completed" className="w-full">
        <TabsList className="grid w-full mb-4 lg:w-2/3 grid-cols-2">
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="canceled">Canceled </TabsTrigger>
        </TabsList>

        <TabsContent value="completed">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6  ">
            {allOrders.map((order: any) => {
              return (
                <>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Card
                        key="1"
                        className="w-full  hover:bg-muted/50  cursor-pointer"
                      >
                        <CardHeader className="p-4 lg:p-6 md:p-6">
                          <div className="flex items-start gap-4">
                            <div className="flex-1">
                              <CardTitle className="text-base">
                                Table - 5
                              </CardTitle>

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
                                <DropdownMenuContent
                                  className="w-56"
                                  align="end"
                                >
                                  <DropdownMenuLabel>Mark as</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className=" p-4    gap-2 lg:p-6 md:p-6  pt-0  lg:pt-0  md:pt-0  pb-0  lg:pb-0  md:pb-0  ">
                          <div className="grid gap-2">
                            <div className="flex items-center gap-4 ">
                              <div className="flex items-center gap-3">
                                <VegIcon></VegIcon>

                                <div className="grid gap-1 text-sm">
                                  <div className="font-medium">
                                    1 x Spaghetti Bolognese
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">
                                    Due in 5 mins
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 ">
                              <div className="flex items-center gap-3">
                                <VegIcon></VegIcon>

                                <div className="grid gap-1 text-sm">
                                  <div className="font-medium">
                                    1 x Spaghetti Bolognese
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">
                                    Due in 5 mins
                                  </div>
                                </div>
                              </div>
                            </div>
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
                    <SheetDemo></SheetDemo>
                  </Sheet>
                </>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>

      {/* <SheetDemo></SheetDemo> */}
    </>
  );
}

export function SheetDemo() {
  return (
    <SheetContent className="w-full">
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
    </SheetContent>
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
