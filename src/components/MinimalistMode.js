import React from "react";
import ItemList from "./ItemList";

function MinimalistMode() {
  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-gray-800 text-xl font-semibold mb-4">Minimalist Mode</h2>
      <ItemList />
    </div>
  );
}

export default MinimalistMode;
