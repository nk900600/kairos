import {
  ArrowLeft,
  CirclePlus,
  CircleUser,
  DownloadIcon,
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
  createBulkContact,
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import { Separator } from "../components/ui/separator";
import { processExcelData } from "../util/processExcelData";
import * as XLSX from "xlsx";
import { validateData } from "../util/validateExcelFromSchema";

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

  const handleEditClick = (e: any, employee: any) => {
    e.preventDefault();
    e.stopPropagation();
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
    setCompProps({ employeeData: {} });
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
              <Sheet>
                <SheetTrigger asChild>
                  <div className="flex items-center gap-4 cursor-pointer ">
                    {/* <Button variant={"ghost"}> */}
                    <Avatar className=" h-9 w-9 flex">
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
                        {
                          allDesgination?.find(
                            (val) => val.id == employee?.designationId
                          )?.title
                        }
                      </p>
                    </div>
                    {isAdmin && (
                      <div className="ml-auto font-medium gap-4">
                        <div className=" cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 w-9 px-0">
                          <div
                            onClick={(e: any) => handleEditClick(e, employee)}
                            className=" cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 w-9 px-0"
                          >
                            <Pencil className="h-3 w-3" />
                          </div>
                        </div>
                        <AlertDialogDemo
                          employeeId={employee.id}
                        ></AlertDialogDemo>
                      </div>
                    )}
                    {/* </Button> */}
                  </div>
                </SheetTrigger>
                <SheetContent className="w-full">
                  <ViewContact employee={employee}></ViewContact>
                </SheetContent>
              </Sheet>
              // </div>
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
  const [open, setOpen] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const handleEmployeeDelete = async (e: any) => {
    try {
      e.preventDefault();
      e.stopPropagation();
      await dispatch(deleteEmployees(employeeId)).unwrap();
      setOpen(false);
    } catch (e: any) {
      console.log(e);
    }
  };
  const handleEvent = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(true);
  };
  const handleCancel = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(false);
  };
  const handleChnage = (val: any) => {
    setOpen(val);
  };

  return (
    <AlertDialog open={open} onOpenChange={handleChnage}>
      <AlertDialogTrigger asChild>
        {/* <Button variant="outline">Show Dialog</Button> */}
        <div
          onClick={handleEvent}
          className=" cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 w-9 px-0"
        >
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
          <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
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
  const [currentStep, setCurrentStep] = useState(
    employeeData?.id ? "one" : "bulk"
  );

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
        ? allEmployees?.find((val) => val.id == employeeData?.managerId)
            ?.firstName +
          " " +
          allEmployees?.find((val) => val.id == employeeData?.managerId)?.lastName
        : employeeData?.Role?.name == "Admin"
        ? employeeData?.firstName + " " + employeeData?.lastName
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

  const handleCurrentStepClick = (step: any) => {
    setCurrentStep(step);
  };

  return (
    <>
      {currentStep == "bulk" && (
        <BulkCreationContact
          success={() => setOpen(false)}
          currentStepClick={handleCurrentStepClick}
        />
      )}

      {currentStep == "one" && (
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a employee desgination" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {allDesgination.map((item) => {
                        return (
                          <SelectItem value={item.title}>
                            {item.title}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {employeeData?.Role?.name !== "Admin" && (
              <FormField
                control={form.control}
                name="manager"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel htmlFor="desgination">Manager</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
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
            )}
            <div className="flex gap-4">
                <Button
                  variant={"secondary"}
                  onClick={() => setCurrentStep("bulk")}
                >
                  Back
                </Button>
              <Button loading={isLoading} type="submit" className="w-full">
                {employeeData?.id ? "Update Employee" : "Add Employee"}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </>
  );
};

const addEmployeeBulkSchema = z.object({
  "First Name": z
    .string()
    .regex(/^[A-Za-z\s]*$/, "Please enter a valid Name")
    .min(1, "First Name is required.")
    .max(50, "Character lkmit exceeded"),
  "Last Name": z
    .string()
    .regex(/^[A-Za-z\s]*$/, "Please enter a valid Name")
    .min(1, "Last Name is required.")
    .max(50, "Character lkmit exceeded"),
  "Manager First Name": z
    .string()
    .regex(/^[A-Za-z\s]*$/, "Please enter a valid Name")
    .min(1, "First Name is required.")
    .max(50, "Character lkmit exceeded")
    .optional(),
  "Manager Last Name": z
    .string()
    .regex(/^[A-Za-z\s]*$/, "Please enter a valid Name")
    .min(1, "Last Name is required.")
    .max(50, "Character lkmit exceeded")
    .optional(),
  "Mobile Number": z
    .number()
    .min(1111111111, "Not a valid mobile number.")
    .max(9999999999, "Not a valid mobile number"),
  Designation: z.string().nonempty("Designation is required."),
});

export const BulkCreationContact = ({ currentStepClick, success }: any) => {
  const [excelErrors, setExcelError] = useState<any>([]);
  const [excelData, setExcelData] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
  const dispatch: AppDispatch = useDispatch();
  const handleExcelDownload = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const url =
      "https://kairos-public-images.s3.eu-north-1.amazonaws.com/bulk_creation_template/Sample_Contact_Template.xlsx";
    const link = document.createElement("a");
    link.href = url;
    link.download = "Sample_Menu_Template.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileChange = async (e: any) => {
    setExcelError(null);
    setExcelData(null);
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[1];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const validationErrors = validateData(jsonData, addEmployeeBulkSchema);
        if (validationErrors.length > 0) {
          validationErrors.forEach((row: any) => {
            row.errors.forEach((e: any) => {
              toast.error(
                `Excel error: Row ${row.row}, Col name:${e.path}, error:${e.message}`
              );
            });
          });
          setExcelError(validationErrors);
        } else {
          setExcelData(jsonData);
        }
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const handleExcelUpload = async () => {
    if (excelErrors && excelErrors.length > 0) {
      excelErrors.forEach((row: any) => {
        row.errors.forEach((e: any) => {
          toast.error(
            `Excel error: Row ${row.row}, Col name:${e.path}, error:${e.message}`
          );
        });
      });
      return;
    }
    if (excelData.length == 0) {
      toast.error(`No Employee Data found`);
      return;
    }
    try {
      setLoading(true);
      let payload = excelData.map((contact: any) => ({
        firstName: contact["First Name"],
        lastName: contact["Last Name"],
        mobileNumber: contact["Mobile Number"],
        desginationName: contact["Designation"],
        role: 3,
        managerFirstName: contact["Manager First Name"],
        managerLastName: contact["Manager Last Name"],
      }));

      await dispatch(createBulkContact(payload)).unwrap();
      setLoading(false);
      success();
    } catch (e) {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="grid gap-4">
        <div className="grid gap-1">
          {/* <FormLabel>Bulk Upload</FormLabel> */}
          <Label htmlFor="file-upload">Bulk Upload</Label>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Upload an Excel file to create multiple contacts at once.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Input
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            accept=".xlsx, .xls, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          />
          <Button onClick={handleExcelUpload} loading={loading}>
            Upload
          </Button>
        </div>

        <div
          onClick={(e) => handleExcelDownload(e)}
          className="flex gap-2 bg-blue-100 items-center justify-between cursor-pointer  rounded-lg border p-3 shadow-sm"
        >
          {/* <FormLabel>Bulk Upload</FormLabel> */}
          <div className="grid gap-1 ">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Download an Sample Excel file
            </p>
          </div>

          <DownloadIcon className="w-4 h-4"></DownloadIcon>
        </div>
      </div>

      <Separator orientation="horizontal" />
      <div className="grid gap-4">
        <div className="grid gap-1">
          <Label htmlFor="create-item">Create Single Contact</Label>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Click the button to create a new item.
          </p>
        </div>
        <Button id="create-item" onClick={() => currentStepClick("one")}>
          Add Single Contact
        </Button>
      </div>
    </>
  );
};

export function ViewContact({ employee = {} }: any) {
  const { allDesgination } = useSelector(
    (state: { table: RootState }) => state.table
  );
  return (
    <>
      <SheetHeader className="mb-4">
        <SheetTitle className="flex items-center gap-3">
          <span className="sr-only">The shop busniess inc</span>
          <h1 className="font-semibold text-base">Employee Details</h1>
        </SheetTitle>
        <Separator className="my-2" />
      </SheetHeader>
      <CardContent className="w-full  p-0  dark:bg-gray-950">
        <div className="flex w-full justify-center ">
          <Avatar className="h-40 w-40 border ">
            <AvatarImage alt="User avatar" src={employee?.userPic} />
            <AvatarFallback
              className="uppercase"
              style={{
                background: employee?.userPic,
              }}
            ></AvatarFallback>
          </Avatar>
        </div>

        <div className="text-sm">
          <div className="flex items-center gap-4">
            <div className="flex  flex-col text-center w-full">
              <h3 className="text-xl font-semibold">
                {" "}
                {employee.firstName + " " + employee.lastName}{" "}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {
                  allDesgination?.find(
                    (val) => val.id == employee?.designationId
                  )?.title
                }
              </p>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="grid gap-3">
            <div className="font-semibold">Contact Information</div>
            <dl className="grid gap-3">
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Email</dt>
                <dd> {employee.email}</dd>
              </div>

              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">phone</dt>
                <dd>
                  <a href="tel:"> {employee.mobileNumber}</a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </CardContent>
    </>
  );
}
