import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "../layout/PublicLayout";
import Home from "../pages/main/Home";
import GuestRoute from "./GuestRoute";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import PrivateLayout from "../layout/PrivateLayout";
import AddTask from "../pages/task/AddTask";
import EditTask from "../pages/task/EditTask";

export const router = createBrowserRouter([
  {
    element: <PrivateLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path:'/addTask',
        element:<AddTask/>
      },
      {
        path:'/editTask/:id',
        element:<EditTask/>
      },
    ],
  },
  {
    element: <PublicLayout />,
    children: [
      {
        element: <GuestRoute />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Register />,
          },
        ],
      },
    ],
  },
]);
