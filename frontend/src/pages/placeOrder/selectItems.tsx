import { ArrowLeft, ArrowRight, Ratio } from "lucide-react";
import { Progress } from "../../components/ui/progress";
import { Button } from "../../components/ui/button";
import { useEffect, useState } from "react";
import MenusComponent from "../menus";
import { useNavigate, useParams } from "react-router-dom";
import { GoBackButton } from "../common/goBackButton";
import { BreadcrumbComponent } from "../common/breadCrumbs";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducer";

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
  const { allTableSessions } = useSelector(
    (state: { table: RootState }) => state.table
  );
  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };
  const { tableId } = useParams();
  useEffect(() => {
    if (allTableSessions && !!allTableSessions.length) {
      let id = allTableSessions.filter(
        (val) => val.tableId == tableId && val.status == "Active"
      );
      if (id.length == 0) {
        navigate("/dashboard");
      }
    }
  }, [allTableSessions]);

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
