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
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducer";

export function ShopSetting() {
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");

  const { myAccount }: any = useSelector(
    (state: { table: RootState }) => state.table
  );

  useEffect(() => {
    setName(myAccount?.employee.Firm?.name);
    setEmail(myAccount?.employee.Firm?.email);
    setMobile(myAccount?.employee.Firm?.mobileNumber);
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
  return (
    <main className="flex-1 grid min-h-[400px] gap-4 p-4 md:gap-8 md:p-6">
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
                <Input placeholder="Store Name" value={name} />
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
              <form>
                <Input placeholder="1213123122" value={mobile} />
              </form>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button>Verify</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Email</CardTitle>
              <CardDescription>Please enter the email address</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <Input placeholder="Sample@sam.com" value={email} />
              </form>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button>Save</Button>
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
    </main>
  );
}
