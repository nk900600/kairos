import React, { useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../components/ui/drawer";
import { Pencil, Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import { useMediaQuery } from "../hooks/mediaQuery";
import { ManageReservation, ManageTable } from "../pages/tables";
import DrawerContext from "../context/drawerContext";
import { ManageEmployees } from "../pages/contacts";
import { ManageLeave, ManageLeaveType } from "../pages/leaves";
import {
  CustomizationComponent,
  CustomizationPresentComp,
} from "../pages/menus";
import { ScrollArea } from "../components/ui/scroll-area";
import { ManageMenu } from "../pages/modals/manageMenu";
import { ManageMenuDiscount } from "../pages/modals/manageMenuDiscount";
import ManageCustomization from "../pages/modals/manageCustomization";

export function DrawerDialogComponent({
  triggerButton,
  isFooter = true,
  children,
}: any) {
  const componentMap: any = {
    manageTable: ManageTable,
    manageEmployee: ManageEmployees,
    manageReservation: ManageReservation,
    manageLeaveType: ManageLeaveType,
    manageLeave: ManageLeave,
    customizationComponent: CustomizationComponent,
    customizationPresentComp: CustomizationPresentComp,
    manageMenu: ManageMenu,
    manageMenuDiscount: ManageMenuDiscount,
    manageCustomization: ManageCustomization,
  };
  const { open, setOpen, component, compProps, title, description }: any =
    useContext(DrawerContext);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const DynamicComponent = () => {
    const Component = componentMap[component];
    return <Component {...compProps} />;
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{triggerButton}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px] ">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {/* <ManageTable {...compProps} /> */}
          {DynamicComponent()}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{triggerButton}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <div className="px-4"> {DynamicComponent()}</div>
        {isFooter && (
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}
