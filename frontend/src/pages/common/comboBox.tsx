import * as React from "react";
import { Calculator, Check, ChevronsUpDown } from "lucide-react";

import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
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
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducer";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";

export function ComboBoxComponent() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const { myAccount } = useSelector(
    (state: { table: RootState }) => state.table
  );
  const [position, setPosition] = React.useState("top");
  React.useEffect(() => {}, []);
  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            className=" justify-between px-2"
          >
            <div className="flex gap-4 items-center text-primary">
              <Avatar className="h-7 w-7 border ">
                <AvatarImage
                  alt="User avatar"
                  src={myAccount?.employee?.Firm?.image}
                />
                <AvatarFallback className="uppercase ">
                  {myAccount?.employee?.Firm.name}
                </AvatarFallback>
              </Avatar>

              {/* </Button> */}
              <span className=" "> {myAccount?.employee?.Firm.name}</span>
            </div>

            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel>My shops</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem value="top">
              <div className="flex gap-4 items-center text-primary">
                <Avatar className="h-7 w-7 border ">
                  <AvatarImage
                    alt="User avatar"
                    src={myAccount?.employee?.Firm?.image}
                  />
                </Avatar>

                {/* </Button> */}
                <span className=" "> {myAccount?.employee?.Firm.name}</span>
              </div>
            </DropdownMenuRadioItem>
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