import React from "react";
import { useState } from "react";
import { useMatch, Routes, Route, useParams } from "react-router-dom";
const Room = () => {
  const [guestCanPause, setguestCanPause] = useState(true);
  const [votesToSkip, setvotesToSkip] = useState(0);
  const [isHost, setHost] = useState(false);

  const roomcode = useMatch("/room/:roomcode");
  //   const roomcode = props.match.params;
  // Access params from the matched URL
  let params = useParams("/room/:roomcode");
  console.log(roomcode);
  return (
    <div>
      <h3>{roomcode.params.roomcode}</h3>
      <p>Votes:{votesToSkip}</p>
      <p>Gust Can Pause:{guestCanPause}</p>
      <p>Host:{isHost}</p>
    </div>
  );
};

export default Room;
