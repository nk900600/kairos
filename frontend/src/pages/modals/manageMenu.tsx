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
import { createMenu, updateMenu } from "../../redux/actions";
import { useContext, useDebugValue, useEffect, useState } from "react";
import DrawerContext from "../../context/drawerContext";
import { Separator } from "../../components/ui/separator";
import { DownloadIcon } from "lucide-react";
import generateSampleExcel from "../common/excelfile";
const FormSchema = z.object({
  type: z.enum(["all", "mentions", "none"], {
    required_error: "You need to select a notification type.",
  }),
});

const menuItemSchema = z.object({
  name: z.string().min(1, "Name is Required"),
  description: z.string().min(1, "Description is Required"),
  price: z.number().min(1, "Price is Required"),
  categoryId: z.string(),
  spiceLevel: z.string(),
  dietType: z.string(),
});

export function ManageMenu({ menu }: any) {
  const { allMenu, allMenuCategories } = useSelector(
    (state: { table: RootState }) => state.table
  );
  const form = useForm({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      name: menu?.name || "",
      description: menu?.description || "",
      price: menu?.price || 0,
      categoryId: menu?.categoryId
        ? allMenuCategories?.find((val) => val.id == menu?.categoryId).title
        : allMenuCategories[0].title,
      spiceLevel: menu?.spiceLevel || "Mild",
      dietType: menu?.dietType || "Vegetarian",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState("bulk");
  const [newCategory, setNewCategory] = useState("bulk");

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
            (val) => val.title == data.categoryId
          )?.id,
        };
        data.id = menu.id;
        await dispatch(updateMenu(data)).unwrap();
      } else {
        data = {
          ...data,
          categoryId: allMenuCategories.find(
            (val) => val.title == data.categoryId
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

  const handleAddCatChange = (e: any) => {
    console.log(e.target.value);
    setNewCategory(e.target.value);
  };
  const handleAddClick = (e: any) => {
    allMenuCategories.push({ title: newCategory });
  };
  return (
    <>
      {currentStep == "bulk" && (
        <BulkCreationMenu currentStepClick={handleCurrentStepClick} />
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
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        //   onValueChange={handleDesginationChange}
                        defaultValue={
                          !menu?.id && allMenuCategories?.length
                            ? allMenuCategories[0]?.title
                            : allMenuCategories?.find(
                                (val) => val.id == menu?.categoryId
                              ).title
                        }
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {/* <div className="p-2 ">
                            <div className="space-y-2">
                              <Label htmlFor="new-item">Add a new item</Label>
                              <div className="flex gap-2">
                                <Input
                                  id="new-item"
                                  placeholder="Enter a new category"
                                  onChange={handleAddCatChange}
                                />
                                <Button onClick={handleAddClick}>Add</Button>
                              </div>
                            </div>
                          </div>

                          <SelectSeparator></SelectSeparator> */}
                          {allMenuCategories.map((item) => {
                            return (
                              <SelectItem value={item.title}>
                                {item.title}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
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

export const BulkCreationMenu = ({ currentStepClick }: any) => {
  const handleExcelDownload = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    generateSampleExcel();
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
          <Input id="file-upload" type="file" />
          <Button>Upload</Button>
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
