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
    title: "Table",
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

  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleTableClick = (table: any) => {
    console.log(table);
    setCurrentStep("menu");
    navigate("/place-order/table/1");
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
              <h1 className="flex-1  whitespace-nowrap text-lg font-semibold tracking-tight ">
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

  return (
    <>
      {" "}
      <div className="">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 ">
          {tables.map((tables) => {
            return (
              <div
                onClick={() => handleTableClick(tables)}
                className="flex w-full cursor-pointer flex-col items-center rounded-xl border bg-card p-6 text-card-foreground shadow transition-colors hover:bg-muted/50 sm:p-10"
              >
                <Ratio className="h-10 w-10"></Ratio>
                <p className="font-medium mt-2">Table 3</p>
                <p className="text-xs mt-1">Seats 4</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
