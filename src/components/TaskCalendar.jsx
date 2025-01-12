import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useSelector } from "react-redux";

const TaskCalendar = () => {
  const tasks = useSelector((state) => state.tasks.tasks);

  const getTileContent = ({ date }) => {
    const task = tasks.find(
      (task) => new Date(task.deadline).toDateString() === date.toDateString()
    );
    return task ? (
      <span className="text-xs text-red-500">{task.title}</span>
    ) : null;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Clendar View</h2>
      <Calendar tileContent={getTileContent} />
    </div>
  );
};

export default TaskCalendar;
