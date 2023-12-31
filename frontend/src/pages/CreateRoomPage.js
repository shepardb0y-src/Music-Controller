import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Cookies from "js-cookie";
import axios from "axios";

import styled from "styled-components";

const Background = styled.div`
  // background-color: purple;
  height: 100%;
  width: 100%;
`;

const CreateRoomPage = () => {
  const [guestCanPause, setguestCanPause] = useState(true);
  const [votesToSkip, setvotesToSkip] = useState(0);
  const [codes, setCodes] = useState(0);
  let navigate = useNavigate();

  useEffect(() => {
    console.log(votesToSkip, guestCanPause);
    // const [guestCanPause, setguestCanPause] = useState(true);
    // const [votesToSkip, setvotesToSkip] = useState(0);
    //   // ... rest of your component code
  }, []); // Make sure to include any dependencies if needed

  const handleVotesChange = (e) => {
    setvotesToSkip(e.target.value);
  };
  const handleRoomButtonedPressed = async (e) => {
    const data = { votes_to_skip: votesToSkip, guest_can_pause: guestCanPause };
    console.log(data);
    const csrftoken = Cookies.get("csrftoken");

    //     axios
    //       .post("/create-room", data, {
    //         headers: {
    //           "Content-Type": "application/json",
    //           "X-CSRFToken": csrftoken,
    //         },
    //       }) //returns the data from api differ from fetch by not need another
    //       // .then((response) => response)
    //       // .then((res) => setCode(res.data.code));
    // // if i turn this into axios i can extraxt the roomcode and pas as props to home page can only naviaget in the .then
    //     // console.log(code);
    //     // navigate("/room/"+ code)

    const res = await axios.post("/create-room", data, {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
    });

    const dataone = res.data;
    const code = res.data.code;
    console.log(dataone);

    console.log(code);

    navigate("/room/" + code);
    setCodes(codes);
    console.log(code, "codes!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  };
  const handleGusetChange = (e) => {
    setguestCanPause(e.target.value === "true" ? true : false);
  };

  return (
    <Background>
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" color="initial">
            Create Room
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl>
            {/* <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} /> */}
            <FormHelperText>Guest control of Playback State</FormHelperText>
            <RadioGroup defaultValue="true" onChange={handleGusetChange}>
              <FormControlLabel
                value="true"
                control={<Radio color="primary" />}
                label="Play/Pause"
                labelPlacement="top"
              />
              <FormControlLabel
                value="false"
                control={<Radio color="secondary" />}
                label="No Control"
                labelPlacement="bottom"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12} align="center">
          <FormControl>
            <TextField
              type="number"
              size="small"
              onChange={handleVotesChange}
              required={true}
              defaultValue={votesToSkip}
              inputProps={{
                min: 1,
                style: { textAlign: "center" },
              }}
            />
            <FormHelperText>Votes Required To Skip</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={handleRoomButtonedPressed}
          >
            Create a Room
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          {/* to="/" component={Link} */}
          <Button color="secondary" variant="contained">
            Back
          </Button>
        </Grid>
      </Grid>
    </Background>
  );
};

export default CreateRoomPage;
