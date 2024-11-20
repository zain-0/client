import React from "react";
import ItemList from "./ItemList";
import { motion } from "framer-motion";

function EngagingMode() {
  return (
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
      className="max-w-lg mx-auto p-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-md shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4">Engaging Mode</h2>
      <ItemList gamified={true} />
    </motion.div>
  );
}

export default EngagingMode;
