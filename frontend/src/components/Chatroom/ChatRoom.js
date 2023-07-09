import React from "react";
import "./ChatRoom.css";
import Chat from "./Chat";

const ChatRoom = ({ user }) => {
  return (
    <div className="ChatRoom">
      <Chat user={user} />
    </div>
  );
};

export default ChatRoom;
