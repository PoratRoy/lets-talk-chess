import React, {useEffect, useRef} from "react";
import Message from "./Message/Message";
import "./Messages.css";

const Messages = ({ messages, user}) => {

  const scrollRef = useRef();

  //Scroll down
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chats">
        {messages?.map((message, i) => (
          <div key={i} ref={scrollRef}>
            <Message message={message} user={user} />
          </div>
        ))}
    </div>
  );
};

export default Messages;
