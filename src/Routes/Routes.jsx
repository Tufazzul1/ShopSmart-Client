import {
    createBrowserRouter,
  } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Root from "../Layout/Root";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      errorElement: <ErrorPage></ErrorPage>,
      children : [
        {
            path: "/",
            element : <Home></Home>
        },
        {
            path: "/login",
            element : <Login></Login>
        },
        {
            path: "/register",
            element : <Register></Register>
        },
      ]
    },
  ]);