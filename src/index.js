import "./index.css"
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createHashRouter } from "react-router-dom"
import Root from "./routes/Root.js"
import Departments from './routes/Departments.js';
import About from './routes/About.js';
import DepartmentDetail  from "./routes/DepartmentDetail.js"

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Departments />
      },
      {
        path: "About",
        element: <About />
      },
      {
        path: "departments/:departmentId",
        element: <DepartmentDetail />
      }
    ],
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);