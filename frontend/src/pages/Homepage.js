import styled from "styled-components";
import React, { useState, useEffect, createContext } from "react";

import {
  useParams,
  Link,
  useNavigate,
  useMatch,
  useLocation,
} from "react-router-dom";
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
const Homepage = ({ dataone }) => {
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

  const [roomcode, setRoomCode] = useState({ roomcode: null });
  const rcode = useMatch("/room/:roomcode");
  const location = useLocation();
  // console.log(location, " useLocation Hook");
  // console.log(rcode, " usematch");
  // const [test, setTest] = useState("test");
  // const [loggin, setLoggin] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
    // console.log(codez, "code in the hompage2");
    // console.log(code);
    // catchdata(test);
    console.log(dataone, "dataone prop in useeffect of hompage");
  }, []);

  const fetchData = async () => {
    const response = await axios.get("/user-in-room");
    console.log(response, "user-in-room");
    // const res = response.data.code;
    // console.log(res);

    setRoomCode({ roomcode: response.data.code });
    console.log(roomcode, "state change of room code should be response");

    // data === roomcode && props === true
    // if (res === null) {
    //   console.log("null, response");
    //   return navigate([-1]);
    // } else navigate("/room/" + roomcode);
    /// re direct to room is there is a reeposne / even going to the null rooms after room is deleted
    //   if (response) {
    //     navigate("/room/" + roomcode);
    //   } else navigate("/");
    // };
  };

  console.log(dataone, "dataone prop, outside of use effect in homepage");
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
