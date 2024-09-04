"use client";
import React from "react";
import { Select, Tag } from "antd";
import type { SelectProps } from "antd";
import { useAppContext } from "@/context/AppContext";

// Define a type that includes the color property
interface CustomTagProps extends React.ComponentPropsWithoutRef<typeof Tag> {
  color?: string;
}
// Define options for keywords with colors
const options: SelectProps["options"] = [
  { value: "Adventure", label: "Adventure", color: "blue" },
  { value: "Urban", label: "Urban", color: "purple" },
  { value: "Art", label: "Art", color: "cyan" },
  { value: "Minimalist", label: "Minimalist", color: "green" },
  { value: "Trendy", label: "Trendy", color: "orange" },
  { value: "Quirky", label: "Quirky", color: "red" },
  { value: "Modern", label: "Modern", color: "geekblue" },
  { value: "Classic", label: "Classic", color: "volcano" },
  // Add more options as needed
];

const tagRender: SelectProps["tagRender"] = (props) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  // Find the color associated with the current tag
  const tagOption = options.find((option) => option.value === value);
  const color = tagOption?.color || "default"; // Fallback to default if color not found

  return (
    <Tag
      color={color}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginInlineEnd: 4 }}
    >
      {label}
    </Tag>
  );
};

const KeywordsSelect: React.FC = () => {
  const { preferences, setPreferences } = useAppContext();

  const handleChange = (value: string[]) => {
    setPreferences({ ...preferences, keywords: value }); // Update global state
  };

  return (
    <Select
      mode="multiple"
      tagRender={tagRender}
      style={{ width: "100%", marginBottom: "16px" }}
      value={preferences.keywords}
      onChange={handleChange}
      options={options}
      placeholder="Select keywords"
      maxCount={2} // Adjust if needed
      maxTagPlaceholder={(omittedValues) => `+${omittedValues.length} more`}
    />
  );
};

export default KeywordsSelect;
