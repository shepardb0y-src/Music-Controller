import * as React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
// import TextField from "@mui/material/TextField";
// import FormerHelperText from "@mui/material/FormerHelperText";
// import FormControl from "@mui/material/FormControl";
// import Radio from "@mui/material/Radio";
// import RadioGroup from "@material-ui/RadioGroup";
// import FormControlLabel from "@mui/material/FormControlLablel";

import styled from "styled-components";

const Background = styled.div`
  background-color: purple;
  height: 100%;
  width: 100%;
`;

const CreateRoomPage = () => {
  return (
    <Background>
      <Grid item xs={12} align="center">
        <Typography variant="h4" color="initial">
          Create Room
        </Typography>
      </Grid>
    </Background>
  );
};

export default CreateRoomPage;
