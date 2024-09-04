"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of your context state
interface PreferencesState {
  interests: string[];
  keywords: string[];
  style: string;
  characterRequirements: {
    allowsNumbers: boolean;
    allowsUnderscores: boolean;
    length: {
      min: number;
      max: number;
    };
  };
  realNameInclusion: {
    option: "includeFullName" | "includeInitials" | "exclude"; // Defines the inclusion option
    fullname: string; // Only relevant if option is "includeFullName"
    initials: string[]; // Only relevant if option is "includeInitials"
  };
  exclusionCriteria: string[];
  currentTrends: boolean;
  targetAudience: string[];
}

// Define the shape of the context value
interface AppContextType {
  preferences: PreferencesState;
  setPreferences: (value: PreferencesState) => void;
}

// Create context with default values
const AppContext = createContext<AppContextType | undefined>(undefined);

// Create a provider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initial state
  const [preferences, setPreferences] = useState<PreferencesState>({
    interests: [],
    keywords: [],
    style: "checking",
    characterRequirements: {
      allowsNumbers: true,
      allowsUnderscores: true,
      length: {
        min: 8,
        max: 12,
      },
    },
    realNameInclusion: {
      option: "exclude", // options: "includeFullName", "includeInitials", "exclude"
      fullname: "", // only used if option is "includeFullName"
      initials: [], // only used if option is "includeInitials"
    },
    exclusionCriteria: [],
    currentTrends: false,
    targetAudience: [],
  });

  return <AppContext.Provider value={{ preferences, setPreferences }}>{children}</AppContext.Provider>;
};

// Custom hook to use the AppContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
