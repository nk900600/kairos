import { ArrowLeft, ArrowRight, Ratio } from "lucide-react";
import { Progress } from "../../components/ui/progress";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import MenusComponent from "../menus";
import { useNavigate } from "react-router-dom";
import { GoBackButton } from "../common/goBackButton";
import { BreadcrumbComponent } from "../common/breadCrumbs";
const tables = [1, 2, 3];

const header: any = {
  table: {
    title: "Select Table",
    description: "All avaibale tables are listed below",
  },
  menu: {
    title: "Select Menu",
    description: "All Menu are listed below",
  },
};
export default function SelectItemsComponent({}) {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <>
      <BreadcrumbComponent
        list={[
          { link: "/", label: "Dashboard" },
          { link: "/place-order", label: "Table" },
          { link: "/place-order/table/:id", label: "Menu" },
        ]}
      />
      <div key="1" className="flex items-center space-x-4">
        <div className="w-full">
          <div className="space-y-2 ">
            <div className="flex items-center gap-4">
              <GoBackButton link={"/place-order"} />
              <h1 className="flex-1  whitespace-nowrap text-lg sm:text-2xl  font-semibold tracking-tight ">
                {header["menu"].title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <MenusComponent canPlaceOrder={true}></MenusComponent>
    </>
  );
}
