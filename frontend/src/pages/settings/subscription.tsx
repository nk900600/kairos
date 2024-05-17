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
import { CheckIcon, PencilIcon } from "lucide-react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { useEffect, useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../../components/ui/input-otp";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { RootState } from "../../redux/reducer";
import { useSelector } from "react-redux";
import { Separator } from "../../components/ui/separator";

// Employee Management
// Table/Appointment Management
// Order/Service Management
// Dashboard Overview
// Leave Management
// Menu/Service Menu Management
export function Subscription() {
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [isOtp, setIsOtp] = useState(false);
  const [isOtpEmail, setIsOtpEmil] = useState(false);
  const [allFeatures, setAllFeatures] = useState([]);

  const { myAccount }: any = useSelector(
    (state: { table: RootState }) => state.table
  );

  useEffect(() => {
    setName(myAccount?.employee.Firm?.name);
    setEmail(myAccount?.employee.Firm?.email);
    setMobile(myAccount?.employee.Firm?.mobileNumber);
    setAllFeatures(JSON.parse(myAccount?.subscripition.Subscription.features));
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
    // <main className="flex-1 grid min-h-[400px] gap-4 p-4 md:gap-8 md:p-6">
    //   <div className="grid grid-cols-1 items-start">
    <main className="flex-1 grid min-h-[400px] gap-4 p-4 md:gap-8 md:p-6">
      <div key="1" className="grid gap-4 grid-col-1">
        <Card>
          <CardHeader className="">
            <CardTitle className="text-lg">Basic Plan</CardTitle>
            <CardDescription>
              {myAccount?.subscripition?.Subscription?.additionalNotes}
            </CardDescription>
          </CardHeader>
          {/* <Separator /> */}
          <CardContent>
            <div></div>
            <span className="text-4xl font-bold">₹299</span>
            <span className="text-gray-500 dark:text-gray-400">/month</span>
            <div className="flex items-baseline  gap-2">
              <ul className="mt-4 space-y-2 text-left">
                {allFeatures.map((val: any) => {
                  return (
                    <li className="flex items-center gap-2 text-sm">
                      <CheckIcon className="h-4 w-4 text-green-500" />
                      {val}
                    </li>
                  );
                })}
              </ul>
            </div>{" "}
            <div></div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4 flex gap-4 ">
            <Button disabled>Upgrade Plan</Button>
            <Button variant={"link"}>Need to Cancel,Are you sure?</Button>
          </CardFooter>
        </Card>
      </div>
      <div className="grid grid-cols-1 items-start">
        <div className="grid gap-4">
          <Card>
            <CardHeader className="pb-0">
              <CardTitle className="text-lg">Shop Avatar</CardTitle>
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
              <CardTitle className="text-lg">Shop Name</CardTitle>
              <CardDescription>
                Used to identify your Shop in the marketplace.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <Input disabled placeholder="Store Name" value={name} />
              </form>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button>Save</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Mobile Number</CardTitle>
              <CardDescription>Please enter the Mobile Number</CardDescription>
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
                    <Button variant={"link"} className=" text-xs" type="submit">
                      Resend SMS
                    </Button>
                  </p>
                </form>
              )}
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              {!isOtp && <Button onClick={() => setIsOtp(true)}>Verify</Button>}
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
              <CardDescription>Please enter the email address</CardDescription>
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
                    <Button variant={"link"} className=" text-xs" type="submit">
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
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Billing Address</CardTitle>
              <CardDescription>
                If you’d like to add a postal address to every invoice, enter it
                here.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4">
              <Input
                placeholder="Address "
                className="w-1/2"
                onChange={handleEmailChange}
              />
              <Input
                className="w-1/2"
                placeholder="city"
                onChange={handleEmailChange}
              />
              <div className="grid w-1/2 grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="State" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Fruits</SelectLabel>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                        <SelectItem value="blueberry">Blueberry</SelectItem>
                        <SelectItem value="grapes">Grapes</SelectItem>
                        <SelectItem value="pineapple">Pineapple</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Input id="last-name" placeholder="Robinson" required />
                </div>
              </div>
              <Select>
                <SelectTrigger className="w-1/2">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button onClick={() => {}}>Save</Button>
            </CardFooter>
          </Card>
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-lg">Delete Account</CardTitle>
              <CardDescription>
                Permanently remove your Personal Account and all of its contents
                from the Vercel platform. This action is not reversible, so
                please continue with caution.
              </CardDescription>
            </CardHeader>

            <CardFooter className="border-t px-6 py-4 bg-red-100">
              <Button variant="destructive">Delete Account</Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* //   </div> */}
    </main>
    // </main>
  );
}
