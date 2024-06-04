import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import {
  CardHeader,
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../components/ui/card";
import { CheckIcon, Loader2, PencilIcon } from "lucide-react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { useEffect, useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../../components/ui/input-otp";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { RootState } from "../../redux/reducer";
import { useDispatch, useSelector } from "react-redux";
import { Separator } from "../../components/ui/separator";
import { Badge } from "../../components/ui/badge";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/ui/form";
import { AppDispatch } from "../../redux/store";
import {
  activateSubscription,
  cancelSubscription,
  createSubscriptionGenerateSubLink,
  deleteFirm,
  pauseSubscription,
  updateEmployees,
  updateFirm,
  updateFirmImage,
  updateSubcription,
} from "../../redux/actions";
import axiosInstance from "../../redux/axios";
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
} from "../../components/ui/alert-dialog";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useQuery } from "../../util/query";
// const stateEnum = z.enum([

// ]);

const states = [
  { id: "AP", name: "Andhra Pradesh" },
  { id: "AR", name: "Arunachal Pradesh" },
  { id: "AS", name: "Assam" },
  { id: "BR", name: "Bihar" },
  { id: "CT", name: "Chhattisgarh" },
  { id: "GA", name: "Goa" },
  { id: "GJ", name: "Gujarat" },
  { id: "HR", name: "Haryana" },
  { id: "HP", name: "Himachal Pradesh" },
  { id: "JK", name: "Jammu and Kashmir" },
  { id: "JH", name: "Jharkhand" },
  { id: "KA", name: "Karnataka" },
  { id: "KL", name: "Kerala" },
  { id: "MP", name: "Madhya Pradesh" },
  { id: "MH", name: "Maharashtra" },
  { id: "MN", name: "Manipur" },
  { id: "ML", name: "Meghalaya" },
  { id: "MZ", name: "Mizoram" },
  { id: "NL", name: "Nagaland" },
  { id: "OD", name: "Odisha" },
  { id: "PB", name: "Punjab" },
  { id: "RJ", name: "Rajasthan" },
  { id: "SK", name: "Sikkim" },
  { id: "TN", name: "Tamil Nadu" },
  { id: "TG", name: "Telangana" },
  { id: "TR", name: "Tripura" },
  { id: "UP", name: "Uttar Pradesh" },
  { id: "UT", name: "Uttarakhand" },
  { id: "WB", name: "West Bengal" },
  { id: "AN", name: "Andaman and Nicobar Islands" },
  { id: "CH", name: "Chandigarh" },
  { id: "DN", name: "Dadra and Nagar Haveli and Daman and Diu" },
  { id: "LD", name: "Lakshadweep" },
  { id: "DL", name: "Delhi" },
  { id: "PY", name: "Puducherry" },
  { id: "LA", name: "Ladakh" },
];

const countryEnum = z.enum(["India"], {
  required_error: "You need to select a country.",
});
const BillingSchema = z.object({
  state: z.enum<any, any>(
    states.map((val) => val.name),
    {
      required_error: "You need to select a state.",
    }
  ),
  country: countryEnum,
  address: z
    .string()
    .regex(/^[A-Za-z0-9\s]*$/, "Please enter a valid address ")
    .min(1, "Address is required.")
    .max(50, "Character lkmit exceeded"),
  city: z
    .string()
    .regex(/^[A-Za-z0-9\s]*$/, "Please enter a valid city ")
    .min(1, "City name is required.")
    .max(500, "Character lkmit exceeded"),
  pincode: z
    .number()
    .min(111111, "Please Enter a valid Pincode ")
    .max(999999, "Please Enter a valid Pincode"),
});

export const SubscriptionStateType = Object.freeze({
  PAUSED: "PAUSED",
  ACTIVE: "ACTIVE",
  CUSTOMER_PAUSED: "CUSTOMER PAUSED",
  CUSTOMER_CANCELLED: "CUSTOMER CANCELLED",
  ON_HOLD: "ON HOLD",
  INITIALIZED: "INITIALIZED",
});

export function Subscription() {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isLoadingDelete, setLoadingDelete] = useState(false);
  const [allFeatures, setAllFeatures] = useState([]);

  const { myAccount }: any = useSelector(
    (state: { table: RootState }) => state.table
  );

  const query = useQuery();

  useEffect(() => {
    if (query.get("status") == "success") {
      toast.success("Great you are subscribe to the basic plan");
    }
  }, []);

  const form = useForm({
    resolver: zodResolver(BillingSchema),
    defaultValues: {
      state: myAccount.employee.Firm.state || "",
      address: myAccount.employee.Firm.address || "",
      city: myAccount.employee.Firm.city || "",
      pincode: myAccount.employee.Firm.zip
        ? Number(myAccount.employee.Firm.zip)
        : undefined,
      country: myAccount.employee.Firm.country || "",
    },
  });
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    setName(myAccount?.employee.Firm?.name);
    setImage(myAccount?.employee.Firm?.image);
    if (myAccount?.subscripition) {
      setAllFeatures(
        JSON.parse(myAccount?.subscripition?.Subscription?.features)
      );
      if (
        myAccount?.subscripition?.isTrailEnded &&
        myAccount?.subscripition?.isActive &&
        myAccount?.subscripition.subscriptionState ==
          SubscriptionStateType.INITIALIZED
      ) {
        dispatch(
          updateSubcription({
            id: myAccount?.subscripition?.id,
            isActive: false,
          })
        );
      }
    }
  }, [myAccount]);

  const onBillingSubmit = async (data: any) => {
    setLoading(true);
    await dispatch(
      updateFirm({
        id: myAccount?.employee.Firm.id,
        address: data.address,
        city: data.city,
        state: data.state,
        zip: data.pincode,
        country: data.country,
      })
    ).unwrap();
    setLoading(false);
  };
  const [imageLoader, setImageLoader] = useState(false);

  const handleImageChange = async (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        setImageLoader(true);
        await dispatch(
          updateFirmImage({
            id: myAccount?.employee.Firm.id,
            payload: formData,
          })
        ).unwrap();
        setImageLoader(false);
      } catch (e) {}
    }
  };

  const handleFirmDelete = async () => {
    setLoadingDelete(true);
    try {
      await dispatch(deleteFirm()).unwrap();
      setLoadingDelete(false);
    } catch (e: any) {
      setLoadingDelete(false);
    }
  };
  const handleCreateSub = async (e: any) => {
    setLoading(true);
    try {
      if (
        myAccount?.subscripition.subscriptionState ==
          SubscriptionStateType.INITIALIZED ||
        myAccount?.subscripition.subscriptionState ==
          SubscriptionStateType.CUSTOMER_CANCELLED
      ) {
        await dispatch(
          createSubscriptionGenerateSubLink(myAccount?.subscripition?.id)
        )
          .unwrap()
          .then((res) => {
            window.open(res.authLink, "_blank");
          });
      }
      if (
        myAccount?.subscripition.subscriptionState ==
        SubscriptionStateType.PAUSED
      ) {
        await dispatch(
          activateSubscription({
            id: myAccount?.subscripition?.id,
            subReferenceId: myAccount?.subscripition.subReferenceId,
          })
        )
          .unwrap()
          .then((res) => {
            toast.info("You Subscription Activated");
          });
      }
      setLoading(false);
    } catch (e: any) {
      setLoading(false);
    }
  };

  const handlePauseState = async () => {
    setLoading(true);
    try {
      await dispatch(
        pauseSubscription({
          id: myAccount?.subscripition?.id,
          subReferenceId: myAccount?.subscripition.subReferenceId,
        })
      )
        .unwrap()
        .then((res) => {
          setLoading(false);
          toast.info("You Subsription paused for the moment");
        });

      setLoading(false);
    } catch (e: any) {
      setLoading(false);
    }
  };

  const handleCancelState = async () => {
    setLoading(true);
    try {
      await dispatch(
        cancelSubscription({
          id: myAccount?.subscripition?.id,
          subReferenceId: myAccount?.subscripition.subReferenceId,
        })
      ).unwrap();
      toast.info("You Subsription cancelled");
      setLoading(false);
    } catch (e: any) {
      setLoading(false);
    }
  };

  return (
    // <main className="flex-1 grid min-h-[400px] gap-4 p-4 md:gap-8 md:p-6">
    //   <div className="grid grid-cols-1 items-start">
    <main className="flex-1 grid min-h-[400px] gap-4 md:gap-8">
      {myAccount?.subscripition && (
        <div key="1" className="grid gap-4 grid-col-1">
          <Card>
            <CardHeader className="">
              <CardTitle className="text-lg flex gap-4">
                <div>Basic Plan</div>
                {!myAccount?.subscripition?.isTrailEnded && (
                  <Badge>Trail</Badge>
                )}
              </CardTitle>
              <CardDescription>
                {myAccount?.subscripition?.Subscription?.additionalNotes}
              </CardDescription>
            </CardHeader>
            {/* <Separator /> */}
            <CardContent>
              <div></div>
              <span className="text-4xl font-bold">
                {myAccount?.subscripition?.Subscription?.monthlyPrice}
              </span>
              <span className="text-gray-500 dark:text-gray-400">/month</span>
              <div className="flex items-baseline  gap-2">
                <ul className="mt-4 space-y-2 text-left">
                  {allFeatures.map((val: any) => {
                    return (
                      <li className="flex items-center gap-2 text-sm">
                        <CheckIcon className="h-4 w-4 text-green-500" />
                        {val}
                      </li>
                    );
                  })}
                </ul>
              </div>{" "}
            </CardContent>

            <CardFooter className="border-t px-6 py-4 flex flex-col gap-4 flex-start">
              {!myAccount?.subscripition.isActive && (
                <div className="bg-red-100 p-4 rounded-md dark:bg-gray-800">
                  <div className="space-y-2">
                    <p className="text-gray-600 dark:text-gray-400">
                      {myAccount?.subscripition.subscriptionState ==
                        SubscriptionStateType.INITIALIZED &&
                        `Your subscription trial period has ended. Please activate
                      your subscription to continue enjoying our services. You
                      will not be able to place new orders until your
                      subscription is activated`}

                      {(myAccount?.subscripition.subscriptionState ==
                        SubscriptionStateType.PAUSED ||
                        myAccount?.subscripition.subscriptionState ==
                          SubscriptionStateType.CUSTOMER_CANCELLED) &&
                        `Please activate
                        your subscription to continue enjoying our services. You
                        will not be able to place new orders until your
                        subscription is activated`}
                    </p>
                  </div>
                </div>
              )}
              <div className="flex gap-4 flex-start w-full ">
                {!myAccount?.subscripition.isActive && (
                  <Button onClick={handleCreateSub} loading={isLoading}>
                    {myAccount?.subscripition.subscriptionState ==
                      SubscriptionStateType.INITIALIZED &&
                      "Trail ended, please subscribe"}
                    {myAccount?.subscripition.subscriptionState ==
                      SubscriptionStateType.PAUSED && "Please Activate"}

                    {myAccount?.subscripition.subscriptionState ==
                      SubscriptionStateType.CUSTOMER_CANCELLED &&
                      "Please Activate"}
                  </Button>
                )}

                {myAccount?.subscripition?.isActive &&
                  myAccount?.subscripition?.subscriptionState ==
                    SubscriptionStateType.ACTIVE && (
                    <>
                      {/* <Button onClick={handlePauseState} variant={"outline"}>
                        Pause Subscription
                      </Button> */}
                      <Button
                        onClick={handleCancelState}
                        variant={"link"}
                        className="text-destructive"
                      >
                        Need to Cancel?
                      </Button>
                    </>
                  )}
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
      <div className="grid grid-cols-1 items-start">
        <div className="grid gap-4">
          <Card>
            <CardHeader className="pb-0">
              <CardTitle className="text-lg">Shop Avatar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>
                  This is your avatar. Click on the avatar to upload a custom
                  one from your files.
                </span>

                <div className="flex justify-center items-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="fileInput"
                  />
                  <label htmlFor="fileInput" className="cursor-pointer">
                    <Avatar className="h-20 w-20 border ">
                      {imageLoader ? (
                        <Loader2 className=" h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <AvatarImage alt="User avatar" src={image} />
                          <AvatarFallback
                            className="uppercase"
                            style={{
                              background: myAccount?.employee?.Firm?.image,
                            }}
                          ></AvatarFallback>
                        </>
                      )}
                    </Avatar>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Shop Name</CardTitle>
              <CardDescription>
                Used to identify your Shop in the marketplace.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <Input disabled placeholder="Store Name" value={name} />
              </form>
            </CardContent>
            {/* <CardFooter className="border-t px-6 py-4">
              <Button>Save</Button>
            </CardFooter> */}
          </Card>
          <Card>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onBillingSubmit)}>
                <CardHeader>
                  <CardTitle className="text-lg">Shop Address</CardTitle>
                  <CardDescription>
                    If you’d like to add a postal address to every invoice,
                    enter it here.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-4 w-full sm:w-1/2">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id="address"
                            placeholder="street no 42"
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
                    name="city"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id="city"
                            placeholder="Chandigard"
                            {...field}
                          />
                        </FormControl>
                        {fieldState.error && (
                          <FormMessage>{fieldState.error.message}</FormMessage>
                        )}
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a State" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {states.map((val) => {
                                  return (
                                    <SelectItem value={val.name}>
                                      {val.name}
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                            {fieldState.error && (
                              <FormMessage>
                                {fieldState.error.message}
                              </FormMessage>
                            )}
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="pincode"
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                id="pincode"
                                placeholder="111111"
                                {...field}
                                onChange={(e: any) =>
                                  field.onChange(Number(e.target.value))
                                }
                              />
                            </FormControl>
                            {fieldState.error && (
                              <FormMessage>
                                {fieldState.error.message}
                              </FormMessage>
                            )}
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="">
                              <SelectValue placeholder="Select a country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="India">India</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        {fieldState.error && (
                          <FormMessage>{fieldState.error.message}</FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                  <Button type="submit">Save</Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-lg">Delete Account</CardTitle>
              <CardDescription>
                Permanently remove your Shop Account and all of its contents
                from the Shop Busniess platform. This action is not reversible,
                so please continue with caution.
              </CardDescription>
            </CardHeader>

            <CardFooter className="border-t px-6 py-4 bg-red-100">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" loading={isLoadingDelete}>
                    Delete Account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our system.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-destructive/90 text-destructive-foreground hover:bg-destructive/80"
                      onClick={handleFirmDelete}
                    >
                      Delete Account
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* //   </div> */}
    </main>
    // </main>
  );
}
