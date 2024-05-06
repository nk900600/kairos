import { DialogFooter } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";

import { useContext, useEffect, useState } from "react";
import DrawerContext from "../../context/drawerContext";
import { updateMenu } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

export const ManageMenuDiscount = ({ menu }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [discount, setDiscount] = useState(0);
  const { setOpen }: any = useContext(DrawerContext);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    setDiscount(menu?.discount);
  }, [menu]);
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    console.log(menu?.id);

    try {
      // Dispatch the addTable action and wait for it to complete
      if (menu?.id) {
        await dispatch(
          updateMenu({ id: menu.id, discount: Number(discount) })
        ).unwrap();
      }
      setOpen(false);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right" htmlFor="discount">
            Discount
          </Label>
          <div className="col-span-3 flex items-center gap-2">
            <Input
              id="discount"
              max="100"
              min="0"
              type="number"
              value={discount}
              onChange={(e: any) => setDiscount(e.target.value)}
            />
            <span className="text-sm font-medium">%</span>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button onClick={onSubmit} loading={isLoading}>
          Apply Discount
        </Button>
        <Button variant={"outline"} onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </DialogFooter>
    </>
  );
};
