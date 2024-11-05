"use client";
import React from "react";

interface TabProps {
  tabs: { label: string; id: string }[];
  onTabChange: (tab: TabProps["tabs"][number]["label"]) => void;
  selectedTabId: TabProps["tabs"][number]["label"];
}

const Tab: React.FC<TabProps> = ({ onTabChange, tabs, selectedTabId }) => {
  return (
    <div className="flex space-x-4 border-b">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-2 text-sm font-medium ${
            selectedTabId === tab.id
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 border-b-2 border-transparent"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tab;
