"use client";
import { useAppContext } from "../../context/AppContext";
import { Radio, RadioChangeEvent, Space, Input } from "antd";
import React from "react";

type Props = {};

const options = [
  { value: "includeFullName", label: "Include Full Name" },
  { value: "includeInitials", label: "Include Initials" },
  { value: "exclude", label: "Exclude Name/Initials" },
];

const NameInclusionSelect: React.FC<Props> = () => {
  const { preferences, setPreferences } = useAppContext();

  const handleChange = (e: RadioChangeEvent) => {
    const value = e.target.value;

    setPreferences({
      ...preferences,
      realNameInclusion: {
        option: value,
        fullname:
          value === "includeFullName" || value === "includeInitials"
            ? preferences.realNameInclusion.fullname
            : "", // Keep fullname if including
        initials: value === "includeInitials" ? preferences.realNameInclusion.initials : [], // Clear initials if not including
      },
    });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fullname = e.target.value;
    setPreferences({
      ...preferences,
      realNameInclusion: {
        ...preferences.realNameInclusion,
        fullname,
        initials: fullname.split(" ").map((name) => name[0]), // Automatically generate initials
      },
    });
  };

  // Determine if the input field should be shown
  const showInput =
    preferences.realNameInclusion.option === "includeFullName" ||
    preferences.realNameInclusion.option === "includeInitials";

  return (
    <div>
      <Radio.Group
        value={preferences.realNameInclusion.option}
        onChange={handleChange}
        style={{ width: "100%" }}
      >
        <Space direction="horizontal">
          {options.map((option) => (
            <Radio key={option.value} value={option.value}>
              <span style={{ color: "black" }}>{option.label}</span>
            </Radio>
          ))}
        </Space>
      </Radio.Group>

      {/* Conditionally render the input field if the user wants to include their name or initials */}
      {showInput && (
        <Input
          placeholder="Enter your full name"
          value={preferences.realNameInclusion.fullname}
          onChange={handleNameChange}
          style={{ width: "100%", marginTop: "8px" }}
        />
      )}
    </div>
  );
};

export default NameInclusionSelect;
