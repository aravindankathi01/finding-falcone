import React from 'react';
import ReactDOM from 'react-dom/client';
import Body from './Components/Body';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import ResultPage from './Components/ResultPage';

const appRouter = createBrowserRouter([

  {
    path:"/",
    element:<App/>,
    children:[
      {
         path:"/",
         element:<Body/>
      },
      { 
        path:"/results",
        element:<ResultPage/>
      }
    ]
  }
  

])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <RouterProvider router = {appRouter}>

  </RouterProvider>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
