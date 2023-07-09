import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function VideoCall() {
  const navigate = useNavigate();
  const [roomId, setroomId] = useState();

  //instead of this random id there is need to enter a appointment id
  const randomNumber = Math.floor(10000 + Math.random() * 90000);

  const roomJoin = () => {
    navigate(`/doctor/vcall/room/${randomNumber}`);
  };
  return (
    <>
      <div>
        <button onClick={roomJoin}>Join</button>
      </div>
    </>
  );
}

export default VideoCall;
