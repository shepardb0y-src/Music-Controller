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
import Spinner from "../components/Spinner";

import styled from "styled-components";

const Background = styled.div`
  // background-color: purple;
  display: flex;
  height: 900px;
  width: 700px;
  justify-content: center;
  align-items: center;
  // margin-top: 200px;
  color: goldenrod;
`;

const RadioBackground = styled.div`
  background-color: rgb(175, 43, 191);
`;
const TextfieldDiv = styled.div`
  background-color: white;
`;
const CreateRoomPage = ({ catchData }) => {
  const [guestCanPause, setguestCanPause] = useState(true);
  const [votesToSkip, setvotesToSkip] = useState(0);
  const [codes, setCodes] = useState("lifted code test");
  const [spotifyAuthentication, setspotifyAuthentication] = useState(false);
  const [isloading, setIsloading] = useState(false);
  let navigate = useNavigate();
  // console.log(dataone, "we lifiting state!");

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
    setIsloading(true);
    authenticateSpotify();
    const data = { votes_to_skip: votesToSkip, guest_can_pause: guestCanPause };
    console.log(data);
    const csrftoken = Cookies.get("csrftoken");

    const res = await axios.post("/create-room", data, {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
    });

    // const dataz = res.data;
    const code = res.data.code;
    console.log(code);

    //cant i jopin the room here ?
    navigate("/room/" + code);
    setIsloading(false);
    // this is going in the url so the UselOcation hook can grab it in the room
    setCodes(code);
    catchData(code);
    console.log(code, "codes!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    const codez = { code: code };

    const res2 = await axios.post("/join-room", codez, {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
    }); //returns the data from api differ from fetch by not need another
    // .then((response) => response)
    // .then((res) =>  navigate(`/room/${roomCode}`));
    const res3 = res2.data;
    console.log(res3);
    if (res2.status === 200) {
      // Handle success

      console.log("Request was successful:", res2.status);
    }
  };
  const authenticateSpotify = async () => {
    const response = await axios.get("/spotify/is-authenticated");
    //data.status
    console.log(response, "authspot");
    setspotifyAuthentication({ spotifyAuthentication: response.status });
    // .then((response) => response.json())
    // .then((data) => {
    //   this.setState({ spotifyAuthenticated: data.status });
    //   console.log(data.status);

    // need to change to async
    if (response.status) {
      const res2 = await axios.get("/spotify/get-auth-url");
      const res3 = res2.data;
      const res4 = res2.data.url;
      console.log(res3);
      console.log(res4);
      //// this reirects to spotify
      window.location.replace(res4);

      console.log(spotifyAuthentication);
      console.log(
        "connected!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
      );
    }
    // });
  };
  const handleGusetChange = (e) => {
    setguestCanPause(e.target.value === "true" ? true : false);
  };

  return (
    <Background>
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          {!isloading && (
            <Typography variant="h4" color="goldenrod">
              Create Room
            </Typography>
          )}
          {isloading && <Spinner />}
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl>
            {/* <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} /> */}
            {/* <FormHelperText color="secondary">
              Guest control of Playback State
            </FormHelperText> */}

            <h6>Guest control of Playback State</h6>
            <RadioBackground>
              <RadioGroup defaultValue="true" onChange={handleGusetChange}>
                <FormControlLabel
                  value="true"
                  control={<Radio color="primary" />}
                  label="Can Play"
                  labelPlacement="top"
                />
                <FormControlLabel
                  value="Pause"
                  control={<Radio color="primary" />}
                  label="Cannot play"
                  labelPlacement="bottom"
                />
              </RadioGroup>
            </RadioBackground>
          </FormControl>
        </Grid>

        <Grid item xs={12} align="center">
          <FormControl>
            {" "}
            <TextfieldDiv>
              <TextField
                color="secondary"
                focused
                type="number"
                size="small"
                onChange={handleVotesChange}
                required={true}
                defaultValue={votesToSkip}
                inputProps={{
                  min: 1,
                  style: { textAlign: "center" },
                }}
              />{" "}
              <FormHelperText color="goldenrod">
                Votes Required To Skip
              </FormHelperText>
            </TextfieldDiv>
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
          <Button color="primary" variant="contained" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    </Background>
  );
};

export default CreateRoomPage;
