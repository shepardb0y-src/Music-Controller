import React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import Cookies from "js-cookie";
import axios from "axios";

import { Link } from "react-router-dom";

import { useState } from "react";

const JoinRoomPage = () => {
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState();

  const handleFieldChange = (e) => {
    setRoomCode(e.target.value);
    console.log(roomCode);
  };

  const handleRoomButtonedPressed = (e) => {
    // const data = { votes_to_skip: votesToSkip, guest_can_pause: guestCanPause };
    // console.log(data);
    // const csrftoken = Cookies.get("csrftoken");

    // axios
    //   .post("/create-room", data, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       "X-CSRFToken": csrftoken,
    //     },
    //   }) //returns the data from api differ from fetch by not need another
    //   .then((response) => response)
    //   .then((res) => navigate("/room/" + res.data.code));
    console.log("onclick :", roomCode);
  };
  //
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" color="initial">
            JOin a Room
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={error}
            label="code"
            placeholder="Enter Room COde"
            value={roomCode}
            helperText={roomCode}
            variant="outlined"
            onChange={handleFieldChange}
          ></TextField>
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
          <Button color="secondary" variant="contained" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default JoinRoomPage;
