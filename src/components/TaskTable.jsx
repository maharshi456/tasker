import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "../utilities/Dialog";
import {
  deleteTask,
  selectFilteredTasks,
  setSearchQuery,
  setStatusFilter,
} from "../features/taskSlice";

const TaskTable = () => {
  const dispatch = useDispatch();
  const filteredTasks = useSelector(selectFilteredTasks);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState("");

  const togglePopup = (taskVal) => {
    setIsPopupOpen(!isPopupOpen);
    setSelectedTask(taskVal);
  };

  const DeleteHandler = (Id) => {
    dispatch(deleteTask(Id));
  };

  const FilterStatus = (e) => {
    dispatch(setStatusFilter(e.target.value));
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div>
      <h2 className="text-2xl text-gray-200 font-bold mb-4">Task List</h2>
      <div className="my-2 flex justify-between">
        <div className="w-3/6">
          <input
            type="text"
            name="search"
            onChange={handleSearchChange}
            className="w-full bg-slate-800 text-white rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Search Title"
          />
        </div>
        <div className="flex gap-3">
          <select
            name="status"
            onChange={FilterStatus}
            className="w-full bg-sky-600 text-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option
              className="bg-slate-800 text-gray-300 font-bold"
              value="All"
            >
              All
            </option>
            <option
              className="bg-slate-800 text-gray-300 font-bold"
              value="Pending"
            >
              Pending
            </option>
            <option
              className="bg-slate-800 text-gray-300 font-bold"
              value="In Progress"
            >
              In Progress
            </option>
            <option
              className="bg-slate-800 text-gray-300 font-bold"
              value="Completed"
            >
              Completed
            </option>
          </select>

          <button
            type="button"
            onClick={() => togglePopup("")}
            className="text-white whitespace-nowrap font-bold bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-4 focus:outline-none"
          >
            + ADD
          </button>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Deadline</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr
                key={task.id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {task.title}
                </th>
                <td className="px-6 py-4">{task.description}</td>
                <td className="px-6 py-4">{task.date}</td>
                <td className="px-6 py-4">
                  <div
                    className={`rounded-full bg-[${task.color}] py-0.5 px-2.5 border border-transparent text-sm text-white transition-all shadow-sm`}
                  >
                    {task.status}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => togglePopup(task)}>
                    <svg
                      className="w-6.5 h-6.5 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z"
                        clipRule="evenodd"
                      />
                      <path
                        fillRule="evenodd"
                        d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button onClick={() => DeleteHandler(task.id)}>
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isPopupOpen && (
        <Dialog
          taskList={filteredTasks}
          taskData={selectedTask}
          togglePopup={togglePopup}
        />
      )}
    </div>
  );
};

export default TaskTable;
