import React, { useState } from "react";
import TaskTable from "./TaskTable";
import TaskCalendar from "./TaskCalendar";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("taskList");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-blue-500 text-white p-4 shadow">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Tasker</h1>
          <div className="space-x-4">
            <button
              onClick={() => setActiveTab("taskList")}
              className={`py-2 px-4 rounded ${
                activeTab === "taskList"
                  ? "bg-white text-blue-500"
                  : "hover:bg-blue-600"
              }`}
            >
              Tasks
            </button>
            <button
              onClick={() => setActiveTab("calendar")}
              className={`py-2 px-4 rounded ${
                activeTab === "calendar"
                  ? "bg-white text-blue-500"
                  : "hover:bg-blue-600"
              }`}
            >
              Calendar
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto p-4">
        {activeTab === "taskList" ? <TaskTable /> : <TaskCalendar />}
      </div>
    </div>
  );
};

export default Dashboard;
