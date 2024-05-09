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
  // display: flex;
  // align-items: center;
  // justify-content: center;
  background-color: purple;
  height: 100%;
  width: 100%;
  // flex-direction: column;
`;
const HomepageContainer = styled.div`
  margin: 0 0 500px 0;
  margin-left: 875px;
  // display: flex;
  // align-items: center;
  // justify-contenr: center;
`;
const ElementContainer = styled.div`
  // display: flex;
  // align-items: center;
  // justify-content: center;
`;
const ButtonContainer = styled.div`
  margin-left: 840px;
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
  }, [roomcode]);

  const fetchData = async () => {
    const response = await axios.get("/user-in-room");
    console.log(response, "user-in-room");
    // const res = response.data.code;
    // console.log(res);

    setRoomCode(response.data.code);
    console.log(
      roomcode,
      "state change of room code should be response, used to only happen when i would join the room manually now it shows when i create the room, now dosent work for spotify redirect "
    );

    // data === roomcode && props === true
    // if (res === null) {
    //   console.log("null, response");
    //   return navigate([-1]);
    // } else navigate("/room/" + roomcode);
    /// re direct to room is there is a reeposne / even going to the null rooms after room is deleted
    // if (response) {
    //   navigate("/room/" + roomcode);
    // } else navigate("/");
    //nullish coalacing to direct route to hompage if the response is falsy or nll then i made a if statment if trthy to navigate to the room page.
    response ?? navigate("/");
    if (response.data.code) {
      console.log(response);
      console.log(roomcode);
      // setRoomCode({ roomcode: null });
      navigate("/room/" + roomcode);
    } else navigate("/");
  };

  console.log(dataone, "dataone prop, outside of use effect in homepage");
  return (
    <Container>
      <ElementContainer>
        <HomepageContainer>
          <h1>Music Ballot</h1>
        </HomepageContainer>
        <ButtonContainer>
          {" "}
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
        </ButtonContainer>
      </ElementContainer>
    </Container>
  );
};

export default Homepage;
