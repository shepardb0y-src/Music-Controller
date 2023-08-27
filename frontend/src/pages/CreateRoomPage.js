import * as React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import styled from "styled-components";

const Background = styled.div`
  // background-color: purple;
  height: 100%;
  width: 100%;
`;

const CreateRoomPage = () => {
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
            <FormHelperText>Guest control of Playback State</FormHelperText>
            <RadioGroup defaultValue="true">
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
              required={true}
              // defaultValue={this.defaultVotes}
              inputProps={{
                min: 1,
                style: { textAlign: "center" },
              }}
            />
            <FormHelperText align="center">
              Votes Required To Skip
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} align="center">
          <Button color="primary" variant="contained">
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
