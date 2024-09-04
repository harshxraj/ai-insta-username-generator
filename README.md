# Instagram Username Generator
## Overview

The **Instagram Username Generator** is a web application designed to help users create unique and personalized Instagram usernames based on their preferences and styles. It leverages the power of AI to generate creative usernames that align with the user's interests, preferred keywords, style choices, and more. Additionally, the app checks for the availability of generated usernames, ensuring that users get a list of potential names that are not already taken.

## Features

- **User Preferences Customization**: Customize your username preferences with options like interests, keywords, style, and character requirements.
- **AI-Powered Username Generation**: Utilizes the Google Gemini AI model to generate creative and unique usernames.
- **Availability Check**: Checks if the generated usernames are available on Instagram using the FastDL API.
- **Interactive and User-Friendly UI**: Built with React and Ant Design to provide an intuitive and responsive user experience.
- **Copy-to-Clipboard Feature**: Quickly copy generated usernames with a single click.

## Screenshots

![Instagram Username Generator Screenshot](https://github.com/user-attachments/assets/439aa1c7-9ae2-4bba-94eb-3a2cd3f97673)
![Instagram Username Generator Screenshot](https://github.com/user-attachments/assets/602f9191-7689-4e4c-ab09-f615b9166ffb)


## Tech Stack

- **Frontend**: React, TypeScript
- **UI Library**: Ant Design
- **Backend API**: Google Gemini AI, FastDL API
- **Deployment**: Vercel

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/harshxraj/ig-insta-username.git
   cd ig-insta-username
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add your API keys:

   ```bash
   NEXT_PUBLIC_API_KEY=
   NEXT_PUBLIC_IG=
   ```

4. **Run the app:**

   ```bash
   npm run dev
   ```

   This will start the app on `http://localhost:3000`.

## Usage

1. Open the app in your web browser.
2. Fill in your preferences, including interests, keywords, style, and more.
3. Click on the "Generate Usernames" button to create a list of potential Instagram usernames.
4. The app will display available usernames and indicate which ones are taken.
5. Use the "Copy" button to copy any username to your clipboard.

## Development

To contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## Roadmap

- [ ] Add more customization options (e.g., more style preferences, additional keywords).
- [ ] Improve AI prompt engineering for better suggestions.
- [ ] Implement more robust error handling and user feedback.
- [ ] Add unit and integration tests.
