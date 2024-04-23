/**
 * v0 by Vercel.
 * @see https://v0.dev/t/xdhQbQKc25E
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { NavLink } from "react-router-dom";
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

export default function Login() {
  const [currentStep, setCurrentStep] = useState(1);
  return (
    <div className="w-full h-lvh gap-10  lg:grid  lg:grid-cols-2 lg:gap-0 ">
      <div className="flex items-center  h-lvh justify-center py-12">
        <div className="mx-auto grid px-2 w-[350px] gap-6">
          {currentStep == 1 && (
            <>
              <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">Login</h1>
                <p className="text-balance text-muted-foreground">
                  Enter your detail below to login to your account
                </p>
              </div>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="username">Mobile Number</Label>
                  <Input id="username" placeholder="1234567890" required />
                </div>

                <Button
                  className="w-full"
                  type="submit"
                  onClick={() => setCurrentStep(2)}
                >
                  Send OTP
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <NavLink to="/signup" className="underline">
                  Sign up
                </NavLink>
              </div>
            </>
          )}

          {currentStep == 2 && (
            <OtpComponent goBack={() => setCurrentStep(1)}></OtpComponent>
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
