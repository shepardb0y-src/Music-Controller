import React, { Component } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Switch,
  RouterProvider,
  Route,
  Link,
  Redicrect,
} from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { createRoot } from "react-dom/client";
import styled from "styled-components";
import Homepage from "../pages/Homepage";
import CreateRoomPage from "../pages/CreateRoomPage";
import JoinRoomPage from "../pages/JoinRoomPage";

//Global styles

const GlobalStyle = createGlobalStyle`
  /* Add your global styles here */
  html,body{
    background-color:red;
    height: 100%;
    margin:0;
    padding:0;
    }
    
    #main{
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    
    }
    #app {
    width: 100%;
    height: 100%;
    display: flex;
    
    }
  /* You can add more global styles as needed */
`;

// App Component Styles

const Container = styled.div``;

// createBrowserouter function

// root component

const Root = () => {
  <>
    <div>
      <Outlet></Outlet>
    </div>
  </>;
};

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Root />} />
        <Route path="/join" element={<JoinRoomPage />} />
        <Route path="/create" element={<CreateRoomPage />} />
        <Route index element={<Homepage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;

const root = document.getElementById("app");
createRoot(root).render(<App />);
