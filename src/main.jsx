import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import App from './App.jsx'
import About from './About.jsx'
import './index.css'
import ReactGA from "react-ga4";

ReactGA.initialize("G-96FFN4P2GY");

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
        path: "/about",
        element: <About />,
      },
  ]);

ReactDOM.createRoot(document.getElementById('root')).render(

    <RouterProvider router={router} />
    // <App />

)
