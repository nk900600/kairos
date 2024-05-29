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
import { Image } from "@radix-ui/react-avatar";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import {  login } from "../redux/actions";
import axiosInstance from "../redux/axios";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import TickerQuotes from "./common/quotesPage";
import { EmptyPlaceholder } from "./common/emptyPlaceholder";
const loginSchema = z.object({
  mobileNumber: z
    .number()
    .min(1111111111, "Please Enter a valid mobile number")
    .max(9999999999, "Please Enter a valid mobile number"),
});
export default function Login() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      mobileNumber: undefined,
    },
  });
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const onSubmit = async (data: any) => {
    try {
      await generateOtp();
    } catch (e: any) {
      if (e?.response) toast.error(e.response.data.message);
      else toast.error("Something went wrong");
      return;
    }
    setCurrentStep(2);
  };

  const generateOtp = async () => {
    await axiosInstance.post(`auth/generate-otp`, {
      mobileNumber: form.getValues().mobileNumber,
      otpType: "login",
    });
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

  const handleCreate = async (otpValue: any) => {
    setIsLoading(true);
    let data = form.getValues();
    let payload = {
      mobileNumber: `${data.mobileNumber}`,
      otpType: "login",
      otpValue: otpValue,
    };
    try {
      await dispatch(login(payload)).unwrap();
      setIsLoading(false);
      navigate("/dashboard");
    } catch (e: any) {
      setIsLoading(false);
      return;
    }
  };

  return (
    <div className="w-full h-lvh gap-10  lg:grid  lg:grid-cols-2 lg:gap-0 ">
      <div className="flex items-center  h-lvh justify-center py-12">
        <div className="mx-auto grid px-2 w-[350px] gap-6">
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
                <h1 className="text-3xl font-bold">Log in</h1>
                <p className="text-balance text-muted-foreground">
                  Enter your detail below
                </p>
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="grid gap-4"
                >
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
                            placeholder="Please enter your mobile number"
                            {...field}
                            onChange={(e: any) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button className="w-full" type="submit">
                    Send OTP
                  </Button>
                </form>
              </Form>

              <div className="mt-4 text-left text-sm">
                Don&apos;t have an account?{" "}
                <NavLink to="/signup" className="underline">
                  Sign up
                </NavLink>
              </div>
            </>
          )}

          {currentStep == 2 && (
            <OtpComponent
              submit={handleCreate}
              goBack={() => setCurrentStep(1)}
              resendSms={() => handleTryAgain()}
              buttonText="Login"
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
