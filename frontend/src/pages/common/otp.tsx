import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../../components/ui/input-otp";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../redux/actions";
import axios from "axios";
export function OtpComponent({
  goBack,
  submit,
  resendSms,
  buttonText = "Create Account",
}: any) {
  const [value, setValue] = useState("");
  return (
    <div className="mx-auto sm:w-[350px] w-full space-y-6">
      <div className="space-y-2 ">
        <h1 className="text-3xl font-bold">OTP Confirmation</h1>
        <p className="text-gray-500 dark:text-gray-400">
          We have send verification code to your number
        </p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <InputOTP
            maxLength={6}
            value={value}
            onChange={(value) => setValue(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />

              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Didn't get the OTP?
          <Button variant={"link"} className=" text-xs" onClick={resendSms}>
            Resend SMS
          </Button>
        </p>

        <div className="flex gap-4">
          <Button
            variant={"outline"}
            className="w-full"
            type="submit"
            onClick={() => goBack()}
          >
            Go back
          </Button>
          <Button
            className="w-full"
            type="submit"
            onClick={() => submit(value)}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
}
