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
import SkipNextIcon from "@mui/icons-material/SkipNext";
import IconButton from "@mui/material/IconButton";
import styled from "styled-components";
import Spinner from "../components/Spinner";

const RoomContainer = styled.div`
  // display: flex;
  // justify-content: center;
  // align-items: center;
  background-image: url("/images/galaxy-gif.webp")
  flex-direction: column;
  height: 700px;
  width: 700px;
  background-color: black;

`;

const SongInfo = styled.div`
  // box-sizing: border-box;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // flex-direction: column;
  // height: 800px;
  // width
  img {
    height: 665px;
    width: 700px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  background-color: purple;
`;

const VotesToSkip = styled.div``;
const HostRoomDiv = styled.div`
  background-color: black;
`;
const ButtonDiv = styled.div`
  background-color: black;
`;

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
  const [isloading, setIsloading] = useState(true);
  console.log(location, " useLocation Hook");
  const [votes, setVotes] = useState("");
  let params = useParams();
  let params1 = params.roomcode;
  console.log(params1, "paramsroompage"); // "hotspur"
  // catchdata(params, "params trying to be lifted");
  const [test, setTest] = useState(null);
  // console.log(test);
  console.log(login, "initialized login as true");

  useEffect(() => {
    // setIsloading(true);
    fetchData();
    console.log(`didMount:`);
    const timer = setTimeout(() => {
      setIsloading(false);
    }, 1500);

    // return () => clearTimeout(timer);
    // getCurrentSong();
    setInterval(() => {
      getCurrentSong();
    }, 1000);
    playSong();
    // setIsloading(false);
  }, [isHost, votes, votesToSkip]);

  const fetchData = async () => {
    const response = await axios.get(
      "/get-room" + "?code=" + roomCode.params.roomcode
    );
    const data = response.data;
    console.log(data, "room response.data");

    setvotesToSkip(data.votes_to_skip);
    setHost(data.is_host.toString());
    setguestCanPause(data.guest_can_pause.toString());
    // setTest(true);
    // console.log(isHost, test, "host and test");
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

    console.log(response);

    console.log(response.data.image_url);

    setArtist(response.data.artist);
    setcurrentSong(response.data.title);
    setImages(response.data.image_url);
    setDuration(response.data.duration);
    setProgress(response.data.time);
    setIsPlaying(response.data.is_playing);
    setSongId(response.data.id);
    setvotesToSkip(response.data.votes_required);
    setVotes(response.data.votes);
    console.log(votes, votesToSkip);
  };

  const pauseSong = () => {
    // const csrftoken = Cookies.get("csrftoken");
    const res = axios.put(
      "/spotify/pause",
      {},
      {
        headers: {
          // "X-CSRFToken": csrftoken,
        },
      }
    ); //returns the data from api differ from fetch by not need another

    const response = res;
    console.log(response);
  };

  const playSong = () => {
    // const csrftoken = Cookies.get("csrftoken");
    const res = axios.put("/spotify/play", {
      headers: {
        "Content-Type": "application/json",
        // "X-CSRFToken": csrftoken,
      },
    }); //returns the data from api differ from fetch by not need another

    const response = res.data;
    console.log(response);

    // / im getting the error prmise is pending
  };

  const skipSong = () => {
    const csrftoken = Cookies.get("csrftoken");
    const res = axios.post("/spotify/skip", {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
    });
    const response = res.data;
    console.log(response);
  };

  const songProgress = (progress / duration) * 100;
  return (
    <RoomContainer>
      {isloading ? (
        <Spinner />
      ) : (
        <HostRoomDiv>
          <SongInfo>
            <img src={images} alt="Album Cover" />
            <h2>Current Song : {currentSong}</h2>
            <h3>Artist : {artist}</h3>
          </SongInfo>
          <ButtonContainer>
            <IconButton
              color="purple"
              aria-label="button container"
              onClick={() => {
                isPlaying ? pauseSong() : playSong();
                // playSong() ? pauseSong() : playSong();
              }}
            >
              {isPlaying ? <PlayArrowIcon /> : <PauseIcon />}
            </IconButton>
            <IconButton
              onClick={() => {
                skipSong();
              }}
            >
              <SkipNextIcon />{" "}
              <VotesToSkip>
                {votes} / {votesToSkip}
              </VotesToSkip>
            </IconButton>
          </ButtonContainer>
          {console.log(votes, votesToSkip)}
          <LinearProgress variant="determinate" value={songProgress} />
          <p>Host:{isHost}</p>
          <p>Room Code:{params.roomcode}</p>{" "}
          <ButtonDiv>
            <Link to="/join">
              <Button>Join a Room</Button>
            </Link>
            <Button onClick={leaveRoomCode}>Leave Rooom</Button>
          </ButtonDiv>
        </HostRoomDiv>
      )}

      {console.log(isHost)}
    </RoomContainer>
  );
};

export default Room;
