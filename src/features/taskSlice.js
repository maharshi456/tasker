import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  statusFilter: "All",
  searchQuery: "",
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) state.tasks[index] = action.payload;
    },
    deleteTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload
      );
      state.tasks.splice(index, 1);
    },
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const selectTasks = (state) => state.tasks?.tasks;
export const selectFilteredTasks = (state) => {
  const { tasks, statusFilter, searchQuery } = state.tasks;

  const filteredByStatus =
    statusFilter === "All"
      ? tasks
      : tasks.filter((task) => task.status === statusFilter);

  const filteredBySearch = filteredByStatus.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return filteredBySearch;
};
export const selectStatusFilter = (state) => state.tasks.statusFilter;
export const selectSearchQuery = (state) => state.tasks.searchQuery;

export const {
  addTask,
  updateTask,
  deleteTask,
  setStatusFilter,
  setSearchQuery,
} = taskSlice.actions;
export default taskSlice.reducer;
