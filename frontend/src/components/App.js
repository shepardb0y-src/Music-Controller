import React, { Component, useState, useEffect, us } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Switch,
  RouterProvider,
  Route,
  Link,
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
  const [roomcode, setRoomCode] = useState({ roomcode: null });
  const [data, setdata] = useState("");

  // useEffect(() => {
  //   fetchData();
  //   console.log(`didMount:`);

  // }, []);

  // const fetchData = async () => {
  //   const response = await axios.get("/user-in-room");
  //   const data = response.data.code;
  //   setRoomCode(data.code);
  //   console.log(roomcode);
  //   console.log(data);
  // };

  //for lifting state

  const fetchData = (data) => {
    console.log(data, "prop passed from child to parent");
    // setdata(item);
  };

  const clearRoom = () => {
    setRoomCode({
      code: null,
    });
  };
  // const changelogin = () => {
  //   setLoggin(false);
  // };
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Root />} /> ?
        <Route path="/join" element={<JoinRoomPage />} />
        <Route path="/create" element={<CreateRoomPage />} />
        <Route path="/room/:roomcode" element={<Room />} />
        <Route index element={<Homepage size={100} catchdata={fetchData} />} />
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
