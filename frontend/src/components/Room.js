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
  const value = useContext(UserContext);
  console.log(location, " useLocation Hook");
  let params = useParams();
  let params1 = params.roomcode;
  console.log(params1, "paramsroompage"); // "hotspur"
  // catchdata(params, "params trying to be lifted");
  const test = location.pathname;
  // console.log(test);
  console.log(login, "initialized login as true");

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

  useEffect(() => {
    fetchData();
    console.log(`didMount:`);
  }, []);

  const fetchData = async () => {
    // if (response.status === 200) {
    //   clear();
    // }
    const response = await axios.get(
      "/get-room" + "?code=" + roomCode.params.roomcode
    );
    const data = response.data;
    console.log(data, "room response.data");
    setvotesToSkip(data.votes_to_skip);
    setHost(data.is_host.toString());
    setguestCanPause(data.guest_can_pause.toString());

    // catchdata(params1, "lifted tryan");
    // setUser(data.code);

    // console.log(data.code);
    // const user = useContext(UserContext);
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

    // console.log("login change", props);
    // console.log(props.catchData(login));
    // props.catchData(login);
  };

  // const res = await axios.post("/create-room", data, {
  //   headers: {
  //     "Content-Type": "application/json",
  //     "X-CSRFToken": csrftoken,
  //   },
  // });

  // const dataone = res.data;
  // const code = res.data.code;
  // console.log(dataone);

  // console.log(code);

  // navigate("/room/" + code);
  // setCodes(code);
  // catchdata(code);
  // console.log(code, "codes!!!!!!!!!!!!!!!!!!!!!!!!!!!");
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
