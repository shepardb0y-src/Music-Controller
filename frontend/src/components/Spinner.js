import React from "react";
import styled from "styled-components";
const Spinner = () => {
  const LoadingDiv = styled.div`
    height: 875px;
    width: 800px;
    color: red;
    background-color: yellow;
  `;

  return <LoadingDiv>Is loading</LoadingDiv>;
};

export default Spinner;
