"use client";
import React from "react";
import { Radio, Flex } from "antd";
import { useAppContext } from "../../context/AppContext";

const LengthSelect: React.FC = () => {
  const { preferences, setPreferences } = useAppContext();

  // Handle radio button changes
  const onRadioChange = (e: any) => {
    const { value } = e.target;
    const newPreferences = { ...preferences };

    if (value === "allowsNumbers" || value === "excludesNumbers") {
      newPreferences.characterRequirements.allowsNumbers = value === "allowsNumbers";
    } else if (value === "allowsUnderscores" || value === "excludesUnderscores") {
      newPreferences.characterRequirements.allowsUnderscores = value === "allowsUnderscores";
    }

    setPreferences(newPreferences);
  };

  return (
    <Flex gap="middle" className="font-xs">
      <Radio.Group
        defaultValue={preferences.characterRequirements.allowsNumbers ? "allowsNumbers" : "excludesNumbers"}
        buttonStyle="solid"
        size="small"
        onChange={onRadioChange}
      >
        <Radio.Button value="allowsNumbers">Allows numbers</Radio.Button>
        <Radio.Button value="excludesNumbers">Excludes numbers</Radio.Button>
      </Radio.Group>

      <Radio.Group
        defaultValue={
          preferences.characterRequirements.allowsUnderscores ? "allowsUnderscores" : "excludesUnderscores"
        }
        buttonStyle="solid"
        size="small"
        onChange={onRadioChange}
      >
        <Radio.Button value="allowsUnderscores">Allows underscores</Radio.Button>
        <Radio.Button value="excludesUnderscores">Excludes underscores</Radio.Button>
      </Radio.Group>
    </Flex>
  );
};

export default LengthSelect;
