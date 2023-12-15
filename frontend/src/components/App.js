import React, { Component, useState, useEffect, us } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Switch,
  RouterProvider,
  Route,
  Link,
  Redicrect,
  useNavigate,
} from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { createRoot } from "react-dom/client";
import styled from "styled-components";
import Homepage from "../pages/Homepage";
import CreateRoomPage from "../pages/CreateRoomPage";
import JoinRoomPage from "../pages/JoinRoomPage";
import Room from "./Room";
import axios from "axios";

//Global styles
//render for route
// render={()=>{ return roomcode
//   ?(<Redirect to={`/room/${roomcode}`: re})

//   }}

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

  // render={() => {
  //   return this.state.roomCode ? (
  //     <Redirect to={`/room/${this.state.roomCode}`} />
  //   ) : (
  //     this.renderHomePage()
  //   );
  // }}

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Root />} /> ?
        <Route path="/join" element={<JoinRoomPage />} />
        <Route path="/create" element={<CreateRoomPage />} />
        <Route path="/room/:roomcode" element={<Room />} />
        <Route index element={<Homepage />} />
      </Route>
    )
  );

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;

const root = document.getElementById("app");
createRoot(root).render(<App />);
