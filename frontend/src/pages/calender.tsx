import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { GoBackButton } from "./common/goBackButton";
import { BreadcrumbComponent } from "./common/breadCrumbs";
export default function CalenderComponent() {
  return (
    <>
      <BreadcrumbComponent
        list={[
          { link: "/", label: "Dashboard" },
          { link: "/calender", label: "Calender" },
        ]}
      />
      <div className="flex items-center gap-4">
        <GoBackButton />
        <h1 className="flex-1  whitespace-nowrap text-lg sm:text-2xl font-semibold tracking-tight ">
          Calender
        </h1>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={false}
        events={[
          { title: "event 1", date: "2024-04-01" },
          { title: "event 2", date: "2024-04-02" },
        ]}
      />
    </>
  );
}
