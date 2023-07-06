import React, { Component } from "react";
import { createGlobalStyle } from "styled-components";
import { createRoot } from "react-dom/client";
import styled from "styled-components";
import Homepage from "./Homepage";
import CreateRoomPage from "./CreateRoomPage";
import JoinRoomPage from "./JoinRoomPage";

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

const Container = styled.div``;

const App = () => {
  return (
    <Container>
      <GlobalStyle />
      <h1>Music Controller</h1>
      <Homepage />
      <CreateRoomPage />
      <JoinRoomPage />
    </Container>
  );
};

export default App;

const root = document.getElementById("app");
createRoot(root).render(<App />);
