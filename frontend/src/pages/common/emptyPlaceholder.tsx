/**
 * v0 by Vercel.
 * @see https://v0.dev/t/CRuD8k4BN0z
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "../../components/ui/button";
// import Hamburger from "/Hamburger.gif";

const imageMapper: any = {
  customization:
    "https://kairos-public-images.s3.eu-north-1.amazonaws.com/frontend-public/Hamburger.gif",
  table:
    "https://kairos-public-images.s3.eu-north-1.amazonaws.com/frontend-public/closed_stores.gif",
  currentOrder:
    "https://kairos-public-images.s3.eu-north-1.amazonaws.com/frontend-public/Empty.gif",
  orders:
    "https://kairos-public-images.s3.eu-north-1.amazonaws.com/frontend-public/order_food.gif",
  chefs:
    "https://kairos-public-images.s3.eu-north-1.amazonaws.com/frontend-public/Chef.gif",
  login: "../../Waiters-bro(1).svg",
  leaves:
    "https://kairos-public-images.s3.eu-north-1.amazonaws.com/frontend-public/Trip.gif",
  dashboard_chart:
    "https://kairos-public-images.s3.eu-north-1.amazonaws.com/frontend-public/No+data.gif",
};
export const EmptyPlaceholder = ({
  type,
  title = "No customization yet",
  description = "Get started by adding your first customization",
  buttonText = "Add customization",
  onButtonClick = () => {},
  children: any = <></>,
}: any) => {
  return (
    <div className="flex flex-col items-center w-full justify-center gap-6 p-4 md:p-12">
      {type && (
        <img
          alt="Empty state illustration"
          className="w-full max-w-[300px]"
          height="00"
          src={imageMapper[type]}
          width="300"
        />
      )}
      <div className="space-y-2 text-center">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400">{description}</p>
        {buttonText && (
          <Button onClick={onButtonClick} className="mt-4">
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
};
