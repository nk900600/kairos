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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducer";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { AppDispatch } from "../../redux/store";
import {
  getNewToken,
  updateLoader,
  fetchAllEmployees,
  fetchAllMenuCategories,
  fetchAllMenus,
  fetchAllOrders,
  fetchAllTableSession,
  fetchMyAccount,
  fetchTables,
  getAllFirmByNumber,
  logout,
} from "../../redux/actions";
function sleep(ms: any) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export function ComboBoxComponent() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [currentFirm, setCurrentFirm] = React.useState<any>({});

  const { myAccount, myFirms, isAdmin } = useSelector(
    (state: { table: RootState }) => state.table
  );
  const [position, setPosition] = React.useState("");
  React.useEffect(() => {
    if (myAccount) {
      setPosition(myAccount?.employee?.Firm?.id);
      setCurrentFirm(myAccount?.employee?.Firm);
    }
  }, [myAccount]);
  const dispatch: AppDispatch = useDispatch();

  const handleChangeFirm = async (firm: any) => {
    console.log(firm);

    await dispatch(updateLoader(true)).unwrap();

    dispatch(getNewToken(firm.id))
      .unwrap()
      .then(async () => {
        // await sleep(2000);
        await dispatch(fetchMyAccount());

        Promise.all([
          dispatch(fetchAllEmployees()).unwrap(),
          dispatch(fetchTables()).unwrap(),
          dispatch(fetchAllTableSession()).unwrap(),
          dispatch(fetchAllOrders()).unwrap(),
          dispatch(fetchAllMenus()).unwrap(),
          dispatch(fetchAllMenuCategories()).unwrap(),
          dispatch(getAllFirmByNumber()).unwrap(),
        ])
          .then(() => {
            dispatch(updateLoader(false));
            setPosition(firm.id);
            setCurrentFirm(firm);
          })
          .catch((error) => {
            console.error("Error fetching data: ", error);
            dispatch(updateLoader(false));
          });
      });
  };
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
                <AvatarImage alt="User avatar" src={currentFirm?.image} />
                <AvatarFallback
                  className="uppercase "
                  style={{ background: currentFirm?.image }}
                ></AvatarFallback>
              </Avatar>

              {/* </Button> */}
              <span className=" "> {currentFirm?.name}</span>
            </div>

            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel>Switch between my shops</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            {myFirms
              .filter((val: any) => (isAdmin ? true : position == val.id))
              .map((firm: any) => {
                return (
                  <>
                    <DropdownMenuRadioItem
                      value={firm.id}
                      className={`bg-gray/10 ${
                        firm.id == position && "bg-muted/90"
                      }`}
                      onClick={() => handleChangeFirm(firm)}
                    >
                      <div className="flex gap-4 items-center text-primary">
                        <Avatar className="h-7 w-7 border ">
                          <AvatarImage alt="User avatar" src={firm?.image} />
                          <AvatarFallback
                            className="uppercase "
                            style={{ background: firm?.image }}
                          ></AvatarFallback>
                        </Avatar>

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
