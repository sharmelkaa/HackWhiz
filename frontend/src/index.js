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
import { store } from './store/store'
import { Provider } from 'react-redux'
import {CheckAuth} from "./components/HOC/CheckAuth";
import {NewPublication} from "./components/NewPublication";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        children: [
            {
                index: true,
                element: <WelcomePage/>
            },
            {
                path: '/:username',
                element: <CheckAuth><UserPage/></CheckAuth>
            },
            {
                path: '/:username/friends',
                element: <CheckAuth><FriendsList/></CheckAuth>
            },
            {
                path: '/:username/publications',
                element: <CheckAuth><PublicationsList/></CheckAuth>
            },
            {
                path: '/:username/publications/:id',
                element: <CheckAuth><Publication/></CheckAuth>
            },
            {
                path: '/admin',
                element: <CheckAuth><AdminPage/></CheckAuth>
            },
            {
                path: '/new_publication',
                element: <CheckAuth><NewPublication/></CheckAuth>
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
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
  </React.StrictMode>
);
