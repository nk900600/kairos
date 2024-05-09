import {
  ArrowLeft,
  BookOpenText,
  ChevronUpIcon,
  CirclePercent,
  CirclePlus,
  CircleSlash,
  Cross,
  Ellipsis,
  MinusIcon,
  PackageIcon,
  Pencil,
  PencilIcon,
  Percent,
  PlusIcon,
  Salad,
  ScrollText,
  Search,
  ShoppingBag,
  Trash2,
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
import { NavLink, Navigate, useNavigate } from "react-router-dom";
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
import { Children, useContext, useEffect, useState } from "react";
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
import { DrawerClose } from "../components/ui/drawer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import {
  deleteMenu,
  fetchAllMenuCategories,
  fetchAllMenus,
  updateMenu,
} from "../redux/actions";
import { RootState } from "../redux/reducer";
import DrawerContext from "../context/drawerContext";
import { ScrollArea } from "../components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import ManageCustomization from "./modals/manageCustomization";

const currencyMap = new Map([["INR", "₹"]]);

export function MenuHeaderComponent() {
  const {
    open,
    setOpen,
    title,
    setTitle,
    setComponent,
    setDescription,
    setCompProps,
  } = useContext(DrawerContext);

  const handleAddClick = () => {
    setOpen(true);
    setTitle("Add New Item");
    setDescription(" ");
    setComponent("manageMenu");
  };
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
        <h1 className="flex-1  whitespace-nowrap text-lg sm:text-2xl  font-semibold tracking-tight ">
          All Menus
        </h1>

        <Button
          onClick={handleAddClick}
          variant="outline"
          className=" h-8  gap-2"
        >
          <CirclePlus className="h-4 w-4" />
          <span className="hidden sm:block">Add Item</span>
        </Button>
        {/* <DrawerDialogComponent
          triggerButton={
            <Button variant="outline" className=" h-8  gap-2">
              <CirclePlus className="h-4 w-4" />
              <span className="hidden sm:block">Add Item</span>
            </Button>
          }
          title={"Add Item"}
          description={"A new menu itmes"}
        ></DrawerDialogComponent> */}
      </div>
    </>
  );
}

export default function MenusComponent({ canPlaceOrder = false }) {
  const dispatch: AppDispatch = useDispatch();
  const {
    open,
    setOpen,
    title,
    setTitle,
    setComponent,
    setDescription,
    setCompProps,
  } = useContext(DrawerContext);

  const navigate = useNavigate();
  const { allMenu, allMenuCategories } = useSelector(
    (state: { table: RootState }) => state.table
  );

  useEffect(() => {
    dispatch(fetchAllMenus());
    dispatch(fetchAllMenuCategories());
  }, [dispatch]);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isOrderOpen, setOrderOpen] = useState(false);
  const [countMap, setcountMap] = useState<any>({});

  useEffect(() => {
    let countmap: any = {};
    allMenu.forEach((menu: any) => {
      countmap[menu.id] = 0;
    });
    setcountMap(countmap);
  }, [allMenu]);

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

  const handleMenuClick = (menu: any) => {
    setOpen(true);
    setTitle("Edit Item");
    setDescription(" ");
    setComponent("customizationComponent");
    setCompProps({ menu: menu });
  };

  const handleEditMenuClick = (table: any) => {
    setOpen(true);
    setTitle("Edit Item");
    setDescription(" ");
    setComponent("manageMenu");
    setCompProps({ menu: table });
  };
  const handleDiscountClick = (menu: any) => {
    setOpen(true);
    setTitle("Add Discount");
    setDescription("Enter a discount percentage to apply to this menu item.");
    setComponent("manageMenuDiscount");
    setCompProps({ menu: menu });
  };

  const DropdownMenuList = (menu: any) => (
    <DropdownMenuContent className="w-56" align="end">
      <DropdownMenuItem onClick={() => handleEditMenuClick(menu)}>
        <>
          <Pencil className="mr-2 h-4 w-4 " />
          <span>Edit</span>
        </>
      </DropdownMenuItem>

      {/* <DropdownMenuItem onClick={() => handleDiscountClick(menu)}>
        <>
          <Percent className="mr-2 h-4 w-4 " />
          <span>Discount</span>
        </>
      </DropdownMenuItem> */}

      <DropdownMenuItem
        onClick={() =>
          dispatch(updateMenu({ id: menu.id, available: !menu.available }))
        }
      >
        <>
          <CircleSlash className="mr-2 h-4 w-4 " />
          <span>
            {menu.available ? "Mark as not Available" : "Mark as Available"}
          </span>
        </>
      </DropdownMenuItem>
      <DropdownMenuSeparator />

      <DropdownMenuItem onClick={() => navigate(menu.id + "/customization")}>
        <>
          <Salad className="mr-2 h-4 w-4 " />
          <span>Customization</span>
        </>
      </DropdownMenuItem>
      <DropdownMenuSeparator />

      <DropdownMenuItem onClick={() => dispatch(deleteMenu(menu.id))}>
        <Trash2 className="mr-2 h-4 w-4 text-destructive" />
        <span>Delete</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );

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
                  placeholder="Search Menu item..."
                  className="w-full appearance-none bg-background pl-8 shadow-none "
                />
              </div>
            </form>
          </div>
        </div>

        {allMenuCategories.map((category) => {
          let validMenu = allMenu.filter(
            (menu: any) => menu.categoryId === category.id
          );
          if (!validMenu.length) return <></>;
          return (
            <Accordion
              defaultValue={allMenuCategories.map((val) => val.title)}
              type="multiple"
              className="w-full"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>{category.title}</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2  gap-4 sm:gap-6 ">
                    {validMenu.map((menu) => {
                      return (
                        <Card
                          aria-disabled={menu.available}
                          className={
                            "w-full   " +
                            (!menu.available &&
                              "bg-gray-200 opacity-50 cursor-not-allowed ") +
                            (!canPlaceOrder && " cursor-pointer ")
                          }
                          onClick={() =>
                            !canPlaceOrder &&
                            navigate(menu.id + "/customization")
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

                                {menu.Customizations?.length ? (
                                  <CardDescription className="text-xs">
                                    Customization
                                  </CardDescription>
                                ) : (
                                  ""
                                )}
                              </div>

                              <div className="ml-auto">
                                {canPlaceOrder && (
                                  <MenuAddButton
                                    // title={
                                    //   <SheetTitle className="flex items-center gap-3">
                                    //     <VegIcon className="h-5 w-5" />
                                    //     {menu.name}
                                    //   </SheetTitle>
                                    // }
                                    // description={menu.description}
                                    menu={menu}
                                  >
                                    <CustomizationComponent menu={menu} />
                                  </MenuAddButton>
                                )}

                                {!canPlaceOrder && (
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
                                      {DropdownMenuList(menu)}
                                    </DropdownMenu>
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="p-3 pt-0 lg:p-4 md:p-4 lg:pt-0 md:pt-0 ">
                            <div className="flex justify-between align-start">
                              <div>
                                <p className="text-xs font-bold">
                                  {currencyMap.get(menu.currency)} {menu.price}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  223.2 kcal - 7g Protein - 19.1.g Carbs - 11.8g
                                  Fat
                                </p>
                              </div>
                            </div>
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
  const [currentMenu, setCurrentMenu] = useState(
    JSON.parse(JSON.stringify(menu))
  );

  useEffect(() => {
    currentMenu.orderTotal = currentMenu.price;
    setCurrentMenu(JSON.parse(JSON.stringify(currentMenu)));
  }, []);

  const handleCheckBoxClick = (event: any, option: any) => {
    console.log(event);
    if (event) currentMenu.orderTotal += option.additionalPrice;
    else currentMenu.orderTotal -= option.additionalPrice;
    setCurrentMenu(JSON.parse(JSON.stringify(currentMenu)));
  };
  return (
    <ScrollArea className=" max-h-screen">
      <CardContent className="p-0 mb-4 mt-3 text-sm gap-4 flex flex-col">
        <div>
          {menu.Customizations?.map((item: any, index: number) => {
            return (
              <>
                <div className="grid gap-3">
                  <div>
                    {" "}
                    <div className="font-semibold text-muted-foreground">
                      {item.name}
                    </div>
                    <div className="font-sm text-muted-foreground">
                      {item.maxMultiSelect == 100
                        ? " "
                        : `Select any ${item.maxMultiSelect} options `}
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
                                  <span>
                                    {currencyMap.get(options.currency)}{" "}
                                    {options.additionalPrice}
                                  </span>
                                )}
                              </div>
                            </label>
                            <Checkbox
                              id={options.id}
                              onCheckedChange={(event) =>
                                handleCheckBoxClick(event, options)
                              }
                            />
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                {index + 1 !== menu.Customizations?.length && (
                  <Separator className="my-4" />
                )}{" "}
              </>
            );
          })}
        </div>
      </CardContent>
      <div className="flex justify-between gap-4">
        <div className="rounded-lg border bg-card h-10 flex items-center gap-2 w-fit">
          <Button variant="ghost" size={"icon"} className="h-10">
            <MinusIcon className="h-4 w-4 -translate-x-0.5" />
          </Button>

          <span className="text-sm font-semibold">{1}</span>

          <Button variant="ghost" size={"icon"} className={" h-10 "}>
            <PlusIcon className="h-4 w-4 -translate-x-0.5 " />
          </Button>
        </div>

        <Button size={"lg"} className="h-10 w-full">
          Add Item - {currencyMap.get(menu.currency)} {currentMenu.orderTotal}
        </Button>
      </div>
    </ScrollArea>
  );
};

export function MenuAddButton({ menu }: any) {
  const [isOpen, setLocalOpen] = useState<boolean | undefined>(undefined);
  const [count, setCount] = useState<number>(0);
  const {
    open,
    setOpen,
    title,
    setTitle,
    setComponent,
    setDescription,
    setCompProps,
  } = useContext(DrawerContext);
  let sheetProps: any = {
    open: isOpen,
    onOpenChange: (data: any) => {
      setLocalOpen(data);
    },
  };
  const handlers = useSwipeable({
    onSwipedRight: (eventData: any) => {
      setLocalOpen(false);
    },
  });

  const handleAddClick = () => {
    if (menu?.Customizations?.length) {
      setOpen(true);
      setTitle("Edit Item");
      setDescription(" ");
      setComponent("customizationComponent");
      setCompProps({ menu: menu });
    } else setCount(count + 1);
  };

  const handleMinusClick = () => {
    count == 1 ? setCount(0) : setCount(count - 1);
  };
  return (
    <div className="flex items-center space-x-4">
      <div className="rounded-lg border bg-card h-8 flex items-center gap-1">
        {count !== 0 && (
          <Button
            onClick={handleMinusClick}
            variant="ghost"
            size={"sm"}
            className="h-8"
          >
            <MinusIcon className="h-4 w-4 -translate-x-0.5" />
          </Button>
        )}

        {count != 0 && <span className="text-sm font-semibold">{count}</span>}
        <Button
          variant="ghost"
          size={"sm"}
          className={" h-8 " + (count == 0 ? "gap-4" : "")}
          onClick={handleAddClick}
        >
          {count == 0 && <span className="text-sm font-semibold ">Add</span>}
          <PlusIcon className="h-4 w-4 -translate-x-0.5 " />
        </Button>
        {/* <DrawerDialogComponent
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
        </DrawerDialogComponent> */}
      </div>
    </div>
  );
}
