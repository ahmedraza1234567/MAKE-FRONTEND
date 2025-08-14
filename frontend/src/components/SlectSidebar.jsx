// components/SelectSidebar.jsx
import React, { useState } from "react";

const SelectSidebar = () => {
  const [active, setActive] = useState("pickup");

  const tabs = [
    { id: "pickup", label: "Pickup Elements", color: "bg-blue-500" },
    { id: "edit", label: "Edit Elements", color: "bg-green-500" },
    { id: "delete", label: "Delete Elements", color: "bg-red-500" },
  ];

  return (
    <div className="w-64 h-screen bg-gray-100 border-r p-4">
      <h2 className="text-2xl font-bold mb-6">Select</h2>
      <div className="space-y-2">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`flex items-center cursor-pointer p-2 rounded hover:bg-gray-200 ${
              active === tab.id ? "bg-white shadow" : ""
            }`}
            onClick={() => setActive(tab.id)}
          >
            {/* Active Bar */}
            <div
              className={`w-1 h-6 rounded-r ${active === tab.id ? tab.color : "bg-transparent"}`}
            ></div>
            {/* Label */}
            <span className="ml-3">{tab.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectSidebar;
