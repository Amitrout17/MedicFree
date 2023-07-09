import React, { useState } from "react";
import PropTypes from "prop-types";

const ChatInput = ({ onSubmitMessage }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitMessage(message);
    setMessage("");
  };

  return (
    <form action="." onSubmit={handleSubmit}>
      <div className="submit-handeler">
        <input
          type="text"
          placeholder="Enter message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            width: "85%",
            border: "none",
            paddingLeft: "6%",
            textTransform: "capitalize",
            letterSpacing: "2px",
          }}
        />
        <input
          type="submit"
          value="Send"
          style={{
            width: "15%",
            border: "none",
            backgroundColor: "#14cd39",
            color: "white",
            textTransform: "uppercase",
            letterSpacing: "2px",
          }}
        />
      </div>
    </form>
  );
};

ChatInput.propTypes = {
  onSubmitMessage: PropTypes.func.isRequired,
};

export default ChatInput;
