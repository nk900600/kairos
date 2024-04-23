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

export default function Login() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="w-full gap-10  lg:grid lg:min-h-[600px] lg:grid-cols-2 lg:gap-0 xl:min-h-[800px]">
      <div className="flex items-center h-lvh justify-center p-6 lg:p-10   ">
        {currentStep == 1 && (
          <div className="mx-auto sm:w-[350px] w-full space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">
                Login into your app Account
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                New to my App?{" "}
                <NavLink to="/signup" className="underline">
                  Create Account
                </NavLink>
              </p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
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
          </div>
        )}

        {currentStep == 2 && (
          <OtpComponent goBack={() => setCurrentStep(1)}></OtpComponent>
        )}
      </div>
      <div className="hidden lg:flex items-center justify-center p-6 lg:flex lg:bg-muted/40 lg:p-10 dark:lg:bg-gray-800">
        <div className="mx-auto grid max-w-[350px] gap-3 lg:max-w-[500px]">
          <blockquote className="text-lg font-semibold leading-snug lg:text-xl lg:leading-normal xl:text-2xl">
            “The customer service I received was exceptional. The support team
            went above and beyond to address my concerns.“
          </blockquote>
          <div>
            <div className="font-semibold">Jules Winnfield</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              CEO, Acme Inc
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
