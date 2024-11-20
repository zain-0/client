import { configureStore, createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: JSON.parse(localStorage.getItem("tasks")) || [],
    score: 0,
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({ id: Date.now(), name: action.payload, completed: false });
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    completeTask: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = true;
        state.score += 10;
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    incrementScore: (state, action) => {
        state.score += action.payload; // Add multiplier value to score
    },
  },
});

export const { addTask, completeTask, deleteTask } = taskSlice.actions;

const store = configureStore({
  reducer: {
    tasks: taskSlice.reducer,
  },
});

export default store;
