/**
 * v0 by Vercel.
 * @see https://v0.dev/t/wf14El1X6xv
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Switch } from "../../components/ui/switch";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { PlusIcon, TrashIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { Separator } from "../../components/ui/separator";
import { ScrollArea } from "../../components/ui/scroll-area";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import DrawerContext from "../../context/drawerContext";
import {
  createMenuCustomization,
  updateMenuCustomization,
} from "../../redux/actions";

const itemSchema = z.object({
  name: z.string().min(1, "Name is required"), // Ensure each object has a 'name' property that is a non-empty string
  price: z.number().max(10000, "Please enter a valid price"), // Ensure each object has a 'name' property that is a non-empty string
  diet: z.enum(["Vegetarian", "Non-Vegetarian", "Vegan"], {
    required_error: "You need to select a diet type type.",
  }),
});

const customizationSchema = z.object({
  name: z.string().min(1, { message: "Customization name is required" }),
  maxChoices: z
    .number()
    .min(0, { message: "Maximum choices must be at least 0" }),
  choices: z.array(itemSchema),
});

export default function ManageCustomization({ menuId, choice }: any) {
  const { setOpen }: any = useContext(DrawerContext);

  const form = useForm({
    resolver: zodResolver(customizationSchema),
    defaultValues: {
      name: choice?.name ? choice.name : "",
      maxChoices: choice?.maxMultiSelect ? choice.maxMultiSelect : 0,
      choices: choice?.CustomizationChoices
        ? choice?.CustomizationChoices.map((item: any) => ({
            name: item.name,
            price: item.additionalPrice,
            diet: item.dietType,
            ...item,
          }))
        : [{ name: "", price: 0, diet: "Vegetarian" }], //
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "choices",
  });

  const dispatch: AppDispatch = useDispatch();
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      if (choice) {
        data.menuId = menuId;
        data.customizationId = choice.id;
        await dispatch(updateMenuCustomization(data)).unwrap();
      } else {
        data.menuId = menuId;
        await dispatch(createMenuCustomization(data)).unwrap();
      }
      setOpen(false);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to add table:", error);

      setIsLoading(false);
    }
  };
  const handleDesginationChange = () => {};
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel htmlFor="name">Name</FormLabel>
                <FormControl>
                  <Input
                    id="name"
                    placeholder="Enter customization name"
                    {...field}
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
            name="maxChoices"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel htmlFor="name">Maximum choices</FormLabel>
                <FormControl>
                  <Input
                    id="maxChoices"
                    type="number"
                    placeholder="0"
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
        </div>
        <ScrollArea className=" max-h-[450px] ">
          {form.watch("choices").map((item: any, index: any) => {
            return (
              <div className="border rounded-lg overflow-hidden p-2 grid gap-4 mb-2">
                <div className="flex justify-between items-center">
                  <FormLabel>Customization {index}</FormLabel>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-destructive"
                    onClick={() => remove(1)}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
                <div key={item.id} className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`choices.${index}.name`}
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter customization name"
                            {...field}
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
                    name={`choices.${index}.price`}
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel htmlFor={"price"}>Price INR</FormLabel>
                        <FormControl>
                          <Input
                            id={"price"}
                            type="number"
                            placeholder="1"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
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
                  name={`choices.${index}.diet`}
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel htmlFor={"diet"}>Price INR</FormLabel>

                      <Select
                        onValueChange={handleDesginationChange}
                        defaultValue={"Vegetarian"}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              {...field}
                              placeholder="Select a verified email to display"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {["Vegetarian", "Non-Vegetarian", "Vegan"].map(
                            (item) => {
                              return (
                                <SelectItem value={item}>{item}</SelectItem>
                              );
                            }
                          )}
                        </SelectContent>
                      </Select>

                      {fieldState.error && (
                        <FormMessage>{fieldState.error.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
              </div>
            );
          })}
        </ScrollArea>

        <div className="flex justify-end gap-2">
          <Button
            className="w-full"
            variant="outline"
            onClick={(e) => {
              e.preventDefault();
              append({
                name: "",
                price: 0,
                diet: "Vegetarian",
              });
            }}
          >
            Add Customization
          </Button>
          <Button className="w-full" loading={isLoading} type="submit">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
