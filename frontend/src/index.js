import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { WelcomePage } from "./components/WelcomePage";
import { UserPage } from "./components/UserPage";
import { FriendsList } from "./components/FriendsList";
import { PublicationsList } from "./components/PublicationsList";
import { Publication } from "./components/Publication";
import { AdminPage } from "./components/AdminPage";
import { SignUp } from "./components/SignUp";
import { Root } from "./components/Root";
import { LogIn } from "./components/LogIn";



const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                index: true,
                element: <WelcomePage />
            },
            {
                path: '/:username',
                element: <UserPage />
            },
            {
                path: '/:username/friends',
                element: <FriendsList/>,
            },
            {
                path: '/:username/publications',
                element: <PublicationsList />
            },
            {
                path: '/:username/publications/:id',
                element: <Publication />
            },
            {
                path: '/admin',
                element: <AdminPage />
            }
        ]
    },
    {
        path: '/login',
        element: <LogIn />
    },
    {
        path: '/signup',
        element: <SignUp />
    }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
