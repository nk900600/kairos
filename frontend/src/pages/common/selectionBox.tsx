import * as React from "react";
import { Calculator, Check, ChevronsUpDown } from "lucide-react";

import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";

import { SelectItem } from "../../components/ui/select";
import {
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "../../components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducer";

function sleep(ms: any) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export function SelectionBoxComponent({
  onSelection,
  current = { name: "Orders", id: "orders" },
}: any) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [currentData, setCurrentData] = React.useState<any>(current);
  const [data, setData] = React.useState([
    { name: "Orders", id: "order" },
    { name: "Tables", id: "table" },
  ]);
  const [position, setPosition] = React.useState("");

  React.useEffect(() => {
    setCurrentData(current);
    setPosition(current.id);
  }, [current]);

  const handleChange = (e: any) => {
    console.log(e);
    setCurrentData(e);
    onSelection(e);
  };
  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            className=" justify-between px-2 outline-none ring-0 focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0"
          >
            <div className="flex gap-4 items-center text-primary">
              <h3 className="text-xl font-semibold leading-none tracking-tight">
                {currentData?.name}
              </h3>
            </div>

            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            {data.map((firm: any) => {
              return (
                <>
                  <DropdownMenuRadioItem
                    value={firm.id}
                    className={`bg-gray/10`}
                    onClick={() => handleChange(firm)}
                  >
                    <div className="flex gap-4 items-center text-primary">
                      <span className=" ">{firm.name}</span>
                    </div>
                  </DropdownMenuRadioItem>
                </>
              );
            })}
          </DropdownMenuRadioGroup>
          {/* {AllDesgination.map((data, i) => {
            return (
              <DropdownMenuCheckboxItem>{data.value}</DropdownMenuCheckboxItem>
            );
          })} */}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
