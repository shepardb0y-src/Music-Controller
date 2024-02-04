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
import LinearProgress from "@mui/material/LinearProgress";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

const Room = ({ catchData, setUser }) => {
  // const { cox, setCox } = useContext(UseContext);
  // # item = response.get('item')
  // # duration = item.get('duration_ms')
  // # progress = response.get('progress_ms')
  // # album_cover = item.get('album').get('images')[0].get('url')
  // # is_playing = response.get('is_playing')
  // # song_id = item.get('id')
  const [guestCanPause, setguestCanPause] = useState(true);
  const [duration, setDuration] = useState("");
  const [progress, setProgress] = useState("");
  const [isPlaying, setIsPlaying] = useState("");
  const [songId, setSongId] = useState("");
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
    // getCurrentSong();
    setInterval(() => {
      getCurrentSong();
    }, 1000);
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
    setDuration(response.data.item.duration_ms);
    setProgress(response.data.progress_ms);
    setIsPlaying(response.data.is_playing);
    setSongId(response.data.item.id);
    console.log(response.data.item.duration_ms, "duration");
    console.log(response.data.progress_ms, "progress");
    console.log(response.data.is_playing, "isplaying");
    console.log(response.data.item.id, "song id");

    // # item = response.get('item')
    // # duration = item.get('duration_ms')
    // # progress = response.get('progress_ms')
    // # album_cover = item.get('album').get('images')[0].get('url')
    // # is_playing = response.get('is_playing')
    // # song_id = item.get('id')
  };
  const songProgress = (progress / duration) * 100;
  return (
    <div>
      <img src={images} alt="Album Cover" />
      <h2>Current Song : {currentSong}</h2>
      <h3>Artist : {artist}</h3>

      {isPlaying ? <PlayArrowIcon /> : <PauseIcon />}
      <LinearProgress variant="determinate" value={songProgress} />

      <p>Host:{isHost}</p>
      <p>Room Code:{params.roomcode}</p>

      {console.log(isHost)}

      <div>
        <Link to="/join">
          <Button>Join a Room</Button>
        </Link>
        <Button onClick={leaveRoomCode}>Leave Rooom</Button>
      </div>
    </div>
  );
};

export default Room;
