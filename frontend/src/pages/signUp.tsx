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
  BASE_URL,
  createNewFirm,
  createSubcription,
  createSubcriptionTrial,
} from "../redux/actions";
import { useQuery } from "../util/query";
import axiosInstance from "../redux/axios";

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
    .regex(/^[A-Za-z\s]*$/, "Please enter a resturant Name")
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
    await generateOtp();
    setCurrentStep(2);
  };

  const generateOtp = async () => {
    await axiosInstance.post(`${BASE_URL}/auth/generate-otp`, {
      mobileNumber: form.getValues().mobileNumber,
      otpType: "signup",
    });
  };

  const handleCreate = (otpValue: any) => {
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
      dispatch(createNewFirm(payload)).unwrap();
      dispatch(
        createSubcriptionTrial({ billingCycle: "monthly", SubscriptionId: "1" })
      ).unwrap();
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      return;
    }
    navigate("/dashboard");
  };

  return (
    <div className="w-full h-lvh lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center  h-lvh justify-center py-12">
        <div className="mx-auto px-2 grid w-[350px] gap-6">
          {currentStep == 1 && (
            <>
              <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">
                  Create your ShopBusiness Account
                </h1>
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
                              placeholder="Lee"
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
                              placeholder="Robinson"
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
                            placeholder="1234567890"
                            {...field}
                            onChange={(e: any) =>
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
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel htmlFor="email">Email</FormLabel>

                        <FormControl>
                          <Input
                            id="email"
                            placeholder="m@example.com"
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
                            placeholder="my dukaan"
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
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <NavLink to="/login" className="underline">
                  Sign in
                </NavLink>
              </div>
            </>
          )}
          {currentStep == 2 && (
            <OtpComponent
              submit={handleCreate}
              goBack={() => setCurrentStep(1)}
              resendSms={() => generateOtp()}
            ></OtpComponent>
          )}
        </div>
      </div>

      <div className="hidden bg-muted lg:block">
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
