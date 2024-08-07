import React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import Cookies from "js-cookie";
import axios from "axios";
import { Link, useNavigate, useHistory } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";

const JoinRoomPage = () => {
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState(false);
  const [helperText, setHelpertext] = useState("");
  let navigate = useNavigate();

  const handleFieldChange = (e) => {
    setRoomCode(e.target.value);
    console.log(roomCode);
  };

  const handleRoomButtonedPressed = (e) => {
    const code = { code: roomCode };
    console.log(code);
    const csrftoken = Cookies.get("csrftoken");

    axios
      .post("/join-room", code, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
      }) //returns the data from api differ from fetch by not need another
      // .then((response) => response)
      // .then((res) =>  navigate(`/room/${roomCode}`));

      .then((response) => {
        // Check if the response meets a certain condition
        if (response.status === 200) {
          // Handle success
          navigate(`/room/${roomCode}`);
          console.log("Request was successful:", response);
        }
      })
      .catch((err) => {
        // Handle errors
        setError(true);
        setHelpertext("Invalid Room Code");
        console.error("An error occurred:", err);
      });
  };

  const JoinRoomContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 700px;
    width: 700px;
  `;

  const TextfieldDiv = styled.div`
    background-color: white;
  `;

  return (
    <JoinRoomContainer>
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" color="goldenrod">
            Join a Room
          </Typography>
          <TextfieldDiv>
            <TextField
              color="primary"
              error={error}
              label="code"
              placeholder="Enter Room COde"
              value={roomCode}
              helperText={helperText}
              variant="outlined"
              onChange={handleFieldChange}
              size="small"
            />
          </TextfieldDiv>
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={handleRoomButtonedPressed}
          >
            Enter room
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="primary" variant="contained" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    </JoinRoomContainer>
  );
};

export default JoinRoomPage;
