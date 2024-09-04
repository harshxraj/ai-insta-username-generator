"use client";
import React, { useState } from "react";
import AvoidKeywordsSelect from "@/components/questions/AvoidKeywordsSelect";
import InterestsSelect from "@/components/questions/InterestsSelect";
import KeywordsSelect from "@/components/questions/KeywordsSelect";
import LengthSelect from "@/components/questions/LengthSelect";
import NameInclusionSelect from "@/components/questions/NameInclusionSelect";
import StyleSelect from "@/components/questions/StyleSelect";
import { useAppContext } from "@/context/AppContext";
import { CopyOutlined } from "@ant-design/icons";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Button, message, Tag, Tooltip } from "antd";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const buildPrompt = (preferences: any): string => {
  const {
    interests,
    keywords,
    style,
    characterRequirements,
    realNameInclusion,
    exclusionCriteria,
    currentTrends,
    targetAudience,
  } = preferences;

  const formatArray = (arr: string[]) => (arr.length > 0 ? arr.join(", ") : "none");

  let prompt =
    "Generate a list of 10 unique Instagram usernames based on the following user preferences:\n\n";

  prompt += `1. **Interests/Hobbies**: ${formatArray(interests)}\n`;
  prompt += `2. **Preferred Keywords/Themes**: ${formatArray(keywords)}\n`;
  prompt += `3. **Style Preference**: ${style}\n`;
  prompt += `4. **Character/Length Requirements**:\n`;
  prompt += `   - Allows Numbers: ${characterRequirements.allowsNumbers ? "Yes" : "No"}\n`;
  prompt += `   - Allows Underscores: ${characterRequirements.allowsUnderscores ? "Yes" : "No"}\n`;
  prompt += `   - Length: Between ${characterRequirements.length.min} and ${characterRequirements.length.max} characters\n`;

  switch (realNameInclusion.option) {
    case "includeFullName":
      prompt += `5. **Inclusion of Real Name/Initials**: Include Full Name (${
        realNameInclusion.fullname
      }) or Initials (${formatArray(realNameInclusion.initials)})\n`;
      break;
    case "includeInitials":
      prompt += `5. **Inclusion of Real Name/Initials**: Include Initials (${formatArray(
        realNameInclusion.initials
      )})\n`;
      break;
    case "exclude":
      prompt += `5. **Inclusion of Real Name/Initials**: Exclude Real Name/Initials\n`;
      break;
  }

  prompt += `6. **Exclusion Criteria**: ${formatArray(exclusionCriteria)}\n`;
  prompt += `7. **Current Trends or Popular Culture**: ${currentTrends ? "Yes" : "No"}\n`;
  prompt += `8. **Target Audience/Community**: ${formatArray(targetAudience)}\n`;

  // Request specific format
  prompt += `\nPlease generate a list of 5 usernames in the following format:\n`;
  prompt += `[\n`;
  prompt += `  "Username1",\n`;
  prompt += `  "Username2",\n`;
  prompt += `  "Username3",\n`;
  prompt += `  "Username4",\n`;
  prompt += `  "Username5",\n`;

  prompt += `]\n`;

  prompt += `The usernames should be creative, memorable, and unique. The usernames should be suitable for an Instagram profile and reflect the preferences and style mentioned above. Ensure they are easy to read, spell, and pronounce. Avoid using offensive or inappropriate language.\n`;
  console.log(prompt);
  return prompt;
};

export default function Home() {
  const { preferences, setPreferences } = useAppContext();
  const [usernames, setUsernames] = useState<string[]>([]);
  const [takenUsernames, setTakenUsernames] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDataFromGemini = async () => {
    try {
      setLoading(true);
      setError(null);

      const prompt = buildPrompt(preferences);
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();
      const generatedUsernames: string[] = JSON.parse(text);

      const availableUsernames: string[] = [];
      const takenUsernames: string[] = [];

      for (const username of generatedUsernames) {
        const isTaken = await isUsernameTaken(username);
        if (isTaken) {
          takenUsernames.push(username);
        } else {
          availableUsernames.push(username);
        }
      }

      setUsernames(availableUsernames);
      setTakenUsernames(takenUsernames);
    } catch (err) {
      console.error("Error fetching data from Gemini:", err);
      setError("Failed to generate usernames.");
    } finally {
      setLoading(false);
    }
  };

  const isUsernameTaken = async (username: string): Promise<boolean> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_IG}${username}`);
      if (response.status === 500) return true;
      return false;
    } catch (error) {
      console.error(`Error checking username ${username}:`, error);
      return false; // Assuming username is available if there's an error
    }
  };

  const colors = [
    "magenta",
    "red",
    "volcano",
    "orange",
    "gold",
    "lime",
    "green",
    "cyan",
    "blue",
    "geekblue",
    "purple",
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        message.success({
          content: `Copied to clipboard: ${text}`,
          duration: 2,
        });
        console.log("Copied to clipboard:", text);
      },
      (err) => {
        console.error("Failed to copy text:", err);
      }
    );
  };

  return (
    <div className="max-w-2xl flex flex-col m-auto">
      <div>
        {usernames.length === 0 && (
          <div>
            <div>
              <p className="font-medium">What are your interests or hobbies?</p>
              <InterestsSelect />
            </div>
            <div>
              <p>Do you have any preferred keywords or themes?</p>
              <KeywordsSelect />
            </div>

            <div>
              <p>What style do you prefer for your username?</p>
              <StyleSelect />
            </div>
            <br />

            <div>
              <p>Are there any specific characters or symbols you want to include or exclude?</p>
              <LengthSelect />
            </div>
            <br />

            <div>
              <p>Would you like your real name or initials to be part of the username?</p>
              <NameInclusionSelect />
            </div>
            <br />

            <div>
              <p>Avoid specific keywords (Specify: ___________)</p>
              <AvoidKeywordsSelect />
            </div>

            <Button onClick={fetchDataFromGemini} loading={loading}>
              {loading ? "Generating..." : "Generate Usernames"}
            </Button>
          </div>
        )}
      </div>

      <div>
        {usernames.length > 0 && (
          <div>
            <h3>Available Usernames:</h3>
            {usernames.map((username, index) => (
              <div className="w-full flex flex-col m-1" key={index}>
                <Tag
                  color={colors[index % colors.length]}
                  className="p-2 text-lg font-semibold flex justify-between px-5"
                >
                  {username}
                  <Tooltip title="Copy">
                    <CopyOutlined onClick={() => handleCopy(username)} className="ml-2 cursor-pointer" />
                  </Tooltip>
                </Tag>
              </div>
            ))}
          </div>
        )}
        {takenUsernames.length > 0 && (
          <div>
            <h3>Taken Usernames:</h3>
            {takenUsernames.map((username, index) => (
              <div className="w-full flex flex-col m-1" key={index}>
                <Tag color="grey" className="p-2 text-lg font-semibold flex justify-between px-5">
                  {username}
                  <Tooltip title="Copy">
                    <CopyOutlined onClick={() => handleCopy(username)} className="ml-2 cursor-pointer" />
                  </Tooltip>
                </Tag>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
