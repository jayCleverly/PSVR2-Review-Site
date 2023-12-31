import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import Home from './pages/Home';
import ViewReview from './pages/ViewReview';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import ViewProfile from './pages/ViewProfile';
import CreateReview from './pages/CreateReview';
import PageNotFound from './pages/PageNotFound'


// creates routes for the website
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/view/:reviewId",
    element: <ViewReview/>,
  },
  {
    path: "/authenticate/sign-up",
    element: <SignUp/>,
  },
  {
    path: "/authenticate/login",
    element: <Login/>,
  },
  {
    path: "/profile/view/:userId",
    element: <ViewProfile/>,
  },
  {
    path: "/profile/create-review",
    element: <CreateReview/>,
  },
  {
    path: "/404",
    element: <PageNotFound/>,
  },
  {
    path: "*",
    element: <Navigate to={"/404"}/>,
  },
]);

// renders the routes
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
