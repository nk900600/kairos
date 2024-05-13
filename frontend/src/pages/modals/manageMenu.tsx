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
import { useContext, useState } from "react";
import DrawerContext from "../../context/drawerContext";
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
      console.error("Failed to add table:", error);

      setIsLoading(false);
    }
  };

  return (
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
                        <RadioGroupItem key={spice} value={spice} id={spice} />
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
                    {["Vegetarian", "Non-Vegetarian", "Vegan"].map((spice) => (
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem key={spice} value={spice} id={spice} />
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
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
