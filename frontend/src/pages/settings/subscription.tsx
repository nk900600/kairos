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
import { useState } from "react";

export function Subscription() {
  const [image, setImage] = useState("");

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
    // <main className="flex-1 grid min-h-[400px] gap-4 p-4 md:gap-8 md:p-6">
    //   <div className="grid grid-cols-1 items-start">
    <div key="1" className="grid gap-4">
      <Card>
        <CardHeader className="">
          <CardTitle className="text-lg">Pro Plan</CardTitle>
          <CardDescription>
            Get full access to all features and tools.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <span className="text-4xl font-bold">$19</span>
          <span className="text-gray-500 dark:text-gray-400">/month</span>
          <div className="flex items-baseline  gap-2">
            {/* <span className="text-4xl font-bold">$19</span> */}
            {/* <span className="text-gray-500 dark:text-gray-400">/month</span> */}
            <ul className="mt-4 space-y-2 text-left">
              <li className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-green-500" />
                Unlimited access to all features
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-green-500" />
                Priority support
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-green-500" />
                Advanced analytics
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-green-500" />
                Custom branding
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Upgrade Plan</Button>
        </CardFooter>
      </Card>
    </div>
    //   </div>
    // </main>
  );
}
