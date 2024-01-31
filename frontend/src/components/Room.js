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
  const [currentSong, setcurrentSong] = useState("");
  const [artist, setArtist] = useState("");
  const [images, setImages] = useState("");
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
    getCurrentSong();
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
  const getCurrentSong = async () => {
    const response = await axios.get("/spotify/current-song");
    //data.status
    console.log(response.data.item.album.images[0].url);
    console.log(response);
    setArtist(response.data.item.artists[0].name);
    setcurrentSong(response.data.item.name);
    setImages(response.data.item.album.images[0].url);
    // console.log(response);
    // console.log(response);
    // console.log(response);

    // # item = response.get('item')
    // # duration = item.get('duration_ms')
    // # progress = response.get('progress_ms')
    // # album_cover = item.get('album').get('images')[0].get('url')
    // # is_playing = response.get('is_playing')
    // # song_id = item.get('id')

    // });
  };

  return (
    <div>
      <h1>Artist : {artist}</h1>
      <h2>Album Cover</h2>
      <img src={images} alt="Album Cover" />
      <h1>Current Song : {currentSong}</h1>

      <p>Host:{isHost}</p>
      {console.log(isHost)}

      <div>
        <Button onClick={leaveRoomCode}>Leave Rooom</Button>
      </div>

      <Link to="/join">
        <Button>Join a Room</Button>
      </Link>
    </div>
  );
};

export default Room;
