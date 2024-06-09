/**
 * v0 by Vercel.
 * @see https://v0.dev/t/WMAzkMGwrkQ
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */ import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { InputOTP } from "../../components/ui/input-otp";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { Checkbox } from "../../components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "../../components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Switch } from "../../components/ui/switch";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducer";
import { AppDispatch } from "../../redux/store";
import {
  createBulkMenu,
  createMenu,
  createMenuCategories,
  updateMenu,
} from "../../redux/actions";
import { useContext, useDebugValue, useEffect, useState } from "react";
import DrawerContext from "../../context/drawerContext";
import { Separator } from "../../components/ui/separator";
import { DownloadIcon } from "lucide-react";
import { CreatableSelectComponent } from "../common/createSelect";
import * as XLSX from "xlsx";
import { processExcelData } from "../../util/processExcelData";
import { validateData } from "../../util/validateExcelFromSchema";

const FormSchema = z.object({
  type: z.enum(["all", "mentions", "none"], {
    required_error: "You need to select a notification type.",
  }),
});

const menuItemSchema = z.object({
  name: z.string().min(1, "Name is Required"),
  description: z.string().min(1, "Description is Required"),
  price: z.number().min(1, "Price is Required"),
  category: z.object({ value: z.string(), label: z.string(), id: z.number() }),
  spiceLevel: z.string(),
  dietType: z.string(),
});

export function ManageMenu({ menu = {} }: any) {
  const { allMenu, allMenuCategories } = useSelector(
    (state: { table: RootState }) => state.table
  );
  const form = useForm({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      name: menu?.name || "",
      description: menu?.description || "",
      price: menu?.price || 0,
      category: menu?.categoryId
        ? allMenuCategories
            .map((val) => ({
              value: val.title,
              label: val.title,
              id: val.id,
            }))
            .find((val) => val.id == menu?.categoryId)
        : allMenuCategories.map((val) => ({
            value: val.title,
            label: val.title,
            id: val.id,
          }))[0],
      spiceLevel: menu?.spiceLevel || "Mild",
      dietType: menu?.dietType || "Vegetarian",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(menu?.id ? "one" : "bulk");
  const [isLoadingCat, setIsLoadingCat] = useState(false);
  const { setOpen }: any = useContext(DrawerContext);
  const dispatch: AppDispatch = useDispatch();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    console.log(data);

    try {
      // Dispatch the addTable action and wait for it to complete
      if (menu?.id) {
        data = {
          ...data,
          categoryId: allMenuCategories.find(
            (val) => val.title == data.category.value
          )?.id,
        };
        data.id = menu.id;
        await dispatch(updateMenu(data)).unwrap();
      } else {
        data = {
          ...data,
          categoryId: allMenuCategories.find(
            (val) => val.title == data.category.value
          )?.id,
        };

        await dispatch(createMenu(data)).unwrap();
      }
      setOpen(false);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleCurrentStepClick = (step: any) => {
    setCurrentStep(step);
  };

  const handleCreate = async (inputValue: any) => {
    try {
      setIsLoadingCat(true);
      await dispatch(createMenuCategories({ title: inputValue })).unwrap();
      setIsLoadingCat(false);
      form.setValue(
        "category",
        {
          value: inputValue,
          label: inputValue,
          id: 1234,
        },
        { shouldValidate: true }
      );
    } catch (e) {
      setIsLoadingCat(false);
    }
  };

  return (
    <>
      {currentStep == "bulk" && (
        <BulkCreationMenu
          success={() => setOpen(false)}
          currentStepClick={handleCurrentStepClick}
        />
      )}

      {currentStep == "one" && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      className="w-full rounded border px-2 py-1"
                      placeholder="Name of the dish"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="w-full rounded border px-2 py-1"
                      placeholder="Description of the dish"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        className="w-full rounded border px-2 py-1"
                        placeholder="Price in local currency"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>

                    <FormControl>
                      <CreatableSelectComponent
                        onChange={field.onChange}
                        // onChange={handleCreateData}
                        options={allMenuCategories.map((val) => ({
                          value: val.title,
                          label: val.title,
                          id: val.id,
                        }))}
                        onCreateOption={handleCreate}
                        isLoading={isLoadingCat}
                        value={field.value}
                        placeholder="Select"
                        defaultValue={field.value}
                      ></CreatableSelectComponent>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* <FormField
          control={form.control}
          name="available"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Available</FormLabel>
              <FormControl>
                <Switch
                  id="Available"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="spiceLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Spice Level</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        {["Mild", "Medium", "Spicy"].map((spice) => (
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              key={spice}
                              value={spice}
                              id={spice}
                            />
                            <Label
                              className="font-normal cursor-pointer"
                              htmlFor={spice}
                            >
                              {" "}
                              {spice}{" "}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dietType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Diet Type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        {["Vegetarian", "Non-Vegetarian", "Vegan"].map(
                          (spice) => (
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                key={spice}
                                value={spice}
                                id={spice}
                              />
                              <Label
                                className="font-normal cursor-pointer"
                                htmlFor={spice}
                              >
                                {" "}
                                {spice}{" "}
                              </Label>
                            </div>
                          )
                        )}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-4">
              <Button
                variant={"secondary"}
                onClick={() => setCurrentStep("bulk")}
              >
                Back
              </Button>
              <Button loading={isLoading} type="submit" className="w-full">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      )}
    </>
  );
}

const menuItemFileSchema = z.object({
  "Spice Level": z.enum(["Mild", "Spicy", "Low"]).optional(),
  "Diet Type": z.enum(["Vegetarian", "Non-Vegetarian", "Vegan"]).optional(),
  "Choice Diet Type": z
    .enum(["Vegetarian", "Non-Vegetarian", "Vegan"])
    .optional(),
});

export const BulkCreationMenu = ({ currentStepClick, success }: any) => {
  const [excelErrors, setExcelError] = useState<any>([]);
  const [excelData, setExcelData] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
  const dispatch: AppDispatch = useDispatch();
  const handleExcelDownload = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const url =
      "https://kairos-public-images.s3.eu-north-1.amazonaws.com/bulk_creation_template/Sample_Menu_Template.xlsx"; // Replace with your file URL
    const link = document.createElement("a");
    link.href = url;
    link.download = "Sample_Menu_Template.xlsx"; // Replace with your desired file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileChange = async (e: any) => {
    setExcelData(null);
    setExcelError(null);
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[1];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const validationErrors = validateData(jsonData, menuItemFileSchema);
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
      toast.error(`No Menu Data found`);
      return;
    }
    try {
      setLoading(true);
      let payload = processExcelData(excelData);
      await dispatch(createBulkMenu(payload)).unwrap();
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
            Upload an Excel file to create multiple items at once.
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
          <Label htmlFor="create-item">Create Single Item</Label>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Click the button to create a new item.
          </p>
        </div>
        <Button id="create-item" onClick={() => currentStepClick("one")}>
          Add Single Menu Item
        </Button>
      </div>
    </>
  );
};
