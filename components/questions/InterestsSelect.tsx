"use client";
import React, { useState } from "react";
import { Select, Tag, Button, message } from "antd";
import type { SelectProps } from "antd";
import { useAppContext } from "@/context/AppContext";

const options: SelectProps["options"] = [
  { value: "Photography", label: "Photography", color: "red" },
  { value: "Travel", label: "Travel", color: "blue" },
  { value: "Fitness", label: "Fitness", color: "green" },
  { value: "Cooking", label: "Cooking", color: "orange" },
  { value: "Gaming", label: "Gaming", color: "purple" },
  { value: "Music", label: "Music", color: "magenta" },
  { value: "Art", label: "Art", color: "cyan" },
  { value: "Writing", label: "Writing", color: "gold" },
  { value: "Fashion", label: "Fashion", color: "volcano" },
  { value: "Technology", label: "Technology", color: "geekblue" },
  { value: "Sports", label: "Sports", color: "lime" },
  { value: "Reading", label: "Reading", color: "pink" },
  { value: "Gardening", label: "Gardening", color: "green" },
  { value: "DIY/Crafting", label: "DIY/Crafting", color: "orange" },
  { value: "Hiking", label: "Hiking", color: "volcano" },
  { value: "Movies", label: "Movies", color: "geekblue" },
  { value: "Dance", label: "Dance", color: "magenta" },
  { value: "Foodie", label: "Foodie", color: "red" },
  { value: "Yoga", label: "Yoga", color: "purple" },
  { value: "Animals/Pets", label: "Animals/Pets", color: "lime" },
];

const tagRender: SelectProps["tagRender"] = (props) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

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

type Props = {};

const InterestsSelect = (props: Props) => {
  const { preferences, setPreferences } = useAppContext();

  console.log(preferences);

  const handleChange = (value: string[]) => {
    if (value.length <= 3) {
      setPreferences({ ...preferences, interests: value });
    }
  };

  // Function to display selected values
  const handleSubmit = () => {
    if (preferences.interests.length > 0) {
      message.info(`Selected Interests: ${preferences.interests.join(", ")}`);
    } else {
      message.warning("No interests selected.");
    }
  };

  return (
    <>
      <Select
        mode="multiple"
        tagRender={tagRender}
        maxCount={3}
        value={preferences.interests}
        onChange={handleChange} // Call handleChange on selection change
        style={{ width: "100%", marginBottom: "16px" }}
        options={options}
        placeholder="Select up to 3 interests/hobbies"
        maxTagPlaceholder={(omittedValues) => `+${omittedValues.length} more`}
      />
      {/* <Button type="primary" onClick={handleSubmit}>
        Submit
      </Button> */}
    </>
  );
};

export default InterestsSelect;
