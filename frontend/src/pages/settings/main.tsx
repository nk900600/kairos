import { BreadcrumbComponent } from "../common/breadCrumbs";
import { GoBackButton } from "../common/goBackButton";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { GeneralSetting } from "./general";
import { Subscription } from "./subscription";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducer";
export function MainSettings() {
  const { isAdmin } = useSelector((state: { table: RootState }) => state.table);
  return (
    <>
      <BreadcrumbComponent
        list={[
          { link: "/", label: "Dashboard" },
          { link: "/settings", label: "Account Settings" },
        ]}
      />
      <div className="flex items-center gap-4">
        <GoBackButton />
        <h1 className="flex-1  whitespace-nowrap text-lg sm:text-2xl  font-semibold tracking-tight ">
          Account Settings
        </h1>
      </div>

      {isAdmin && (
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full mb-4 lg:w-2/3 grid-cols-2">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="subscription">Billing </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <GeneralSetting />
          </TabsContent>

          <TabsContent value="subscription">
            <Subscription></Subscription>
          </TabsContent>
        </Tabs>
      )}

      {!isAdmin && <GeneralSetting />}
    </>
  );
}
