import styled from "styled-components";
import React from "react";
const Container = styled.div`
  background-color: yellow;
  height: 100%;
  width: 100%;
`;
const Homepage = () => {
  return (
    <Container>
      <h1>Homepage</h1>
    </Container>
  );
};

export default Homepage;
