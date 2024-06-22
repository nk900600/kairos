import { Ratio } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoBackButton } from "../common/goBackButton";
import { BreadcrumbComponent } from "../common/breadCrumbs";
import { AppDispatch } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { createTableSession } from "../../redux/actions";
import { RootState } from "../../redux/reducer";
import { EmptyPlaceholder } from "../common/emptyPlaceholder";
import { Badge } from "../../components/ui/badge";

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

  const handleTableClick = async (table: any) => {
    try {
      if (table.status !== "Occupied")
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
  const { alltables: tables, allTableSessions } = useSelector(
    (state: { table: RootState }) => state.table
  );

  const availbleTables = tables.filter(
    (val) => val.status == "Available" || val.status == "Occupied"
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

                {table.status == "Occupied" && (
                  <Badge variant={"secondary"} className="mt-2">
                    {" "}
                    {table.status}
                  </Badge>
                )}
              </div>
            );
          })}
        </div>

        {!availbleTables?.length && (
          <EmptyPlaceholder
            title="No Tables Available"
            description="Sorry, we are fully booked at the moment. Please check back later or try reserving for another time."
            buttonText=""
            type="table"
          ></EmptyPlaceholder>
        )}
      </div>
    </>
  );
}
