import {
  ArrowLeft,
  CirclePlus,
  CircleUser,
  Filter,
  ListFilter,
  Pencil,
  Plus,
  Search,
  Trash2,
  Users,
  icons,
} from "lucide-react";

import { Button } from "../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "..//components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { useState, useEffect } from "react";

import * as React from "react";

import { cn } from "../lib/utils";

import { Label } from "../components/ui/label";

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
import { DrawerDialogComponent } from "../common/drawerDialog";
import { GoBackButton } from "./common/goBackButton";
import { BreadcrumbComponent } from "./common/breadCrumbs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import {
  addEmployee,
  deleteEmployees,
  fetchAllEmployees,
  fetchDesgination,
  updateEmployees,
} from "../redux/actions";
import { RootState } from "../redux/reducer";
import DrawerContext from "../context/drawerContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { toast } from "sonner";
import { RoleEnum } from "../util/role";
import { EmptyPlaceholder } from "./common/emptyPlaceholder";

const AllDesgination = [
  {
    id: 0,
    value: "Show all",
    isChecked: true,
  },
  {
    id: 1,
    value: "Chef",
    isChecked: false,
  },
  {
    id: 2,
    value: "Waiter",
    isChecked: false,
  },
  {
    id: 3,
    value: "Manager",
    isChecked: false,
  },
];

const AllEmployees = [
  {
    employee: "John Doe",
    designation: "Chef",
  },
  {
    employee: "Jane Smith",
    designation: "Sous Chef",
  },
  {
    employee: "Emily Johnson",
    designation: "Pastry Chef",
  },
  {
    employee: "Michael Brown",
    designation: "Line Cook",
  },
  {
    employee: "Sarah Davis",
    designation: "Prep Cook",
  },
  {
    employee: "David Wilson",
    designation: "Kitchen Assistant",
  },
  {
    employee: "Linda Martinez",
    designation: "Dishwasher",
  },
  {
    employee: "James Rodriguez",
    designation: "Restaurant Manager",
  },
  {
    employee: "Jessica Garcia",
    designation: "Assistant Manager",
  },
  {
    employee: "William Hernandez",
    designation: "Waiter",
  },
];

export default function ContactsComponent() {
  const { allEmployees, allDesgination, isAdmin } = useSelector(
    (state: { table: RootState }) => state.table
  );
  const {
    open,
    setOpen,
    title,
    setTitle,
    setComponent,
    setDescription,
    setCompProps,
  } = React.useContext(DrawerContext);
  const [allEmployeesCopy, setAllEmployeesCopy] = useState(allEmployees);
  const [allDesginationCopy, setAllDesginationCopy] = useState(allDesgination);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllEmployees());
    dispatch(fetchDesgination());
  }, [dispatch]);
  useEffect(() => {
    setAllEmployeesCopy(allEmployees);
  }, [allEmployees]);
  useEffect(() => {
    let data = JSON.parse(JSON.stringify(allDesgination)).map((data: any) => ({
      ...data,
      checked: false,
    }));
    setAllDesginationCopy([{ title: "Show all", checked: true }, ...data]);
  }, [allDesgination]);

  const handleOnCheck = (isChecked: any, data: any, index: number): any => {
    if (index != 0) {
      allDesginationCopy[0].checked = false;
    }
    if (index == 0) {
      allDesginationCopy.forEach((data) => {
        data.checked = false;
      });
      allDesginationCopy[0].checked = true;
      setAllDesginationCopy(JSON.parse(JSON.stringify(allDesginationCopy)));
      setAllEmployeesCopy(allEmployees);
      return;
    }

    allDesginationCopy[index].checked = isChecked;
    setAllDesginationCopy(JSON.parse(JSON.stringify(allDesginationCopy)));
    filterEmployeeData(
      allDesginationCopy.filter((val) => val.checked).map((val) => val.id)
    );
  };

  const filterEmployeeData = (designations: any) => {
    // allDesgination.length == designations.lengtn;
    let newData = allEmployees.filter((val) =>
      designations.includes(val.designationId)
    );
    setAllEmployeesCopy(newData);
  };

  const handleSearchChange = (e: any) => {
    let newData = allEmployees.filter(
      (val) =>
        val.firstName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        val.lastName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setAllEmployeesCopy(newData);
  };

  const handleEditClick = (employee: any) => {
    setOpen(true);
    setTitle("Edit Employee");
    setDescription("Edit your profile here. Click save when you're done");
    setComponent("manageEmployee");
    setCompProps({ employeeData: employee });
  };
  const handleAddClick = () => {
    setOpen(true);
    setTitle("Add Employee");
    setDescription("Create new profile here. Click save when you're done");
    setComponent("manageEmployee");
  };
  return (
    <>
      {" "}
      <BreadcrumbComponent
        list={[
          { link: "/", label: "Dashboard" },
          { link: "/employees", label: "All Employees" },
        ]}
      />
      <div className="flex items-center gap-4">
        <GoBackButton />
        <h1 className="flex-1  whitespace-nowrap text-lg sm:text-2xl  font-semibold tracking-tight ">
          All Employees
        </h1>
        <div className="flex items-center gap-3">
          {/* Commenting for now */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 h-8 ">
                <ListFilter className="h-4 w-4" />
                <span className="hidden sm:block">
                  Filters(
                  {
                    allDesginationCopy
                      .filter((val) => val.checked)
                      .map((val) => val.id).length
                  }
                  )
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Desigination</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {allDesginationCopy.map((data, i) => {
                return (
                  <DropdownMenuCheckboxItem
                    checked={data?.checked}
                    onCheckedChange={(e) => handleOnCheck(e, data, i)}
                  >
                    {data.title}
                  </DropdownMenuCheckboxItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          {isAdmin && (
            <Button
              onClick={handleAddClick}
              variant="default"
              className="gap-2 h-8 "
            >
              <CirclePlus className="h-4 w-4" />
              <span className="hidden sm:block">Add new</span>
            </Button>
          )}
        </div>
      </div>
      <Card>
        <CardHeader>
          <div className="flex h-14 items-center gap-2  lg:h-[60px] lg:gap-4">
            <div className="w-full flex-1">
              <form>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search Contacts..."
                    className="w-full appearance-none bg-background pl-8 shadow-none "
                    onChange={handleSearchChange}
                  />
                </div>
              </form>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-8">
          {allEmployeesCopy.map((employee) => {
            return (
              <div className="flex items-center gap-4  ">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src={employee?.userPic} alt="Avatar" />
                  <AvatarFallback
                    style={{
                      background: employee?.userPic,
                    }}
                  ></AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    {employee.firstName} {employee.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {employee?.Designation
                      ? employee?.Designation?.title
                      : allDesgination?.find(
                          (val) => val.id == employee?.designationId
                        )?.title}
                  </p>
                </div>
                {isAdmin && (
                  <div className="ml-auto font-medium gap-4">
                    <div className=" cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 w-9 px-0">
                      <div
                        onClick={() => handleEditClick(employee)}
                        className=" cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 w-9 px-0"
                      >
                        <Pencil className="h-3 w-3" />
                      </div>
                    </div>
                    <AlertDialogDemo employeeId={employee.id}></AlertDialogDemo>
                  </div>
                )}
              </div>
            );
          })}

          {!allEmployeesCopy.length && allEmployees.length && (
            <EmptyPlaceholder
              title="No Employees found with selected filter"
              buttonText=""
              description=""
            ></EmptyPlaceholder>
          )}
        </CardContent>
      </Card>
    </>
  );
}

export function AlertDialogDemo({ employeeId }: any) {
  const dispatch: AppDispatch = useDispatch();
  const handleEmployeeDelete = () => {
    dispatch(deleteEmployees(employeeId));
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {/* <Button variant="outline">Show Dialog</Button> */}
        <div className=" cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 w-9 px-0">
          <Trash2 className="h-3 w-3" />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleEmployeeDelete}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// Define the form validation schema using Zod
const addEmployeeSchema = z.object({
  firstName: z
    .string()
    .regex(/^[A-Za-z\s]*$/, "Please enter a valid Name")
    .min(1, "First Name is required.")
    .max(50, "Character lkmit exceeded"),
  lastName: z
    .string()
    .regex(/^[A-Za-z\s]*$/, "Please enter a valid Name")
    .min(1, "Last Name is required.")
    .max(50, "Character lkmit exceeded"),
  mobileNumber: z
    .number()
    .min(1111111111, "Seat capacity must be at least 1.")
    .max(9999999999, "Please Enter number less than 30"),
  desgination: z.string().nonempty("Designation is required."),
  manager: z.string().nonempty("Manager is required."),
});

export const ManageEmployees = ({ employeeData = {} }: any) => {
  const { setOpen }: any = React.useContext(DrawerContext);
  const { allDesgination, allEmployees } = useSelector(
    (state: { table: RootState }) => state.table
  );
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(addEmployeeSchema),
    defaultValues: {
      firstName: employeeData?.firstName || "",
      lastName: employeeData?.lastName || "",
      mobileNumber: Number(employeeData?.mobileNumber) || "",
      desgination: employeeData?.designationId
        ? allDesgination.find((val) => val.id == employeeData?.designationId)
            ?.title
        : "",
      manager: employeeData?.managerId
        ? allEmployees.find((val) => val.id == employeeData?.managerId)
            .firstName +
          " " +
          allEmployees.find((val) => val.id == employeeData?.managerId).lastName
        : "",
    },
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      //TODO: remove static firmId value
      let idData = {
        role: 3,
        designation: allDesgination.find((val) => val.title == data.desgination)
          ?.id,
        managerId: allEmployees.find(
          (item) => item.firstName + " " + item.lastName == data.manager
        )?.id,
      };
      data = { ...data, ...idData };

      // Dispatch the addTable action and wait for it to complete
      if (employeeData?.id) {
        data.id = employeeData.id;
        data.role = employeeData.roleId;
        await dispatch(updateEmployees(data)).unwrap();
      } else {
        await dispatch(addEmployee(data)).unwrap();
      }
      setOpen(false);
    } catch (error) {
      toast.error(
        "Something went wrong while adding or updating the employee "
      );
    }
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel htmlFor="firstName">First Name</FormLabel>
                <FormControl>
                  <Input id="firstName" placeholder="Joe" {...field} />
                </FormControl>
                {fieldState.error && (
                  <FormMessage>{fieldState.error.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                <FormControl>
                  <Input id="lastName" placeholder="Rogan" {...field} />
                </FormControl>
                {fieldState.error && (
                  <FormMessage>{fieldState.error.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="mobileNumber"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="mobileNumber">Mobile Number</FormLabel>
              <FormControl>
                <Input
                  id="mobileNumber"
                  type="number"
                  placeholder="1234567890"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              {fieldState.error && (
                <FormMessage>{fieldState.error.message}</FormMessage>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="desgination"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="desgination">Designation</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a employee desgination" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {allDesgination.map((item) => {
                    return (
                      <SelectItem value={item.title}>{item.title}</SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="manager"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="desgination">Manager</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a manager" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {allEmployees
                    // .filter((val) =>
                    //   !!employeeData?.managerId
                    //     ? val.id != employeeData?.id
                    //     : true
                    // )
                    .map((item) => {
                      return (
                        <SelectItem
                          value={item.firstName + " " + item.lastName}
                        >
                          {item.firstName + " " + item.lastName}
                        </SelectItem>
                      );
                    })}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <Button loading={isLoading} type="submit">
          {employeeData?.id ? "Update Employee" : "Add Employee"}
        </Button>
      </form>
    </Form>
  );
};
