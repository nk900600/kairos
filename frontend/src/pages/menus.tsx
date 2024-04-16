import {
  ArrowLeft,
  BookOpenText,
  ChevronUpIcon,
  Cross,
  MinusIcon,
  PackageIcon,
  PlusIcon,
  ScrollText,
  Search,
  Users,
  X,
  XIcon,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { NavLink, Navigate } from "react-router-dom";
import { ReactComponent as VegIcon } from "../VegIcon.svg";
import { Input } from "../components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { Label } from "../components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import { Separator } from "../components/ui/separator";
import { useEffect, useState } from "react";
import { Badge } from "../components/ui/badge";
import { useSwipeable } from "react-swipeable";
import { CurrentOrder } from "./currentOrder";

const currencyMap = new Map([["INR", "₹"]]);
const allCategory = [
  {
    id: 1,
    title: "Appetizer",
    firmTypeId: 1,
    firmId: null,
    createdAt: "2024-03-30T11:34:27.000Z",
    updatedAt: "2024-03-30T11:34:27.000Z",
  },
  {
    id: 2,
    title: "Main Course",
    firmTypeId: 1,
    firmId: null,
    createdAt: "2024-03-30T11:34:27.000Z",
    updatedAt: "2024-03-30T11:34:27.000Z",
  },
  {
    id: 3,
    title: "Burgers",
    firmTypeId: 1,
    firmId: null,
    createdAt: "2024-03-30T11:34:27.000Z",
    updatedAt: "2024-03-30T11:34:27.000Z",
  },
  {
    id: 4,
    title: "Pizzas",
    firmTypeId: 1,
    firmId: null,
    createdAt: "2024-03-30T11:34:27.000Z",
    updatedAt: "2024-03-30T11:34:27.000Z",
  },
  {
    id: 5,
    title: "Dessert",
    firmTypeId: 1,
    firmId: null,
    createdAt: "2024-03-30T11:34:27.000Z",
    updatedAt: "2024-03-30T11:34:27.000Z",
  },
  {
    id: 6,
    title: "Beverages",
    firmTypeId: 1,
    firmId: null,
    createdAt: "2024-03-30T11:34:27.000Z",
    updatedAt: "2024-03-30T11:34:27.000Z",
  },
];
const AllMenu = [
  {
    id: 20,
    name: "Delhi Tikki Sandwich + Side + Coke",
    description:
      "Enjoy your favourite Grills sandwich with a choice of drink and a cookie or veg kebabs.",
    calorieCount: null,
    price: 279,
    currency: "INR",
    categoryId: 3,
    available: false,
    spiceLevel: "Spicy",
    dietType: "Vegetarian",
    imageUrl: "http://example.com/chicken_wings.jpg",
    firmId: 1,
    createdBy: 1,
    updatedBy: null,
    createdAt: "2024-03-30T17:08:30.000Z",
    updatedAt: "2024-03-30T17:08:30.000Z",
    Customizations: [
      {
        id: 33,
        name: "Add Ons",
        description: "Add Ons",
        isRequired: false,
        isMultiselect: true,
        maxMultiSelect: 3,
        createdAt: "2024-03-30T17:08:30.000Z",
        updatedAt: "2024-03-30T17:08:30.000Z",
        menuItemId: 20,
        CustomizationChoices: [
          {
            id: 56,
            name: "Cheese Pull (Mozzarella)",
            description: "Cheese Pull (Mozzarella)",
            additionalPrice: 59,
            currency: "INR",
            dietType: "Vegetarian",
            createdAt: "2024-03-30T17:08:30.000Z",
            updatedAt: "2024-03-30T17:08:30.000Z",
            CustomizationId: 33,
          },
          {
            id: 55,
            name: "Potato Roastie Patty",
            description: "Potato Roastie Patty",
            additionalPrice: 29,
            currency: "INR",
            dietType: "Vegetarian",
            createdAt: "2024-03-30T17:08:30.000Z",
            updatedAt: "2024-03-30T17:08:30.000Z",
            CustomizationId: 33,
          },
        ],
      },
      {
        id: 32,
        name: "Bread",
        description: "Bread",
        isRequired: true,
        isMultiselect: false,
        maxMultiSelect: 100,
        createdAt: "2024-03-30T17:08:30.000Z",
        updatedAt: "2024-03-30T17:08:30.000Z",
        menuItemId: 20,
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
          },
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
          },
          {
            id: 52,
            name: "Multigrain",
            description: "Multigrain",
            additionalPrice: 0,
            currency: "INR",
            dietType: "Vegetarian",
            createdAt: "2024-03-30T17:08:30.000Z",
            updatedAt: "2024-03-30T17:08:30.000Z",
            CustomizationId: 32,
          },
          {
            id: 51,
            name: "White Italian",
            description: "White Italian",
            additionalPrice: 0,
            currency: "INR",
            dietType: "Vegetarian",
            createdAt: "2024-03-30T17:08:30.000Z",
            updatedAt: "2024-03-30T17:08:30.000Z",
            CustomizationId: 32,
          },
        ],
      },
    ],
  },
  {
    id: 22,
    name: "Mumbai Tikki Sandwich + Side + Coke",
    description:
      "Enjoy your favourite Grills sandwich with a choice of drink and a cookie or veg kebabs.",
    calorieCount: null,
    price: 279,
    currency: "INR",
    categoryId: 3,
    available: true,
    spiceLevel: "Spicy",
    dietType: "Vegetarian",
    imageUrl: "http://example.com/chicken_wings.jpg",
    firmId: 1,
    createdBy: 1,
    updatedBy: null,
    createdAt: "2024-04-01T17:02:31.000Z",
    updatedAt: "2024-04-01T17:02:31.000Z",
    Customizations: [
      {
        id: 36,
        name: "Add Ons",
        description: "Add Ons",
        isRequired: false,
        isMultiselect: true,
        maxMultiSelect: 3,
        createdAt: "2024-04-01T17:02:31.000Z",
        updatedAt: "2024-04-01T17:02:31.000Z",
        menuItemId: 22,
        CustomizationChoices: [
          {
            id: 63,
            name: "Cheese Pull (Mozzarella)",
            description: "Cheese Pull (Mozzarella)",
            additionalPrice: 59,
            currency: "INR",
            dietType: "Vegetarian",
            createdAt: "2024-04-01T17:02:31.000Z",
            updatedAt: "2024-04-01T17:02:31.000Z",
            CustomizationId: 36,
          },
          {
            id: 62,
            name: "Potato Roastie Patty",
            description: "Potato Roastie Patty",
            additionalPrice: 29,
            currency: "INR",
            dietType: "Vegetarian",
            createdAt: "2024-04-01T17:02:31.000Z",
            updatedAt: "2024-04-01T17:02:31.000Z",
            CustomizationId: 36,
          },
        ],
      },
      {
        id: 35,
        name: "Bread",
        description: "Bread",
        isRequired: true,
        isMultiselect: false,
        maxMultiSelect: 100,
        createdAt: "2024-04-01T17:02:31.000Z",
        updatedAt: "2024-04-01T17:02:31.000Z",
        menuItemId: 22,
        CustomizationChoices: [
          {
            id: 61,
            name: "Roasted Garlic",
            description: "Roasted Garlic",
            additionalPrice: 10,
            currency: "INR",
            dietType: "Vegetarian",
            createdAt: "2024-04-01T17:02:31.000Z",
            updatedAt: "2024-04-01T17:02:31.000Z",
            CustomizationId: 35,
          },
          {
            id: 60,
            name: "Multigrain Honey Oats",
            description: "Multigrain Honey Oats",
            additionalPrice: 10,
            currency: "INR",
            dietType: "Vegetarian",
            createdAt: "2024-04-01T17:02:31.000Z",
            updatedAt: "2024-04-01T17:02:31.000Z",
            CustomizationId: 35,
          },
          {
            id: 59,
            name: "Multigrain",
            description: "Multigrain",
            additionalPrice: 0,
            currency: "INR",
            dietType: "Vegetarian",
            createdAt: "2024-04-01T17:02:31.000Z",
            updatedAt: "2024-04-01T17:02:31.000Z",
            CustomizationId: 35,
          },
          {
            id: 58,
            name: "White Italian",
            description: "White Italian",
            additionalPrice: 0,
            currency: "INR",
            dietType: "Vegetarian",
            createdAt: "2024-04-01T17:02:31.000Z",
            updatedAt: "2024-04-01T17:02:31.000Z",
            CustomizationId: 35,
          },
        ],
      },
      {
        id: 34,
        name: "Sub",
        description: "Sub Data",
        isRequired: true,
        isMultiselect: false,
        maxMultiSelect: 100,
        createdAt: "2024-04-01T17:02:31.000Z",
        updatedAt: "2024-04-01T17:02:31.000Z",
        menuItemId: 22,
        CustomizationChoices: [
          {
            id: 57,
            name: "Delhi Tikki 15cm",
            description: "Some Data",
            additionalPrice: 0,
            currency: "INR",
            dietType: "Vegetarian",
            createdAt: "2024-04-01T17:02:31.000Z",
            updatedAt: "2024-04-01T17:02:31.000Z",
            CustomizationId: 34,
          },
        ],
      },
    ],
  },
];

export default function MenusComponent() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [allMenus, setAllMenus] = useState(AllMenu);
  const [countMap, setcountMap] = useState<any>({});
  const [allCategories, setAllCategories] = useState(allCategory);

  useEffect(() => {
    let countmap: any = {};
    allMenus.forEach((menu) => {
      countmap[menu.id] = 0;
    });
    setcountMap(countmap);
  }, []);
  const handleOpenMenu = (w: any) => {
    setMenuOpen(w);
  };

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
              <NavLink to={"/menus"}>Menu</NavLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className=" h-8 w-8">
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          All Menus
        </h1>
      </div>

      <div>
        <div className="flex h-14 items-center gap-2  lg:h-[60px] lg:gap-4">
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search Contacts..."
                  className="w-full appearance-none bg-background pl-8 shadow-none "
                />
              </div>
            </form>
          </div>
        </div>

        {allCategories.map((category) => {
          let validMenu = allMenus.filter(
            (menu: any) => menu.categoryId === category.id
          );
          if (!validMenu.length) return <></>;
          return (
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>{category.title}</AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-2">
                    {validMenu.map((menu) => {
                      return (
                        <Card
                          aria-disabled={menu.available}
                          className={
                            "w-full " +
                            (!menu.available &&
                              "bg-gray-200 opacity-50 cursor-not-allowed")
                          }
                        >
                          <CardHeader className="p-3 lg:p-4 md:p-4  ">
                            <div className="flex items-start gap-4 items-center">
                              <div className="flex flex-col items-center ">
                                <VegIcon className="h-5 w-5" />
                              </div>
                              <div className="flex-1">
                                <CardTitle className="text-base flex-1">
                                  {menu.name}
                                  {!menu.available && (
                                    <Badge
                                      className="ml-3"
                                      variant={"destructive"}
                                    >
                                      {" "}
                                      Not available
                                    </Badge>
                                  )}
                                </CardTitle>

                                {menu.Customizations?.length && (
                                  <CardDescription className="text-xs">
                                    Customization
                                  </CardDescription>
                                )}
                              </div>

                              <div className="ml-auto">
                                {/* <AddButton
                                  count={countMap[menu.id]}
                                  menu={menu}
                                ></AddButton> */}

                                <CurrentOrder></CurrentOrder>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="p-3 pt-0 lg:p-4 md:p-4 lg:pt-0 md:pt-0 ">
                            <p className="text-xs font-bold">
                              {currencyMap.get(menu.currency)} {menu.price}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              223.2 kcal - 7g Protein - 19.1.g Carbs - 11.8g Fat
                            </p>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          );
        })}

        <Popover onOpenChange={handleOpenMenu}>
          <PopoverTrigger asChild>
            <div className="fixed bottom-4 right-4">
              <Button
                variant={isMenuOpen ? "outline" : "default"}
                size="icon"
                className="rounded-full"
              >
                {isMenuOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <BookOpenText className="h-4 w-4" />
                )}
              </Button>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-80 right-10" align="end" side="top">
            <div className="flex flex-col gap-5">
              <div className="flex">
                <Label className="w-full">Accept terms and conditions</Label>
                <Label>2</Label>
              </div>
              <div className="flex">
                <Label className="w-full">Accept terms and conditions</Label>
                <Label>2</Label>
              </div>
              <div className="flex">
                <Label className="w-full">Accept terms and conditions</Label>
                <Label>2</Label>
              </div>
              <div className="flex">
                <Label className="w-full">Accept terms and conditions</Label>
                <Label>2</Label>
              </div>
              <div className="flex h-4">
                <Label className="w-full">Accept terms and conditions</Label>
                <Label>2</Label>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}

export const AddButton = ({ count, menu }: any) => {
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
          <span className="text-sm font-semibold pl-4">Add</span>
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
            <SheetHeader className="mb-4">
              <SheetTitle className="flex items-center gap-3">
                <VegIcon className="h-5 w-5" />
                Paneer masala
              </SheetTitle>
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
            </CardContent>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
