import { ArrowLeft } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

export function GoBackButton({ link = "/dashboard" }: any) {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(link);
  };

  return (
    <Button variant="outline" size="icon" className=" h-8 w-8" onClick={goBack}>
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Back</span>
    </Button>
  );
}
