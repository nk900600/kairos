import { ArrowLeft, ArrowRight, Ratio } from "lucide-react";
import { Progress } from "../../components/ui/progress";
import { Button } from "../../components/ui/button";
import { useEffect, useState } from "react";
import MenusComponent from "../menus";
import { useNavigate } from "react-router-dom";
import { GoBackButton } from "../common/goBackButton";
import { BreadcrumbComponent } from "../common/breadCrumbs";
import { AppDispatch } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  createTableSession,
  fetchAllTableSession,
  fetchTables,
} from "../../redux/actions";
import { RootState } from "../../redux/reducer";
import EmptyPlaceholder from "../common/emptyPlaceholder";

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
export default function SelectTableComponent({ step = "table" }) {
  const [currentStep, setCurrentStep] = useState("table");
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleTableClick = async (table: any) => {
    try {
      await dispatch(
        createTableSession({
          startTime: Date.now(),
          customerName: "",
          customerMobile: 0,
          tableId: table.id,
        })
      ).unwrap();
    } catch (e) {
      return;
    }

    setCurrentStep("menu");
    navigate("/place-order/table/" + table.id);
  };

  return (
    <>
      <BreadcrumbComponent
        list={[
          { link: "/", label: "Dashboard" },
          { link: "/place-order", label: "Table" },
        ]}
      />
      <div key="1" className="flex items-center space-x-4">
        <div className="w-full">
          <div className="space-y-2 ">
            <div className="flex items-center gap-4">
              <GoBackButton />
              <h1 className="flex-1  whitespace-nowrap text-lg sm:text-2xl font-semibold tracking-tight ">
                {header["table"].title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <TableComponent handleTableClick={handleTableClick}></TableComponent>
    </>
  );
}

export function TableComponent({ handleTableClick }: any) {
  const [currentStep, setCurrentStep] = useState("table");

  const { alltables: tables, allTableSessions } = useSelector(
    (state: { table: RootState }) => state.table
  );

  const availbleTables = tables
    .filter((val) => val.status == "Available")
    .filter(
      (val) => !allTableSessions.map((tab) => tab.tableId).includes(val.id)
    );

  return (
    <>
      {" "}
      <div className="">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 ">
          {availbleTables?.map((table: any) => {
            return (
              <div
                onClick={() => handleTableClick(table)}
                className="flex w-full cursor-pointer flex-col items-center rounded-xl border bg-card p-6 text-card-foreground shadow transition-colors hover:bg-muted/50 sm:p-10"
              >
                <Ratio className="h-10 w-10"></Ratio>
                <p className="font-medium mt-2"> {table.tableName}</p>
                <p className="text-xs mt-1">Seats {table?.capacity}</p>
              </div>
            );
          })}
        </div>

        {!availbleTables?.length && (
          <EmptyPlaceholder
            title="No Tables Available"
            description="Sorry, we are fully booked at the moment. Please check back later or try reserving for another time."
            buttonText=""
            image="./closed_stores.gif"
          ></EmptyPlaceholder>
        )}
      </div>
    </>
  );
}
