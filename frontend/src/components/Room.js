import React from "react";
import { useState, useEffect, useContext } from "react";
import {
  useMatch,
  useParmas,
  Routes,
  Route,
  useParams,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Button from "@mui/material/Button";
import UserContext from "./UserContext";
const Room = ({ catchData, setUser }) => {
  // const { cox, setCox } = useContext(UseContext);
  const [guestCanPause, setguestCanPause] = useState(true);
  const [votesToSkip, setvotesToSkip] = useState(0);
  const [isHost, setHost] = useState(false);
  let navigate = useNavigate();
  const rcode = useMatch("/room/:roomcode");
  const [roomCode, setRoomCode] = useState(rcode);
  const location = useLocation();
  const [login, setLogin] = useState(true);
  const [spotifyAuthentication, setspotifyAuthentication] = useState(false);
  const value = useContext(UserContext);
  console.log(location, " useLocation Hook");
  let params = useParams();
  let params1 = params.roomcode;
  console.log(params1, "paramsroompage"); // "hotspur"
  // catchdata(params, "params trying to be lifted");
  const [test, setTest] = useState(null);
  // console.log(test);
  console.log(login, "initialized login as true");

  useEffect(() => {
    fetchData();
    console.log(`didMount:`);
  }, [isHost]);

  const fetchData = async () => {
    const response = await axios.get(
      "/get-room" + "?code=" + roomCode.params.roomcode
    );
    const data = response.data;
    console.log(data, "room response.data");
    setvotesToSkip(data.votes_to_skip);
    setHost(data.is_host.toString());
    setguestCanPause(data.guest_can_pause.toString());
    setTest(true);
    console.log(isHost, test, "host and test");
    // isHost ? authenticateSpotify() : null;
    // i need an if statment here to ensure the host is tru then to launch the authentatoin function
    //i think this is whuy im am on a loop i need to make ethese adjusrments :)

    // authenticateSpotify();
    // if (isHost && test) {
    //   //   const res2 = await axios.post("/join-room", codez, {
    //   //   headers: {
    //   //     "Content-Type": "application/json",
    //   //     "X-CSRFToken": csrftoken,
    //   //   },
    //   // }); //returns the data from api differ from fetch by not need another
    //   // // .then((response) => response)
    //   // // .then((res) =>  navigate(`/room/${roomCode}`));
    //   // const res3 = res2.data;
    //   // console.log(res3);
    //   // if (res2.status === 200) {
    //   //   // Handle success

    //   //   console.log("Request was successful:", res2.status);
    //   // }
    //   authenticateSpotify();
    // }
  };

  const leaveRoomCode = () => {
    // setLogin(false);
    const csrftoken = Cookies.get("csrftoken");
    axios
      .post("/leave-room", {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
      }) //returns the data from api differ from fetch by not need another
      .then((response) => console.log(response))
      .then((res) => navigate("/"));
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
    console.log(spotifyAuthentication);
    // need to change to async
    if (response.status) {
      const res2 = await axios.get("/spotify/get-auth-url");
      const res3 = res2.data;
      const res4 = res2.data.url;
      console.log(res3);
      console.log(res4);
      //// this reirects to spotify
      window.location.replace(res4);
    }
    // });
  };

  return (
    <div>
      <h3>{roomCode.params.roomcode}</h3>
      <p>Votes:{votesToSkip}</p>
      {console.log(guestCanPause)}
      <p>Gust Can Pause:{guestCanPause}</p>
      <p>Host:{isHost}</p>
      <p>Host:{value}</p>
      {console.log(isHost)}
      {/* <p>Gust Can Pause:{guestCanPause.toString()}</p>
      <p>Host:{isHost.toString()}</p> */}

      {/*leave room button  GOES HERE*/}

      <div>
        <Button onClick={leaveRoomCode}>Leave Rooom</Button>
      </div>
      <Link to="/">
        <Button>Go Home</Button>
      </Link>
    </div>
  );
};

export default Room;
