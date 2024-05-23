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
import { Loader2, PencilIcon } from "lucide-react";
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
import { BASE_URL, updateEmployees } from "../../redux/actions";
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
} from "../../components/ui/form";
import axiosInstance from "../../redux/axios";
import { toast } from "sonner";

const settingsSchema = z.object({
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
  // mobileNumber: z
  //   .number()
  //   .min(1111111111, "Please Enter a valid mobile number")
  //   .max(9999999999, "Please Enter a valid mobile number"),
  // email: z
  //   .string()
  //   .regex(
  //     /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  //     "Please Enter a valid Email address"
  //   ),
});

const mobileSchema = z.object({
  mobileNumber: z
    .number()
    .min(1111111111, "Please Enter a valid mobile number")
    .max(9999999999, "Please Enter a valid mobile number"),
});
const emailSchema = z.object({
  email: z
    .string()
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please Enter a valid Email address"
    ),
});
export function GeneralSetting() {
  const [image, setImage] = useState("");
  const [isOtp, setIsOtp] = useState(false);
  const [isOtpEmail, setIsOtpEmil] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [imageLoader, setImageLoader] = useState(false);
  const { myAccount }: any = useSelector(
    (state: { table: RootState }) => state.table
  );
  const dispatch: AppDispatch = useDispatch();

  const { ...form } = useForm({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      firstName: myAccount?.employee?.firstName || "",
      lastName: myAccount?.employee?.lastName || "",
    },
  });
  const mobileForm = useForm({
    resolver: zodResolver(mobileSchema),
    defaultValues: {
      mobileNumber: myAccount?.employee?.mobileNumber || undefined,
    },
  });
  const emailForm = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: myAccount?.employee?.email || "",
    },
  });

  useEffect(() => {
    if (myAccount.employee) {
      form.setValue("firstName", myAccount.employee.firstName || "");
      form.setValue("lastName", myAccount.employee.lastName || "");
      mobileForm.setValue(
        "mobileNumber",
        Number(myAccount.employee.mobileNumber) || undefined
      );
      emailForm.setValue("email", myAccount.employee.email || "");

      setImage(myAccount.employee.userPic);
    }
  }, [myAccount]);

  // Handles the file input change
  const handleImageChange = async (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        setImageLoader(true);
        const response = await axiosInstance.post(
          "/employees/" + myAccount.employee.id + "/user-pic",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent: any) => {
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              // setUploadProgress(progress);
            },
          }
        );

        // setUploadURL(response.data.url);
        setImageLoader(false);
        console.log("File uploaded successfully:", response.data.url);
        setImage(response.data.url);
      } catch (e) {}
    }
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    await dispatch(
      updateEmployees({
        id: myAccount?.employee.id,
        firstName: data.firstName,
        lastName: data.lastName,
      })
    ).unwrap();
    setLoading(false);
  };

  const getOtp = async (e: any) => {
    // e.preventDefault();
    // e.stopPropagation();
    try {
      await generateOtp();
      setIsOtp(true);
    } catch (e: any) {
      toast.error(e.response.data.message);
      return;
    }
  };
  const getEmailOtp = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      // await generateOtp();
      setIsOtpEmil(true);
    } catch (e: any) {
      toast.error(e.response.data.message);
      return;
    }
  };

  const generateOtp = async () => {
    await axiosInstance.post(`${BASE_URL}/auth/generate-otp`, {
      mobileNumber: mobileForm.getValues().mobileNumber,
      otpType: "setting",
    });
  };
  const handleSaveMobile = async (data: any) => {
    try {
      setLoading(true);
      await dispatch(
        updateEmployees({
          id: myAccount?.employee.id,
          mobileNumber: data.mobileNumber,
        })
      ).unwrap();
      setLoading(false);
      setIsOtp(false);
    } catch (e: any) {
      toast.error(e.response.data.message);
      return;
    }
  };
  const handleSaveEmail = async (data: any) => {
    try {
      setLoading(true);
      await dispatch(
        updateEmployees({
          id: myAccount?.employee.id,
          email: data.email,
        })
      ).unwrap();
      setLoading(false);
      setIsOtpEmil(false);
    } catch (e: any) {
      toast.error(e.response.data.message);
      return;
    }
  };

  return (
    <main className="flex-1 grid min-h-[400px] gap-4 p-4 md:gap-8 md:p-6">
      {myAccount?.employee && (
        <div className="grid grid-cols-1 items-start">
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
                    />
                    <label htmlFor="fileInput" className="cursor-pointer">
                      <Avatar className="h-20 w-20 border ">
                        <AvatarImage alt="User avatar" src={image} />
                        <AvatarFallback className="uppercase">
                          {imageLoader ? (
                            <Loader2 className=" h-4 w-4 animate-spin" />
                          ) : (
                            myAccount?.employee?.firstName[0] +
                            myAccount?.employee?.lastName[0]
                          )}
                        </AvatarFallback>
                      </Avatar>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <CardHeader>
                    <CardTitle className="text-lg">Name</CardTitle>
                    <CardDescription>
                      Used to identify your Shop in the marketplace.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4 ">
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
                  </CardContent>
                  <CardFooter className="border-t px-6 py-4">
                    <Button loading={isLoading} type="submit">
                      save
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
            <Card>
              <Form {...mobileForm}>
                <form
                  onSubmit={mobileForm.handleSubmit(
                    !isOtp ? getOtp : handleSaveMobile
                  )}
                >
                  <CardHeader>
                    <CardTitle className="text-lg">Mobile Number</CardTitle>
                    <CardDescription>
                      Please enter the Mobile Number
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {!isOtp && (
                      <FormField
                        control={mobileForm.control}
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
                              <FormMessage>
                                {fieldState.error.message}
                              </FormMessage>
                            )}
                          </FormItem>
                        )}
                      />
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
                            onClick={(e) => getOtp(e)}
                          >
                            Resend SMS
                          </Button>
                        </p>
                      </form>
                    )}
                  </CardContent>
                  <CardFooter className="border-t px-6 py-4">
                    {!isOtp && <Button type="submit">Verify</Button>}
                    {isOtp && (
                      <div className="gap-2 flex">
                        <Button type="submit">Save</Button>
                        <Button onClick={() => setIsOtp(false)}>Cancel</Button>
                      </div>
                    )}
                  </CardFooter>
                </form>
              </Form>
            </Card>
            <Card>
              <Form {...emailForm}>
                <form onSubmit={emailForm.handleSubmit(handleSaveEmail)}>
                  <CardHeader>
                    <CardTitle className="text-lg">Email</CardTitle>
                    <CardDescription>
                      Please enter the email address
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* {!isOtpEmail && ( */}
                    <FormField
                      control={emailForm.control}
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
                    {/* )} */}
                    {/* {isOtpEmail && (
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
                    )} */}
                  </CardContent>
                  <CardFooter className="border-t px-6 py-4">
                    {/* {!isOtpEmail && ( */}
                    <Button type="submit">Save</Button>
                    {/* )} */}
                    {/* {isOtpEmail && (
                      <div className="gap-2 flex">
                        <Button type="submit">Save</Button>
                        <Button onClick={() => setIsOtpEmil(false)}>
                          Cancel
                        </Button>
                      </div>
                    )} */}
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </div>
        </div>
      )}
    </main>
  );
}
