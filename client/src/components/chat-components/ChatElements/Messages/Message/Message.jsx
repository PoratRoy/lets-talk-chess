import React from "react";
import { format } from "timeago.js";
import "./Message.css";

const Message = ({ message, user }) => {
  let isSentByMe = false;

  if (message.sender === user._id) {
    isSentByMe = true;
  }

  return isSentByMe ? (
    <>
      <div className="my-chat">
        <span className="chat-text">{message.text}</span>
        <span className="chat-time">{format(message.createdAt)}</span>
      </div>
    </>
  ) : (
    <>
      <div className="other-chat">
        <span className="chat-text">{message.text}</span>
        <span className="chat-time">{format(message.createdAt)}</span>
      </div>
    </>
  );
};

export default Message;
