import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../../components/ui/input-otp";
import { Button } from "../../components/ui/button";
import { useEffect, useState } from "react";
export function OtpComponent({
  goBack,
  submit,
  resendSms,
  buttonText = "Create Account",
  errorText = "Otp is required",
  loading = false,
}: any) {
  const [value, setValue] = useState("");
  const [otpError, setOtpError] = useState(errorText);
  const [timeLeft, setTimeLeft] = useState(0);
  useEffect(() => {
    if (timeLeft !== null && timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);

  const handleValueChange = (value: any) => {
    setValue(value);
    if (value) setOtpError("");
    else setOtpError(errorText);
  };

  const retrySMS = (e: any) => {
    if (timeLeft != 0) return;
    else setTimeLeft(30);
    resendSms(e);
  };
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
          <InputOTP maxLength={6} value={value} onChange={handleValueChange}>
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

        {/* {!!otpError && (
          <p className={"text-sm font-medium text-destructive"}>{otpError}</p>
        )} */}

        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Didn't get the OTP?
          {timeLeft != 0 && `  Retry in ${timeLeft}`}
          {timeLeft == 0 && (
            <Button variant={"link"} className=" text-xs" onClick={retrySMS}>
              Resend SMS
            </Button>
          )}
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
            loading={loading}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
}
