import React, { useState, useContext, useEffect } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import Header from "../ChatElements/Header/Header";
import Messages from "../ChatElements/Messages/Messages";
import InputMessage from "../ChatElements/InputMessage/InputMessage";
import CurrentChatContext from "../../../context/CurrentChatContext";
import HasErrorContext from "../../../context/HasErrorContext";
import { SocketContext } from "../../../context/SocketContext";
import UserContext from "../../../context/UserContext";
import "./Chat.css";

const Chat = () => {
  //#region Instances
  const [newArrivalMessage, setNewArrivalMessage] = useState(null);
  const [messages, setMessages] = useState(null);

  const { currentChat } = useContext(CurrentChatContext);
  const { setHasError } = useContext(HasErrorContext);
  const { userData } = useContext(UserContext);
  const { socket } = useContext(SocketContext);
  const history = useHistory();
  //#endregion


  useEffect(() => {
    //Init the new messaga
    socket.on("newArrivalMessageToClient", (data) => {
      setNewArrivalMessage({
        senderId: data.senderId,
        receiverId: data.receiverId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, [socket]);

  useEffect(() => {
    //Add the new message to the array of all the messages
    const membersId = currentChat?.members.map((m) => m._id);
    if (newArrivalMessage && membersId?.includes(newArrivalMessage.senderId)) {
      const receiverMembers = currentChat?.members.filter((m) => {
        return m._id !== newArrivalMessage.senderId;
      });
      if (receiverMembers?.map((m) => m._id === newArrivalMessage.receiverId)) {
        newArrivalMessage &&
          setMessages((prev) => [...prev, newArrivalMessage]);
        setNewArrivalMessage(null);
      }
    }
  }, [newArrivalMessage, currentChat]);

  useEffect(() => {
    //Get all the messages of the current chat
    const getMessages = async () => {
      try {
        const result = await Axios.get(
          `${process.env.REACT_APP_SERVER_URL}messages/${currentChat?._id}`
        );

        setMessages(result.data);
      } catch (error) {
        setHasError(error);
      }
    };
    getMessages();
  }, [currentChat, history, setHasError]);


  return (
    <>
      <div className="chat-continer">
        <header className="chat-header">
          <Header />
        </header>

        <section className="chat-group">
          <Messages messages={messages} user={userData.user} />

          <InputMessage messages={messages} setMessages={setMessages} />
        </section>
      </div>
    </>
  );
};

export default Chat;
