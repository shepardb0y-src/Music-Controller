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

  const getRoomDetails = () => {
    fetch("/get-room" + "?code=" + roomcode.params.roomcode).then((response) =>
      response.json().then((data) => console.log(data.votes_to_skip))
    );
  };
  console.log(roomcode);
  getRoomDetails();
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
