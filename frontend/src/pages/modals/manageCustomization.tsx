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
import { useState } from "react";

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

export default function ManageCustomization() {
  const form = useForm({
    resolver: zodResolver(customizationSchema),
    defaultValues: {
      name: "",
      maxChoices: 0,
      choices: [{ name: "", price: 0, diet: "Vegetarian" }], //
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "choices",
  });

  const onSubmit = async (data: any) => {
    // Handle your form submission logic here
    console.log(data);
  };
  const handleDesginationChange = () => {};
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <Card className="w-full ">
          <CardHeader>
            <CardTitle>Customization Manager</CardTitle>
            <CardDescription>
              Create and manage customization options for your products.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-6">
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

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Price INR</TableHead>
                      <TableHead>Diet</TableHead>
                      <TableHead className="w-[80px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {form.watch("choices").map((item, index) => {
                      return (
                        <TableRow>
                          <TableCell>
                            <Input placeholder="Cheese" />
                          </TableCell>
                          <TableCell>
                            {" "}
                            <Input placeholder="20" type="number" />
                          </TableCell>
                          <TableCell>
                            <Select
                              onValueChange={handleDesginationChange}
                              defaultValue={""}
                            >
                              {/* <FormControl> */}
                              <SelectTrigger>
                                <SelectValue placeholder="Select a verified email to display" />
                              </SelectTrigger>
                              {/* </FormControl> */}
                              <SelectContent>
                                <SelectItem value={"Vegetrain"}>Veg</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() => remove(index)}
                              >
                                <TrashIcon className="h-4 w-4" />
                              </Button>
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() =>
                                  append({
                                    name: "",
                                    price: 0,
                                    diet: "Vegetarian",
                                  })
                                }
                              >
                                <PlusIcon className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button loading={isLoading} type="submit">
                  Save Customizations
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
