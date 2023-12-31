import styled from "styled-components";
import React, { useState, useEffect, createContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import axios from "axios";

const Container = styled.div`
  background-color: yellow;
  height: 100%;
  width: 100%;
`;
const Homepage = ({ size, catchdata }) => {
  console.log(size);
  // const [roomcode, setRoomCode] = useState(null);
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

  const [roomcode, setRoomCode] = useState("");
  const [test, setTest] = useState("test");
  // const [loggin, setLoggin] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
    catchdata(test);
  }, [roomcode]);

  const fetchData = async () => {
    const response = await axios.get("/user-in-room");
    console.log(response);
    const data = response.data.code;
    console.log(data);
    console.log(roomcode);
    setRoomCode(data);
    console.log(roomcode);

    // data === roomcode && props === true
    // if (data === roomcode) {
    //   return navigate("/room/" + roomcode);
    // } else return navigate("/");

    // if (data) {
    //   return navigate("/room/" + roomcode);
    // } else navigate("/");
  };

  return (
    <Container>
      <h1>Homepage</h1>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Link to="/join">
          <Button>Join a Room</Button>
        </Link>
        <Link to="/create">
          <Button>Create a Rooom</Button>
        </Link>
      </ButtonGroup>
    </Container>
  );
};

export default Homepage;
