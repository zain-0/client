import React, { useState } from "react";
import MinimalistMode from "./components/MinimalistMode";
import EngagingMode from "./components/EngagingMode";
import { motion } from "framer-motion";

function App() {
  const [isMinimalist, setIsMinimalist] = useState(true);

  return (
    <div className={`${isMinimalist ? "bg-gray-50" : "bg-gray-900"} min-h-screen`}>
      <header className="flex justify-between items-center p-4 shadow-md">
        <h1 className={`${isMinimalist ? "text-gray-800" : "text-white"} text-2xl font-bold`}>
          Item Manager
        </h1>
        <button
          onClick={() => setIsMinimalist(!isMinimalist)}
          className={`px-4 py-2 rounded-md font-semibold ${
            isMinimalist
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-purple-500 text-white hover:bg-purple-600"
          }`}
        >
          Switch to {isMinimalist ? "Engaging" : "Minimalist"} Mode
        </button>
      </header>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6"
      >
        {isMinimalist ? <MinimalistMode /> : <EngagingMode />}
      </motion.div>
    </div>
  );
}

export default App;
