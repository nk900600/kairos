/**
 * v0 by Vercel.
 * @see https://v0.dev/t/xdhQbQKc25E
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import {
  CardHeader,
  Card,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../components/ui/input-otp";
import { useState } from "react";
import { OtpComponent } from "./common/otp";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import {
  createNewFirm,
  createSubcription,
  createSubcriptionTrial,
} from "../redux/actions";
import { useQuery } from "../util/query";
import axiosInstance from "../redux/axios";
import { toast } from "sonner";
import TickerQuotes from "./common/quotesPage";
import { EmptyPlaceholder } from "./common/emptyPlaceholder";

const signUpschema = z.object({
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
    .min(1111111111, "Please Enter a valid mobile number")
    .max(9999999999, "Please Enter a valid mobile number"),
  email: z
    .string()
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please Enter a valid Email address"
    ),
  resturant: z
    .string()
    .regex(/^[A-Za-z0-9\s]*$/, "Please enter a resturant Name")
    .min(1, "Resturant Name is required.")
    .max(50, "Character lkmit exceeded"),
});

export default function SignUp() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  let query = useQuery();

  const form = useForm({
    resolver: zodResolver(signUpschema),
    defaultValues: {
      firstName: "",
      lastName: "",
      mobileNumber: undefined,
      email: "",
      resturant: "",
    },
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await generateOtp();
      setIsLoading(false);
    } catch (e: any) {
      if (e?.response) toast.error(e.response.data.message);
      else toast.error("Something went wrong");
      setIsLoading(false);
      return;
    }
    setCurrentStep(2);
  };

  const handleTryAgain = async () => {
    try {
      await generateOtp();
    } catch (e: any) {
      if (e?.response) toast.error(e.response.data.message);
      else toast.error("Something went wrong");
      return;
    }
  };

  const generateOtp = async () => {
    await axiosInstance.post(`auth/generate-otp`, {
      mobileNumber: form.getValues().mobileNumber,
      otpType: "signup",
    });
  };

  const handleCreate = async (otpValue: any) => {
    setIsLoading(true);
    let data = form.getValues();
    let payload = {
      mobileNumber: `${data.mobileNumber}`,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      firmType: "1", // Resturant type
      firmName: data.resturant,
      otpType: "signup",
      otpValue: otpValue,
    };
    try {
      await dispatch(createNewFirm(payload)).unwrap();
      setIsLoading(false);
      navigate("/dashboard");
    } catch (e: any) {
      toast.error(e);
      setIsLoading(false);
      return;
    }
  };

  return (
    <div className="w-full h-lvh lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center  h-lvh justify-center py-12">
        <div className="mx-auto px-2 grid w-[350px] gap-6">
          {currentStep == 1 && (
            <>
              <div className="grid gap-2 text-left">
                <img
                  alt="TSB"
                  className="h-10 w-10"
                  height="00"
                  src="./logo.svg"
                  width="300"
                />
                <h1 className="text-3xl font-bold">Create your Account</h1>
                <p className="text-balance text-muted-foreground">
                  Enter your information to create an account
                </p>
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="grid gap-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormLabel htmlFor="first-name">First name</FormLabel>

                          <FormControl>
                            <Input
                              id="first-name"
                              placeholder="Rakesh"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormLabel htmlFor="last-name">Last name</FormLabel>

                          <FormControl>
                            <Input
                              id="last-name"
                              placeholder="Jhunjhunwala"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    {/* <div className="space-y-2">
                      <Label htmlFor="first-name">First name</Label>
                      <Input id="first-name" placeholder="Lee" required />
                    </div> */}
                    {/* <div className="space-y-2">
                      <Label htmlFor="last-name">Last name</Label>
                      <Input id="last-name" placeholder="Robinson" required />
                    </div> */}
                  </div>
                  <FormField
                    control={form.control}
                    name="mobileNumber"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel htmlFor="mobileNumber">
                          Mobile Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="mobileNumber"
                            type="number"
                            placeholder="Enter a vaild mobile number"
                            {...field}
                            onChange={(e: any) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel htmlFor="email">Email</FormLabel>

                        <FormControl>
                          <Input
                            id="email"
                            placeholder="dummy@example.com"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="resturant"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel htmlFor="resturant">
                          Resturant Name
                        </FormLabel>

                        <FormControl>
                          <Input
                            id="resturant"
                            placeholder="My shop name"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button loading={isLoading} className="w-full" type="submit">
                    Next
                  </Button>
                </form>
              </Form>

              <div>
                <div className="mt-4 text-left text-sm">
                  Already have an account?{" "}
                  <NavLink to="/login" className="underline">
                    Sign in
                  </NavLink>
                </div>
                <div className="mt-1 text-left text-sm">
                  Take me to?{" "}
                  <NavLink to="/login" className="underline">
                    Home page
                  </NavLink>
                </div>
              </div>
            </>
          )}
          {currentStep == 2 && (
            <OtpComponent
              submit={handleCreate}
              goBack={() => setCurrentStep(1)}
              resendSms={() => handleTryAgain()}
            ></OtpComponent>
          )}
        </div>
      </div>

      <div className="hidden bg-black lg:flex  text-gray-100">
        {/* <TickerQuotes /> */}

        <EmptyPlaceholder
          type="login"
          buttonText=""
          title="Transform Your Business: Speed, Efficiency, Productivity"
          description="Unlock the full potential of your shop with our cutting-edge
          management solution. Transform your
          operations and take your business to the next level with our intuitive
          and powerful shop management solution"
          className="pb-0"
        >
          {" "}
        </EmptyPlaceholder>
        {/* <Image
            src="/placeholder.svg"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          /> */}
      </div>
    </div>
  );
}
