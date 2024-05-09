import React, { Component, useState, useEffect, us } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Switch,
  RouterProvider,
  Route,
  Link,
  useNavigate,
  useParams,
  useOutletContext,
} from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { createRoot } from "react-dom/client";
import styled from "styled-components";
import Homepage from "../pages/Homepage";
import CreateRoomPage from "../pages/CreateRoomPage";
import JoinRoomPage from "../pages/JoinRoomPage";
import Room from "./Room";
import axios from "axios";
import UserContext from "./UserContext";
// render={()=>{ return roomcode
//   ?(<Redirect to={`/room/${roomcode}`: re})

//   }}

const GlobalStyle = createGlobalStyle`
  /* Add your global styles here */

    #app {
    display: flex;
    justify-content:center;
    align-items:center;
    
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
  const [roomcode, setRoomCode] = useState("");
  const [dataone, setdataone] = useState("");
  const [user, setUser] = useState("user context");
  const [test, setTest] = useState("test");
  let params = useParams();
  // console.log(params.roomcode, "params, in app"); // "hotspur"

  console.log(user, "roomcode");

  useEffect(() => {
    catchData();
    console.log(dataone, "return code ");
    // setTest(codez);
    // let codez = dataone;
    // console.log(codez, "codez");
    // console.log(test, "test");

    // console.log(dataone.roomcode, "dataone lifted outside of fetch app");

    //im trying to grab the room code from dataone to pas to the homepage routee route
    // if (dataone) {
    //   setRoomCode(dataone);
    //   console.log(roomcode, "if bloack in app use eefect");
    // }
  }, [dataone]);

  // const fetchData = async () => {
  //   const response = await axios.get("/user-in-room");
  //   const data = response.data.code;
  //   setRoomCode(data.code);
  //   console.log(roomcode);
  //   console.log(data);
  // };

  //for lifting state
  // console.log(dataone, "dataone lifted outside of fetch app with golbal state");
  // let codez = dataone;
  // console.log(codez, "codez");

  const catchData = (code) => {
    // console.log(data, "prop passed from child to parent");
    console.log(code, "lifted from create room to APP");
    // let test = code;
    // console.log(test, "+ roomcode");

    setdataone(code);

    console.log(dataone, "dataone lifted to APp!");
  };
  // console.log(user, "context");

  // const changelogin = () => {
  //   setLoggin(false);
  // };
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Root />} />
        <Route index element={<Homepage dataone={dataone} />} />

        <Route path="/join" element={<JoinRoomPage />} />
        <Route
          path="/create"
          element={<CreateRoomPage catchData={catchData} />}
        />
        <Route path="/room/:roomcode" element={<Room />} />
      </Route>
    )
  );

  return (<GlobalStyle />), (<RouterProvider router={router} />);
};

export default App;

const root = document.getElementById("app");
createRoot(root).render(<App />);
