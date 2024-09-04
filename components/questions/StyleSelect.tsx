"use client";

import React from "react";
import { Radio, Space } from "antd";
import { RadioChangeEvent } from "antd/es/radio";
import { useAppContext } from "../../context/AppContext";

// Define style options
const styleOptions = [
  { value: "Trendy", label: "Trendy", color: "magenta" },
  { value: "Professional", label: "Professional", color: "blue" },
  { value: "Minimalist", label: "Minimalist", color: "cyan" },
  { value: "Fun", label: "Fun", color: "green" },
  { value: "Quirky", label: "Quirky", color: "purple" },
  { value: "Elegant", label: "Elegant", color: "pink" },
  { value: "Classic", label: "Classic", color: "red" },
];

const StyleSelect: React.FC = () => {
  const { preferences, setPreferences } = useAppContext(); // Get context state and updater

  const handleChange = (e: RadioChangeEvent) => {
    setPreferences({ ...preferences, style: e.target.value }); // Update the context with selected style
  };

  return (
    <Radio.Group
      value={preferences.style} // Use the context state for the selected value
      onChange={handleChange}
      style={{ width: "100%" }}
    >
      <Space direction="horizontal" className="">
        {styleOptions.map((option) => (
          <Radio key={option.value} value={option.value}>
            <span style={{ color: "black" }}>{option.label}</span>
          </Radio>
        ))}
      </Space>
    </Radio.Group>
  );
};

export default StyleSelect;
