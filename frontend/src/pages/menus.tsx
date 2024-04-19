import {
  ArrowLeft,
  BookOpenText,
  ChevronUpIcon,
  CirclePlus,
  Cross,
  MinusIcon,
  PackageIcon,
  PlusIcon,
  ScrollText,
  Search,
  ShoppingBag,
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
import { Children, useEffect, useState } from "react";
import { Badge } from "../components/ui/badge";
import { useSwipeable } from "react-swipeable";
import {
  CurrentOrder,
  CurrentOrderContentComponent,
} from "./placeOrder/currentOrder";
import { DrawerDialogComponent } from "../common/drawerDialog";
import { GoBackButton } from "./common/goBackButton";
import { BreadcrumbComponent } from "./common/breadCrumbs";
import { Checkbox } from "../components/ui/checkbox";

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

export function MenuHeaderComponent() {
  return (
    <>
      <BreadcrumbComponent
        list={[
          { link: "/", label: "Dashboard" },
          { link: "/menus", label: "Menu" },
        ]}
      />
      <div className="flex items-center gap-4">
        <GoBackButton />
        <h1 className="flex-1  whitespace-nowrap text-lg font-semibold tracking-tight ">
          All Menus
        </h1>
        <DrawerDialogComponent
          triggerButton={
            <Button variant="outline" className=" h-8  gap-2">
              <CirclePlus className="h-4 w-4" />
              <span className="hidden sm:block">Add Item</span>
            </Button>
          }
          title={"Add Item"}
          description={"A new menu itmes"}
        ></DrawerDialogComponent>
      </div>
    </>
  );
}

export default function MenusComponent({ canPlaceOrder = false }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isOrderOpen, setOrderOpen] = useState(false);
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
  const handleOpenOrder = (w: any) => {
    setOrderOpen(w);
  };

  const categoriesProps = {
    handleOpenMenu,
    isMenuOpen,
  };
  const currentOrdersProps = {
    handleOpenOrder,
    isOrderOpen,
  };

  return (
    <>
      {!canPlaceOrder && <MenuHeaderComponent />}

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
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2  gap-4 sm:gap-6 ">
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
                                <CardTitle className="text-base flex-1 text-md sm:text-base">
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
                                <MenuAddButton
                                  title={
                                    <SheetTitle className="flex items-center gap-3">
                                      <VegIcon className="h-5 w-5" />
                                      {menu.name}
                                    </SheetTitle>
                                  }
                                  description={menu.description}
                                >
                                  <CustomizationComponent menu={menu} />
                                </MenuAddButton>

                                {/* {canPlaceOrder && <CurrentOrder></CurrentOrder>} */}
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

        {canPlaceOrder && (
          <>
            <ShowAllCategories {...categoriesProps}></ShowAllCategories>
            <ShowCurrentOrder {...currentOrdersProps}></ShowCurrentOrder>
          </>
        )}
      </div>
    </>
  );
}

export function ShowAllCategories({ handleOpenMenu, isMenuOpen }: any) {
  return (
    <Popover onOpenChange={handleOpenMenu}>
      <PopoverTrigger asChild>
        <div className="fixed bottom-4 right-4">
          <Button variant={"default"} size="icon" className="rounded-full">
            {isMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <BookOpenText className="h-4 w-4" />
            )}
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-60 right-10" align="end" side="top">
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
  );
}
export function ShowCurrentOrder({ handleOpenMenu, isMenuOpen }: any) {
  const [isOpen, setOpen] = useState<boolean | undefined>(undefined);
  let sheetProps: any = {
    open: isOpen,
    onOpenChange: (data: any) => {
      setOpen(data);
    },
  };
  const handlers = useSwipeable({
    onSwipedRight: (eventData: any) => {
      console.log("fvfvf");
      setOpen(false);
    },
  });
  return (
    <>
      <Sheet {...sheetProps}>
        <SheetTrigger asChild>
          <div className="fixed bottom-4 right-16">
            <Button
              variant={!isMenuOpen ? "outline" : "default"}
              size="icon"
              className="rounded-full"
            >
              {isMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <>
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-1 text-xs font-semibold leading-none bg-red-500 text-white rounded-full">
                    2
                  </span>
                  <ShoppingBag className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </SheetTrigger>
        <SheetContent className="w-full" {...handlers}>
          <CurrentOrderContentComponent />
        </SheetContent>
      </Sheet>
    </>
  );
}

export const CustomizationComponent = ({ menu }: any) => {
  return (
    <CardContent className="p-0 mb-4 mt-3 text-sm">
      {menu.Customizations.map((item: any, index: number) => {
        return (
          <>
            <div className="grid gap-3">
              <div>
                {" "}
                <div className="font-semibold text-muted-foreground">
                  {item.name}
                </div>
                <div className="font-sm text-muted-foreground">
                  {item.maxMultiSelect}
                </div>
              </div>

              <ul className="grid gap-3">
                {item.CustomizationChoices.map((options: any) => {
                  return (
                    <li className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 w-full justify-between">
                        <label
                          htmlFor={options.id}
                          className="text-sm w-full cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          <div className="flex justify-between ">
                            <div className="flex gap-5">
                              {options.dietType == "Vegetarian" && (
                                <VegIcon></VegIcon>
                              )}
                              <span className=" font-semibold">
                                {options.name}
                              </span>
                            </div>

                            {options.additionalPrice != 0 && (
                              <span>${options.additionalPrice}</span>
                            )}
                          </div>
                        </label>
                        <Checkbox id={options.id} />
                      </div>
                    </li>
                  );
                })}

                {/* <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Aqua Filters x <span>1</span>
                    </span>
                    <span>$49.00</span>
                  </li> */}
              </ul>
            </div>
            {index + 1 !== menu.Customizations.length && (
              <Separator className="my-4" />
            )}
          </>
        );
      })}
      {/* 
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
        </div> */}
    </CardContent>
  );
};

export function MenuAddButton({
  count = 0,
  title,
  description,
  children,
}: any) {
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

        {count != 0 && <span className="text-sm font-semibold">{count}</span>}

        <DrawerDialogComponent
          isFooter={false}
          triggerButton={
            <Button
              variant="ghost"
              size={count == 0 ? "lg" : "icon"}
              className={" h-8 " + (count == 0 ? "gap-4" : "")}
            >
              {count == 0 && (
                <span className="text-sm font-semibold ">Add</span>
              )}
              <PlusIcon className="h-4 w-4 -translate-x-0.5 " />
            </Button>
          }
          title={title}
          description={description}
        >
          {children}
        </DrawerDialogComponent>

        {/* <Sheet {...sheetProps}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size={count == 0 ? "lg" : "icon"}
              className={" h-8 " + (count == 0 ? "gap-4" : "")}
            >
              {count == 0 && (
                <span className="text-sm font-semibold ">Add</span>
              )}
              <PlusIcon className="h-4 w-4 -translate-x-0.5 " />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full" {...handlers}>
            {children}
          </SheetContent>
        </Sheet> */}
      </div>
    </div>
  );
}
