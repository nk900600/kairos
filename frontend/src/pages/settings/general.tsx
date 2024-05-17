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
import { PencilIcon } from "lucide-react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducer";
import { OtpComponent } from "../common/otp";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../../components/ui/input-otp";
import { AppDispatch } from "../../redux/store";
import { updateEmployees } from "../../redux/actions";

export function GeneralSetting() {
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [isOtp, setIsOtp] = useState(false);
  const [isOtpEmail, setIsOtpEmil] = useState(false);
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const { myAccount }: any = useSelector(
    (state: { table: RootState }) => state.table
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    setName(myAccount?.employee?.firstName);
    setLastName(myAccount?.employee?.lastName);
    setEmail(myAccount?.employee?.email);
    setMobile(myAccount?.employee?.mobileNumber);
  }, [myAccount]);
  // Handles the file input change
  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader: any = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMobileChange = (e: any) => {
    setMobile(e.target.value);
  };
  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };
  return (
    <main className="flex-1 grid min-h-[400px] gap-4 p-4 md:gap-8 md:p-6">
      {myAccount?.employee && (
        <div className="grid grid-cols-1 items-start">
          {/* <div className="flex flex-col items-center gap-2">
          <div className="relative">
            <Avatar className="h-12 w-12 border">
              <AvatarImage alt="User avatar" src="/placeholder-user.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Button
              className="absolute -top-2 -right-2"
              size="sm"
              variant="ghost"
            >
              <PencilIcon className="h-4 w-4" />
              <span className="sr-only">Edit avatar</span>
            </Button>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            General
          </span>
        </div> */}
          <div className="grid gap-4">
            <Card>
              <CardHeader className="pb-0">
                <CardTitle className="text-lg">Avatar</CardTitle>
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
                      value={image}
                    />
                    <label htmlFor="fileInput" className="cursor-pointer">
                      <Avatar className="h-20 w-20 border">
                        <AvatarImage
                          alt="User avatar"
                          src="/placeholder-user.jpg"
                        />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Name</CardTitle>
                <CardDescription>
                  Used to identify your Shop in the marketplace.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <Label htmlFor="name" className="mb-2">
                    First Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Store Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <div className="mb-2"></div>
                  <Label htmlFor="name" className="mb-2">
                    Last Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Store Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button
                  disabled={
                    !lastName || !name || myAccount?.employee.Role.id != 1
                  }
                  onClick={() =>
                    dispatch(
                      updateEmployees({
                        id: myAccount?.employee.id,
                        firstName: name,
                        lastName: lastName,
                      })
                    )
                  }
                >
                  Save
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Mobile Number</CardTitle>
                <CardDescription>
                  Please enter the Mobile Number
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!isOtp && (
                  <form>
                    <Input
                      placeholder="1213123122"
                      value={mobile}
                      onChange={handleMobileChange}
                    />
                  </form>
                )}

                {isOtp && (
                  <form className="mt-2">
                    <Label htmlFor="name" className="mb-2">
                      OTP Confirmation
                    </Label>
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
                    </InputOTP>{" "}
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Didn't get the OTP?
                      <Button
                        variant={"link"}
                        className=" text-xs"
                        type="submit"
                      >
                        Resend SMS
                      </Button>
                    </p>
                  </form>
                )}
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                {!isOtp && (
                  <Button onClick={() => setIsOtp(true)}>Verify</Button>
                )}
                {isOtp && (
                  <div className="gap-2 flex">
                    <Button onClick={() => setIsOtp(false)}>Save</Button>
                    <Button onClick={() => setIsOtp(false)}>Cancel</Button>
                  </div>
                )}
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Email</CardTitle>
                <CardDescription>
                  Please enter the email address
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!isOtpEmail && (
                  <form>
                    <Input
                      value={email}
                      placeholder="Sample@sam.com"
                      onChange={handleEmailChange}
                    />
                  </form>
                )}
                {isOtpEmail && (
                  <form className="mt-2">
                    <Label htmlFor="name" className="mb-2">
                      OTP Confirmation
                    </Label>
                    <InputOTP maxLength={6}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>{" "}
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Didn't get the OTP?
                      <Button
                        variant={"link"}
                        className=" text-xs"
                        type="submit"
                      >
                        Resend SMS
                      </Button>
                    </p>
                  </form>
                )}
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                {!isOtpEmail && (
                  <Button onClick={() => setIsOtpEmil(true)}>Verify</Button>
                )}
                {isOtpEmail && (
                  <div className="gap-2 flex">
                    <Button onClick={() => setIsOtpEmil(false)}>Save</Button>
                    <Button onClick={() => setIsOtpEmil(false)}>Cancel</Button>
                  </div>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </main>
  );
}
