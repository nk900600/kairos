import { NavLink } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";

type ListType = {
  link: string;
  label: string;
}[];

export function BreadcrumbComponent({ list }: any) {
  return (
    <Breadcrumb className="hidden">
      <BreadcrumbList>
        {list.map((item: any, index: number) => {
          return (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <NavLink to={item.link}>{item.label}</NavLink>
                </BreadcrumbLink>
              </BreadcrumbItem>

              {index + 1 !== list.length && <BreadcrumbSeparator />}
            </>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
