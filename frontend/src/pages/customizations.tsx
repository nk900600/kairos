import { CirclePlus, Pencil, Salad, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { BreadcrumbComponent } from "./common/breadCrumbs";
import { GoBackButton } from "./common/goBackButton";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reducer";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "../components/ui/table";
import { AppDispatch } from "../redux/store";
import EmptyPlaceholder from "./common/emptyPlaceholder";

export const CustomizationPage = () => {
  const { allMenu, allMenuCategories } = useSelector(
    (state: { table: RootState }) => state.table
  );
  let { id } = useParams();

  const [currentMenu, setCurrentMenu] = useState<any>({});

  useEffect(() => {
    let mm = allMenu.find((menu) => menu.id == id);
    setCurrentMenu(mm);
  }, [allMenu]);

  const navigate = useNavigate();
  const handleAddClick = () => {};
  const handleButtonClick = () => {
    console.log("Dc");
  };

  return (
    <>
      <BreadcrumbComponent
        list={[
          { link: "/", label: "Dashboard" },
          { link: "/menus", label: "Menu" },
          { link: "/menu/" + 26 + "/customization", label: "Customizations" },
        ]}
      />
      <div className="flex items-center gap-4">
        <GoBackButton />
        <h1 className="flex-1 whitespace-nowrap text-2xl font-semibold  ">
          <p className="truncate w-[200px] sm:w-full">{currentMenu?.name}</p>
        </h1>

        <Button onClick={handleAddClick} className=" h-8  gap-2">
          <CirclePlus className="h-4 w-4" />
          <span className="hidden sm:block">Add Customization</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2  gap-4 sm:gap-6 ">
        {currentMenu &&
          currentMenu?.Customizations &&
          currentMenu?.Customizations?.map((menu: any) => {
            return (
              <Card aria-disabled={menu.available} className={"w-full  "}>
                <CardHeader className="p-3 lg:p-4 md:p-4  ">
                  <div className="flex items-start gap-4 items-center">
                    <div className="flex flex-col items-center ">
                      <Salad className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-base flex-1 text-md sm:text-base">
                        {menu.name}
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
                      <div className="flex gap-2">
                        <Button
                          onClick={() => {}}
                          variant="ghost"
                          size="icon"
                          className="gap-2"
                        >
                          <Pencil className="h-4 w-4 " />
                        </Button>

                        <AlertDialogDelete />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-3 pt-0 lg:p-4 md:p-4 lg:pt-0 md:pt-0 ">
                  <div className="border rounded-lg ">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Price INR</TableHead>
                          <TableHead>Diet</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Cheese Topping</TableCell>
                          <TableCell>$1.99</TableCell>
                          <TableCell>Vegetarian</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Gluten-Free Bun</TableCell>

                          <TableCell>$2.49</TableCell>
                          <TableCell>Gluten-Free</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Vegan Patty</TableCell>
                          <TableCell>$3.99</TableCell>
                          <TableCell>Vegan</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            );
          })}
      </div>
      {!currentMenu?.Customizations && (
        <EmptyPlaceholder onButtonClick={handleButtonClick}></EmptyPlaceholder>
      )}
    </>
  );
};

export function AlertDialogDelete({ leaveType }: any) {
  const dispatch: AppDispatch = useDispatch();
  const handleLeaveTypeDelete = () => {
    // dispatch(DeleteLeaveTypes(leaveType.id));
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className=" cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 w-9 px-0">
          <Trash2 className="h-4 w-4 " />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will delete your Leave Policy.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLeaveTypeDelete}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}