import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../../components/ui/input-otp";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
export function OtpComponent({ goBack }: any) {
  const navigate = useNavigate();
  return (
    <div className="mx-auto sm:w-[350px] w-full space-y-6">
      <div className="space-y-2 ">
        <h1 className="text-3xl font-bold">OTP Confirmation</h1>
        <p className="text-gray-500 dark:text-gray-400">
          We have send verification code to 1231231230
        </p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              {/* </InputOTPGroup> */}
              {/* <InputOTPSeparator /> */}
              {/* <InputOTPGroup> */}
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Didn't get the OTP?
          <Button variant={"link"} className=" text-xs" type="submit">
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
            onClick={() => navigate("/dashboard")}
          >
            Create Account
          </Button>
        </div>
      </div>
    </div>
  );
}
