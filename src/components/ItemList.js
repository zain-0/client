import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, completeTask, deleteTask } from "../store";

function ItemList({ gamified }) {
  const tasks = useSelector((state) => state.tasks.tasks);
  const score = useSelector((state) => state.tasks.score);
  const dispatch = useDispatch();

  const [newItem, setNewItem] = useState("");
  const [multiplier, setMultiplier] = useState(1);

  const handleAddTask = () => {
    if (newItem.trim()) {
      dispatch(addTask(newItem.trim()));
      setNewItem("");
    }
  };

  const handleCompleteTask = (id) => {
    dispatch(completeTask(id)); // Mark the task as completed
    dispatch({ type: "tasks/incrementScore", payload: multiplier }); // Increment score based on multiplier
    setMultiplier((prev) => Math.min(prev + 0.5, 3)); // Increase multiplier, max is 3x
  };
  

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };

  const completedTasks = tasks.filter((task) => task.completed);
  const activeTasks = tasks.filter((task) => !task.completed);

  const progress =
    tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0;

  return (
    <div>
      {gamified && (
        <div className="mb-4 text-center">
          <div className="flex justify-between items-center mb-2">
            <p className="text-white text-lg font-bold">Points: {score}</p>
            <p className="text-yellow-400 text-sm font-semibold">
              Multiplier: {multiplier}x
            </p>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
            <div
              className="bg-blue-500 h-4 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Add new item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          className={`flex-1 px-4 py-2 border rounded-md ${
            gamified ? "bg-gray-100 text-gray-900" : "bg-gray-50"
          }`}
        />
        <button
          onClick={handleAddTask}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Add
        </button>
      </div>
      <div>
        <h2
          className={`text-lg font-semibold mb-2 ${
            gamified ? "text-white" : "text-gray-900"
          }`}
        >
          Active Tasks
        </h2>
        <ul className="space-y-2">
  {activeTasks.map((task) => (
    <li
      key={task.id}
      className={`p-3 flex justify-between items-center rounded-md ${
        gamified ? "bg-gray-200" : "bg-gray-100"
      }`}
    >
      {/* Apply conditional styling to the text */}
      <span
        className={`${
          gamified ? "text-gray-800" : "text-black"
        } font-medium`}
      >
        {task.name}
      </span>
      <div className="flex gap-2">
        <button
          onClick={() => handleCompleteTask(task.id)}
          className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Complete
        </button>
        <button
          onClick={() => handleDeleteTask(task.id)}
          className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </li>
  ))}
</ul>

      </div>
      {completedTasks.length > 0 && (
        <div className="mt-6">
          <h2
            className={`text-lg font-semibold mb-2 ${
              gamified ? "text-white" : "text-gray-900"
            }`}
          >
            Completed Tasks
          </h2>
          <ul className="space-y-2">
            {completedTasks.map((task) => (
              <li
                key={task.id}
                className="p-3 flex justify-between items-center bg-green-100 rounded-md"
              >
                <span className="line-through text-gray-500">{task.name}</span>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ItemList;
