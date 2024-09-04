// src/components/questions/AvoidKeywordsSelect.tsx
"use client";
import { useAppContext } from "../../context/AppContext";
import { Input, Tag, Button, Space } from "antd";
import React, { useState } from "react";

type Props = {};

const AvoidKeywordsSelect: React.FC<Props> = () => {
  const { preferences, setPreferences } = useAppContext();
  const [keywordInput, setKeywordInput] = useState<string>("");

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeywordInput(e.target.value);
  };

  const handleAddKeyword = () => {
    if (keywordInput.trim() === "") return;
    setPreferences({
      ...preferences,
      exclusionCriteria: [...preferences.exclusionCriteria, keywordInput.trim()],
    });
    setKeywordInput("");
  };

  const handleRemoveKeyword = (keyword: string) => {
    setPreferences({
      ...preferences,
      exclusionCriteria: preferences.exclusionCriteria.filter((item) => item !== keyword),
    });
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
        <Input
          placeholder="Specify keywords to avoid"
          value={keywordInput}
          onChange={handleKeywordChange}
          style={{ flex: 1, marginRight: "8px" }}
        />
        <Button type="primary" onClick={handleAddKeyword}>
          Add Keyword
        </Button>
      </div>

      <div style={{ marginTop: "16px" }}>
        <Space direction="horizontal">
          {preferences.exclusionCriteria.map((keyword) => (
            <Tag
              key={keyword}
              closable
              onClose={() => handleRemoveKeyword(keyword)}
              style={{ marginInlineEnd: 4 }}
            >
              {keyword}
            </Tag>
          ))}
        </Space>
      </div>
    </div>
  );
};

export default AvoidKeywordsSelect;
