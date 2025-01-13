import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "../features/taskSlice";

const Dialog = ({ taskList, taskData, togglePopup }) => {
  const dispatch = useDispatch();
  const [task, setTask] = useState(
    taskData
      ? taskData
      : {
          title: "",
          description: "",
          date: "",
          status: "Pending",
          color: "#cc7700",
        }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    let StatusColor = "#cc7700";

    if (name == "status") {
      switch (value) {
        case "pending":
          StatusColor = "#cc7700";
          break;
        case "In Progress":
          StatusColor = "#0066b2";
          break;
        case "Completed":
          StatusColor = "#018749";
          break;

        default:
          break;
      }
    }
    setTask({ ...task, color: StatusColor, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (taskData === "") {
      dispatch(
        addTask({
          ...task,
          id: taskList.length > 0 ? taskList[taskList.length - 1]?.id + 1 : 1,
        })
      );
    } else {
      dispatch(updateTask(task));
    }
    togglePopup("");
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-slate-500 rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-2xl font-bold mb-4">Create New Task</h2>
        <form onSubmit={handleSubmit} method="post">
          {/* Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={task?.title}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Task title"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={task?.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Task description"
              rows="4"
            ></textarea>
          </div>

          {/* Deadline */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Deadline
            </label>
            <input
              type="date"
              name="date"
              value={task?.date}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Status */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Status
            </label>
            <select
              name="status"
              value={task?.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => togglePopup("")}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dialog;
