# Documentation

## Tech stack

1. Vite
2. React.js
3. Typescript
4. Tailwind CSS
5. React query

## Installation

1. Unzip project
2. Install dependencies `npm install`
3. Create a `.env` file in the main folder of your project. Copy the settings from .env.example into it and replace any example values with your real ones

```
VITE_BASE_URL=http://localhost:5000/api/user
```

4. Run project with `npm run dev`

## Folder Structure

1. src - The main directory that contains all application code, components,context,protected, pages, service, utils.

2. components - Contains individual, reusable UI components used across different parts of the app.

3. pages - This folder contains the pages of the app that are shown in the browser, like the dashboard, login-page, profile, register-page, update-blog-page.

4. The protected folder contains two critical files - auth-redirect and protected-route.
   auth-redirect:Redirects authenticated users to the profile/dashboard after login or registration.Blocks access to login/register pages if the user is already authenticated.
   protected-route:Ensures only authenticated users can access protected pages like the profile.Redirects unauthenticated users to the login page.

5. context-api- The Context API centrally manages and shares data across components
6. services - This folder is used to set up and manage API calls, so the app can communicate with external services or database.
7. utils - Sets up axios for making API request.
8. types - Defines data types used across the app for consistency and easier management.

## CSS framework

1. Tailwind CSS - Used for styling the UI quickly and consistently.

## External CSS

1. Index.css - Contains additional custom CSS for specific styles not covered by Tailwind.

App - manages all the routes to navigate between pages in the app.
