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

export default function SignUp() {
  const [currentStep, setCurrentStep] = useState(1);
  return (
    <div className="w-full h-lvh lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center  h-lvh justify-center py-12">
        <div className="mx-auto px-2 grid w-[350px] gap-6">
          {currentStep == 1 && (
            <>
              <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">Sign Up</h1>
                <p className="text-balance text-muted-foreground">
                  Enter your information to create an account
                </p>
              </div>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input id="first-name" placeholder="Lee" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input id="last-name" placeholder="Robinson" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Mobile Number</Label>
                  <Input id="username" placeholder="1234567890" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="m@example.com"
                    required
                    type="email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Resturant Name</Label>
                  <Input
                    id="text"
                    placeholder="My shop"
                    required
                    type="email"
                  />
                </div>

                <Button
                  className="w-full"
                  type="submit"
                  onClick={() => setCurrentStep(2)}
                >
                  Next
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <NavLink to="/login" className="underline">
                  Sign in
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
