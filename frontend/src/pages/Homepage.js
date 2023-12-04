import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const Container = styled.div`
  background-color: yellow;
  height: 100%;
  width: 100%;
`;
const Homepage = () => {
  return (
    <Container>
      <h1>Homepage</h1>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Button to="/join" component={Link}>
          Join a Room
        </Button>
        <Button to="/create" component={Link}>
          Create a Rooom
        </Button>
      </ButtonGroup>
    </Container>
  );
};

export default Homepage;
