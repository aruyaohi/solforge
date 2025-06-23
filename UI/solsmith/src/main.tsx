// src/main.jsx (or main.tsx)
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import App from './App.jsx'; // Your main App component
import './index.css'; // Your global CSS, including Tailwind

import Dashboard from './screens/dashboard.tsx';
import Home from './screens/home.tsx';
// import ErrorPage from './pages/ErrorPage.jsx'; // Good practice to include this for 404s


// Define your routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Your main layout component (where <Outlet /> will be)
    // errorElement: <ErrorPage />, // Strongly recommend keeping an ErrorPage for 404s/errors
    children: [ // Nested routes will render within an <Outlet /> in App.jsx
      {
        index: true, // IMPORTANT: This makes `Home` render when the path is exactly '/'
        element: <Home />,
      },
      {
        path: 'dashboard', // CORRECT: Path is relative to the parent ('/') -> results in /dashboard
        element: <Dashboard />,
      },
      // ... other routes
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);