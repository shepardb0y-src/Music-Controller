import styled from "styled-components";
import * as React from "react";
import Button from "@mui/material/Button";

const Container = styled.div`
  background-color: red;
`;
const Homepage = () => {
  return (
    <Container>
      <h1>Homepage</h1>
      <Button variant="contained">Hello World</Button>;
    </Container>
  );
};

export default Homepage;
