import React from "react";

const MyComponent = ({ name, message, user }) => {
  return (
    <>
      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">{name}</div>
          <div class="msg-info-time">{user.role}</div>
        </div>

        <div class="msg-text">{message}</div>
      </div>
    </>
  );
};

export default MyComponent;
