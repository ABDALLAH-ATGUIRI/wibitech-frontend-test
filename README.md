# Wibitech Frontend Test

## Overview

This is the frontend for the Wibitech project, named "Taski". The application is built using React and Vite, and it leverages Tailwind CSS for styling. It provides a user interface for managing tasks with authentication support.

## Features

- User authentication and authorization
- Task creation, update, and deletion
- Responsive design with Tailwind CSS
- Role-based access control
- Route protection using React Router

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ABDALLAH-ATGUIRI/wibitech-frontend-test.git
   cd wibitech-frontend-test
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and configure it with necessary environment variables:

   ```
   VITE_API_URL=https://recruter-backend.vercel.app/
   ```

4. **Run the application:**

   ```bash
   npm run dev
   ```

   This will start the development server.

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run preview`: Previews the production build.
- `npm run format`: Formats the code using Prettier.
- `npm run lint`: Lints the code using ESLint.
- `npm run deploy`: Builds the application and deploys it to GitHub Pages.

## Project Structure

- **src/components**: Contains reusable React components.
- **src/pages**: Contains the main pages of the application.
- **src/services**: Contains service files for API interactions.
- **src/context**: Contains context providers for state management.
- **src/lib**: Contains utility libraries and configurations.

## License

This project is licensed under the MIT License.

