import React from "react";
import { useState, useEffect } from "react";
import { useMatch, Routes, Route, useParams } from "react-router-dom";
import axios from "axios";
const Room = () => {
  const [guestCanPause, setguestCanPause] = useState(true);
  const [votesToSkip, setvotesToSkip] = useState(0);
  const [isHost, setHost] = useState(false);

  const roomcode = useMatch("/room/:roomcode");
  //   const roomcode = props.match.params;
  // Access params from the matched URL
  // params is a special attribute connted to the router hook

  /// convert to axios
  // currently http://127.0.0.1:8000/room/KNOPPE is giving a 404 error on GET request from
  // const getRoomDetails = () => {
  //   fetch("/get-room" + "?code=" + roomcode.params.roomcode).then((response) =>
  //     response.json().then((data) => setvotesToSkip(data.votes_to_skip))
  //   );
  // };g
  // const getRoomDetails = () => {
  //   axios
  //     .get("/get-room" + "?code=" + roomcode.params.roomcode) //returns the data from api differ from fetch by not need another
  //     .then((response) => response)
  //     .then((res) =>
  //       setvotesToSkip({
  //         votesToSkip: res.data.votes_to_skip,
  //       })
  //     );

  //   console.log(roomcode);
  // };
  // getRoomDetails();

  const fetchData = async () => {
    const response = await axios.get(
      "/get-room" + "?code=" + roomcode.params.roomcode
    );
    const data = response.data;
    console.log(data);
    setvotesToSkip(data.votes_to_skip);
    setHost(data.is_host.toString());
    setguestCanPause(data.guest_can_pause.toString());
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <h3>{roomcode.params.roomcode}</h3>
      <p>Votes:{votesToSkip}</p>
      {console.log(guestCanPause)}
      <p>Gust Can Pause:{guestCanPause}</p>
      <p>Host:{isHost}</p>
      {console.log(isHost)}
      {/* <p>Gust Can Pause:{guestCanPause.toString()}</p>
      <p>Host:{isHost.toString()}</p> */}
    </div>
  );
};

export default Room;
