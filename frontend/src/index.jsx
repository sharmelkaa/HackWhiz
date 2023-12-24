import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { WelcomePage } from "./pages/welcome";
import { UserPage } from "./pages/user";
import { Friends } from "./pages/friends";
import { Publications } from "./pages/publications";
import { AdminPage } from "./pages/admin";
import { SignUp } from "./pages/signup";
import { Root } from "./components/Root";
import { LogIn } from "./pages/login";
import { store } from './store/store'
import { Provider } from 'react-redux'
import {CheckAuth} from "./components/CheckAuth";
import {NewPublication} from "./pages/new_publication";

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
                element: <CheckAuth><Friends/></CheckAuth>
            },
            {
                path: '/:username/publications',
                element: <CheckAuth><Publications/></CheckAuth>
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
