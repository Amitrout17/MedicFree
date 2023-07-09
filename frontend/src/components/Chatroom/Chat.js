import React, { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import img from "./online.png";
const URL = "ws://localhost:4000/chat";

const Chat = ({ user }) => {
  console.log(user);
  const [name, setName] = useState(user.name);
  const [messages, setMessages] = useState([]);

  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(URL);

    ws.current.onopen = () => {
      console.log("connected");
    };

    ws.current.onmessage = (evt) => {
      const message = JSON.parse(evt.data);
      addMessage(message);
    };

    ws.current.onclose = () => {
      console.log("disconnected");
      ws.current = new WebSocket(URL);
    };

    return () => {
      ws.current.close();
    };
  }, []);

  const addMessage = (message) =>
    setMessages((prevMessages) => [message, ...prevMessages]);

  const submitMessage = (messageString) => {
    if (messageString !== "") {
      const message = { name, message: messageString };
      ws.current.send(JSON.stringify(message));
      addMessage(message);
    }
  };

  return (
    <div className="chat-box-main">
      <div className="chatbox-heading">
        <label htmlFor="name">
          <div className="name-image">
            <img
              src={img}
              alt=""
              style={{
                width: "5%",
                marginTop: "8px",
                marginRight: "9px",
              }}
            />
            <h4>{name}</h4>
          </div>
        </label>
        <button
          className="button-anonymous"
          onClick={() => {
            setName("Anonymous");
          }}
        >
          Chat <br /> Anonymously
        </button>
      </div>

      <div className="chat-box">
        {messages.map((message, index) => (
          <ChatMessage
            user={user}
            key={index}
            message={message.message}
            name={message.name}
          />
        ))}
      </div>

      <div className="message-box">
        <ChatInput ws={ws.current} onSubmitMessage={submitMessage} />
      </div>
    </div>
  );
};

export default Chat;
