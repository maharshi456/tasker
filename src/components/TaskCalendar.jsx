import FullCalendar from "@fullcalendar/react";
import React from "react";
import { useSelector } from "react-redux";
import dayGridPlugin from "@fullcalendar/daygrid";

const TaskCalendar = () => {
  const tasks = useSelector((state) => state.tasks.tasks);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-stone-50">Clendar View</h2>
      <div className="bg-slate-100 p-5">
        <FullCalendar
          initialView="dayGridMonth"
          themeSystem="Simplex"
          plugins={[dayGridPlugin]}
          events={tasks}
        />
      </div>
    </div>
  );
};

export default TaskCalendar;
