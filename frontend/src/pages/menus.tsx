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
import { NavLink, Navigate, useNavigate, useParams } from "react-router-dom";
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
import { Children, useContext, useEffect, useRef, useState } from "react";
import { Badge } from "../components/ui/badge";
import { useSwipeable } from "react-swipeable";
import { CurrentOrderContentComponent } from "./placeOrder/currentOrder";
import { DrawerDialogComponent } from "../common/drawerDialog";
import { GoBackButton } from "./common/goBackButton";
import { BreadcrumbComponent } from "./common/breadCrumbs";
import { Checkbox } from "../components/ui/checkbox";
import { DrawerClose } from "../components/ui/drawer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import {
  addItemToCart,
  deleteItemToCart,
  deleteMenu,
  fetchAllCartData,
  fetchAllMenuCategories,
  fetchAllMenus,
  updateItemToCart,
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
import { convertToObject } from "typescript";
import { toast } from "sonner";
import { EmptyPlaceholder } from "./common/emptyPlaceholder";

export const currencyMap = new Map([["INR", "₹"]]);

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
    setCompProps({ menu: {} });
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
  const { allMenu, allMenuCategories, allTableSessions, allCartData } =
    useSelector((state: { table: RootState }) => state.table);

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isOrderOpen, setOrderOpen] = useState(false);
  const [countMap, setcountMap] = useState<any>({});
  const [tableSessionId, setTableSessionId] = useState<any>({});

  useEffect(() => {
    let countmap: any = {};
    allMenu.forEach((menu: any) => {
      countmap[menu.id] = 0;
    });
    setcountMap(countmap);
  }, [allMenu]);

  const { tableId } = useParams();

  const menuRefs: any = useRef({});

  useEffect(() => {
    // if (!allCartData.length) {
    let id = allTableSessions
      ?.filter((val) => val.status == "Active")
      .find((session) => session.tableId == tableId)?.id;
    if (id) {
      setTableSessionId(id);
      dispatch(fetchAllCartData(id));
    }
    // }
  }, [allTableSessions]);
  const scrollToCategory = (id: any) => {
    menuRefs?.current[id]?.scrollIntoView({ behavior: "smooth" });
  };

  const handleOpenMenu = (w: any) => {
    console.log(w);
    setMenuOpen(w);
  };
  const handleOpenOrder = (w: any) => {
    setOrderOpen(w);
  };

  const categoriesProps = {
    handleOpenMenu,
    scrollToCategory,
    isMenuOpen,
  };
  const currentOrdersProps = {
    handleOpenOrder,
    isOrderOpen,
    tableSessionId,
  };

  const handleMenuClick = (menu: any) => {
    setOpen(true);
    setTitle("Edit Item");
    setDescription(" ");
    setComponent("customizationComponent");
    setCompProps({ menu: menu });
  };

  const handleAddClick = () => {
    setOpen(true);
    setTitle("Add New Item");
    setDescription(" ");
    setComponent("manageMenu");
    setCompProps({ menu: {} });
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
  const handleDeleteClick = (e: any, menu: any) => {
    dispatch(deleteMenu(menu.id));
  };
  const handleMenuItemClick = (e: any, menu: any) => {
    e.preventDefault();
    // !canPlaceOrder && navigate(menu.id + "/customization");
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

      <DropdownMenuItem onClick={(e) => handleDeleteClick(e, menu)}>
        <Trash2 className="mr-2 h-4 w-4 text-destructive" />
        <span>Delete</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );

  return (
    <>
      {!canPlaceOrder && <MenuHeaderComponent />}

      {!!allMenu.length && (
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
                ref={(el) => (menuRefs.current[category.id] = el)}
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
                            onClick={(e) => handleMenuItemClick(e, menu)}
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
                                      menu={menu}
                                      tableSessionId={tableSessionId}
                                    />
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
                                    {currencyMap.get(menu.currency)}{" "}
                                    {menu.price}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    223.2 kcal - 7g Protein - 19.1.g Carbs -
                                    11.8g Fat
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
      )}

      {!allMenu.length && (
        <EmptyPlaceholder
          title="No Menu added yet"
          description="It looks like your menu is currently empty. To provide a great dining experience and allow customers to see what your restaurant has to offer, please add menu items to your system."
          buttonText="Add Menu"
          type="customization"
          onButtonClick={() => handleAddClick()}
        ></EmptyPlaceholder>
      )}
    </>
  );
}

export function ShowAllCategories({
  handleOpenMenu,
  scrollToCategory,
  isMenuOpen,
}: any) {
  const { allMenu, allMenuCategories, allTableSessions, allCartData } =
    useSelector((state: { table: RootState }) => state.table);
  const [open, setOpen] = useState(false);

  const handlechange = (e: any) => {
    setOpen(e);
    handleOpenMenu(e);
  };

  const labelClick = (id: any) => {
    setOpen(false);
    handleOpenMenu(false);
    scrollToCategory(id);
  };
  return (
    <Popover onOpenChange={handlechange} open={open}>
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
        <div className="flex flex-col max-h-[80vh] w-full overflow-y-auto gap-5 ">
          {allMenuCategories.map((item) => {
            return (
              <>
                <Label
                  className="w-full cursor-pointer"
                  key={item.id}
                  onClick={() => labelClick(item.id)}
                >
                  {item.title}
                </Label>
              </>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
export function ShowCurrentOrder({
  handleOpenMenu,
  isMenuOpen,
  tableSessionId,
}: any) {
  const [isOpen, setOpen] = useState<boolean | undefined>(undefined);
  const [currentCartData, setCurrentCartData] = useState<any>([]);
  const { allCartData } = useSelector(
    (state: { table: RootState }) => state.table
  );

  useEffect(() => {
    setCurrentCartData(
      allCartData.filter((val) => val.tableSessionId == tableSessionId)
    );
  }, [allCartData]);
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

  const handleOnCloseClick = () => {
    setOpen(false);
  };
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
                  {!!currentCartData.length ? (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-1 text-xs font-semibold leading-none bg-red-500 text-white rounded-full">
                      {currentCartData.length}
                    </span>
                  ) : (
                    ""
                  )}

                  <ShoppingBag className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </SheetTrigger>
        <SheetContent className="w-full" {...handlers}>
          <CurrentOrderContentComponent
            tableSessionId={tableSessionId}
            cart={currentCartData}
            onCloseClick={handleOnCloseClick}
          />
        </SheetContent>
      </Sheet>
    </>
  );
}

export const CustomizationPresentComp = ({
  menu,
  tableSessionId,
  canAdd = true,
}: any) => {
  const [cartData, setCartData] = useState<any>([]);
  const { allCartData, allEmployees } = useSelector(
    (state: { table: RootState }) => state.table
  );
  const [totalAmount, setTotalAmount] = useState<any>(0);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    setCartData(allCartData);
  }, [allCartData]);
  const handleMinusClick = (e: any, cartItem: any, index: any) => {
    e.preventDefault();
    e.stopPropagation();
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

  const handleAddClick = (e: any, cartItem: any, index: any) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      let localCartData = JSON.parse(JSON.stringify(cartData));
      const payload = { quantity: cartItem.quantity + 1, id: cartItem.id };
      dispatch(updateItemToCart(payload)).unwrap();
      localCartData[index].quantity = cartItem.quantity + 1;
      setCartData(localCartData);
    } catch (e) {}
  };

  const {
    open,
    setOpen,
    title,
    setTitle,
    setComponent,
    setDescription,
    setCompProps,
  } = useContext(DrawerContext);

  const handleNewCustomization = () => {
    setOpen(true);
    setTitle("Edit Item");
    setDescription(" ");
    setComponent("customizationComponent");
    setCompProps({ menu: menu, tableSessionId });
  };

  const handleUpdateCustomization = (cartId: number) => {
    setOpen(true);
    setTitle("Edit Item");
    setDescription(" ");
    setComponent("customizationComponent");
    setCompProps({ menu: menu, tableSessionId, cartId });
  };
  return (
    <>
      <>
        <CardContent className="grid gap-2.5 p-0 text-sm">
          <div className="flex flex-col gap-4">
            {cartData
              .filter((val: any) => val.menuItemId == menu.id)
              .map((item: any, index: number) => {
                return (
                  <div
                    onClick={() => handleUpdateCustomization(item.id)}
                    className="flex items-start gap-4 items-center cursor-pointer"
                  >
                    <div className="flex flex-col items-center ">
                      <VegIcon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{item.MenuItem.name}</div>
                      <div className="text-xm text-gray-500 dark:text-gray-400">
                        {item.CartItemCustomizations.map(
                          (data: any) => data.CustomizationChoice.name
                        ).join(", ")}
                      </div>
                    </div>

                    <div className="flex-col items-center space-x-4">
                      <div className="rounded-lg border bg-card h-6 flex items-center gap-1">
                        <Button
                          onClick={(e) => handleMinusClick(e, item, index)}
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
                          onClick={(e) => handleAddClick(e, item, index)}
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

            {canAdd && (
              <>
                <Separator className="my-2" />

                <Button
                  onClick={handleNewCustomization}
                  className="h-10 flex gap-3"
                >
                  Add new customization
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </>
    </>
  );
};

export const CustomizationComponent = ({
  menu,
  tableSessionId,
  cartId = null,
}: any) => {
  const [currentMenu, setCurrentMenu] = useState<any>([]);

  const { allTableSessions, allCartData } = useSelector(
    (state: { table: RootState }) => state.table
  );
  const { setOpen } = useContext(DrawerContext);
  const [selectedChoice, setSelectedChoice] = useState(new Set());
  const [quantity, setquantity] = useState(
    cartId ? allCartData?.find((val) => val.id == cartId)?.quantity : 1
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    let customizationIdCheckMap: any = {};
    let localTotal = 0;
    menu = JSON.parse(JSON.stringify(menu));
    if (cartId) {
      let cartData = allCartData?.find((val) => val.id == cartId);

      cartData.CartItemCustomizations.forEach((val: any) => {
        customizationIdCheckMap[val.customizationChoiceId] = true;
      });
    }
    menu.Customizations.forEach((item: any) => {
      item.CustomizationChoices.forEach((val: any) => {
        if (val.id in customizationIdCheckMap) {
          val.checked = true;
          localTotal += val.additionalPrice;
          selectedChoice.add(val.id);
        } else val.checked = false;
      });
    });

    menu.orderTotal = menu.price + localTotal;
    setCurrentMenu(JSON.parse(JSON.stringify(menu)));
  }, [menu]);

  const handleCheckBoxClick = (event: any, option: any, choicesData: any) => {
    let selectedData = choicesData.CustomizationChoices.filter(
      (val: any) => val.checked
    );
    if (selectedData.length >= choicesData.maxMultiSelect && event) {
      toast.info(`Max choices can be seleted is ${choicesData.maxMultiSelect}`);
      option.checked = false;
      return;
    }
    option.checked = event;
    if (option.checked) {
      currentMenu.orderTotal += option.additionalPrice;
      selectedChoice.add(option.id);
    } else {
      currentMenu.orderTotal -= option.additionalPrice;
      selectedChoice.delete(option.id);
    }
    setSelectedChoice(new Set(selectedChoice));
    setCurrentMenu(JSON.parse(JSON.stringify(currentMenu)));
  };

  const handleMinusQuatity = () => {
    if (quantity == 1) {
      setquantity(0);
      setOpen(false);
      cartId && dispatch(deleteItemToCart(cartId));
      return;
    }
    setquantity(quantity - 1);
  };
  const handleItemAddClick = () => {
    setquantity(quantity + 1);
  };

  const handleAddItemClick = async () => {
    if (cartId) {
      let customizationsToAdd: any = [];
      let customizationsToRemove: any = [];
      let cartCustomizationData = new Set();

      let cartData = allCartData?.find((val) => val.id == cartId);

      cartData.CartItemCustomizations.forEach((val: any) => {
        cartCustomizationData.add(val.customizationChoiceId);
      });

      currentMenu.Customizations.forEach((item: any) => {
        item.CustomizationChoices.forEach((val: any) => {
          if (
            selectedChoice.has(val.id) &&
            !cartCustomizationData.has(val.id)
          ) {
            customizationsToAdd.push(val.id);
          }
          if (
            !selectedChoice.has(val.id) &&
            cartCustomizationData.has(val.id)
          ) {
            customizationsToRemove.push(val.id);
          }
        });
      });

      let payload = {
        id: cartId,
        quantity: quantity,
        customizationsToAdd: customizationsToAdd,
        customizationsToRemove: customizationsToRemove,
      };
      try {
        await dispatch(updateItemToCart(payload)).unwrap();
      } catch (e) {}
      setOpen(false);
    } else {
      let payload = {
        customizations: Array.from(selectedChoice),
        quantity: quantity,
        menuItemId: menu.id,
        tableSessionId: tableSessionId,
      };
      dispatch(addItemToCart(payload));
      setOpen(false);
    }
  };
  return (
    <ScrollArea className=" max-h-screen">
      <>
        <CardContent className="p-0 mb-4 mt-3 text-sm gap-4 flex flex-col">
          <div>
            {currentMenu.Customizations?.map((item: any, index: number) => {
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
                                checked={options.checked}
                                onCheckedChange={(event) =>
                                  handleCheckBoxClick(event, options, item)
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
            <Button
              onClick={handleMinusQuatity}
              variant="ghost"
              size={"icon"}
              className="h-10"
            >
              <MinusIcon className="h-4 w-4 -translate-x-0.5" />
            </Button>

            <span className="text-sm font-semibold">{quantity}</span>

            <Button
              onClick={() => handleItemAddClick()}
              variant="ghost"
              size={"icon"}
              className={" h-10 "}
            >
              <PlusIcon className="h-4 w-4 -translate-x-0.5 " />
            </Button>
          </div>

          <Button
            size={"lg"}
            className="h-10 w-full"
            onClick={handleAddItemClick}
          >
            {cartId ? "Edit" : "Add"} Item - {currencyMap.get(menu.currency)}{" "}
            {currentMenu.orderTotal}
          </Button>
        </div>
      </>
    </ScrollArea>
  );
};

export function MenuAddButton({ menu, tableSessionId }: any) {
  const { allTableSessions, allCartData } = useSelector(
    (state: { table: RootState }) => state.table
  );

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
  const dispatch: AppDispatch = useDispatch();
  let sheetProps: any = {
    open: isOpen,
    onOpenChange: (data: any) => {
      setLocalOpen(data);
    },
  };

  useEffect(() => {
    setCount(
      allCartData
        ?.filter((val) => val.menuItemId == menu.id)
        .reduce((acc, val) => acc + val.quantity, 0) || 0
    );
  }, [allCartData]);

  const handlers = useSwipeable({
    onSwipedRight: (eventData: any) => {
      setLocalOpen(false);
    },
  });

  const handleAddClick = () => {
    if (menu?.Customizations?.length) {
      if (allCartData?.filter((val) => val.menuItemId == menu.id).length) {
        setOpen(true);
        setTitle("Apply previous customization");
        setDescription(" ");
        setComponent("customizationPresentComp");
        setCompProps({ menu: menu, tableSessionId });
      } else {
        setOpen(true);
        setTitle("Edit Item");
        setDescription(" ");
        setComponent("customizationComponent");
        setCompProps({ menu: menu, tableSessionId });
      }
    } else {
      setCount(count + 1);
      let payload: any = {
        customizations: [],
        quantity: count + 1,
        menuItemId: menu.id,
        tableSessionId: tableSessionId,
      };
      let cartData = allCartData.find((val) => val.menuItemId == menu.id);
      if (cartData) {
        payload = { quantity: count + 1, id: cartData.id };
        dispatch(updateItemToCart(payload));
      } else dispatch(addItemToCart(payload));
    }
  };

  const handleMinusClick = () => {
    let cartData: any = allCartData.filter((val) => val.menuItemId == menu.id);

    if (cartData.length > 1) {
      setOpen(true);
      setTitle("Double check the customization");
      setDescription(" ");
      setComponent("customizationPresentComp");
      setCompProps({ menu: menu, tableSessionId, canAdd: false });
      return;
    } else {
      cartData = cartData[0];
    }

    if (count == 1) {
      setCount(0);
      dispatch(deleteItemToCart(cartData.id));
    } else {
      setCount(count - 1);
      let payload = { quantity: count - 1, id: cartData.id };
      dispatch(updateItemToCart(payload));
    }
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
