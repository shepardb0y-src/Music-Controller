import React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";

import { Link } from "react-router-dom";

import { useState } from "react";

const JoinRoomPage = () => {
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");
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
            // error={{ error }}
            label="code"
            placeholder="Enter Room COde"
            // value={{ roomCode }}
            // helperText={{ error }}
            variant="outlined"
          ></TextField>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="primary" variant="contained" onClick>
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
