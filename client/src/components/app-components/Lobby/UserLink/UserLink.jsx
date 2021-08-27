import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../../../context/UserContext";
import CurrentChatContext from "../../../../context/CurrentChatContext";
import CurrentGameContext from "../../../../context/CurrentGameContext";
import { SocketContext } from "../../../../context/SocketContext";
import { initGame } from "../../../../Logic/Game";
import Axios from "axios";
import "./UserLink.css";

const UserLink = ({ user, isActive, isGameAlert }) => {
  //#region Instances
  const { setCurrentGame } = useContext(CurrentGameContext);
  const { setCurrentChat } = useContext(CurrentChatContext);
  const { socket } = useContext(SocketContext);
  const { userData } = useContext(UserContext);
  const history = useHistory();
  //#endregion

  const sendGameRequest = async () => {
    //Start new game or join exsisting one
    const game = await initGame(userData.user._id, user._id);
    setCurrentGame(game);

    if (game.newGame) {
      socket.emit("newGame", userData.user._id, user._id);
    }

    history.push("/game");
  };

  const enterChat = async () => {
    //Enter the chat page

    let group;
    try {
      group = await Axios.get(
        `${process.env.REACT_APP_SERVER_URL}groups/members/${userData.user._id}/${user._id}`
      );
    } catch (err) {
      console.log(err);
    }

    const isGroupExsist = group.data.length === 0;

    try {
      if (isGroupExsist) {
        //Create new group with the selected user
        const newGroup = {
          senderId: userData.user._id,
          receiverId: user._id,
          createdAt: Date.now(),
        };

        group = await Axios.post(
          `${process.env.REACT_APP_SERVER_URL}groups`,
          newGroup
        );
      }
      setCurrentChat(group.data);
    } catch (err) {
      console.log(err);
    }

    history.push("/chat");
  };

  return (
    <li className="navbar-user-link">
      <div className="user-link-btn">
        <div className="user-name">
          {isActive && <div className="user-active"></div>}
          <span data-tooltip={user.name} className="user-name-name">{user.name}</span>
        </div>
        <div className="user-btns">
          <button className="user-game-btn" onClick={sendGameRequest}>
            {isGameAlert ? (
              <i className="fas fa-chess game-icon-new-game"></i>
            ) : (
              <i className="fas fa-chess game-icon"></i>
            )}
          </button>
          <button className="user-chat-btn" onClick={enterChat}>
            <i className="fas fa-comments chat-icon"></i>
          </button>
        </div>
      </div>
    </li>
  );
};

export default UserLink;
