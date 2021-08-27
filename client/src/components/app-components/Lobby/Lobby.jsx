import React, { useState, useContext, useEffect } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import UserContext from "../../../context/UserContext";
import HasErrorContext from "../../../context/HasErrorContext";
import {SocketContext} from "../../../context/SocketContext"
import UserLink from "./UserLink/UserLink";
import { Row, NavBar } from "../../UIKit";
import "./Lobby.css";

const Lobby = () => {
  //#region Instances
  const [users, setUsers] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [gameAlertIds, setGameAlertIds] = useState([]);
  
  const { userData, setUserData } = useContext(UserContext);
  const { setHasError } = useContext(HasErrorContext);
  const { socket } = useContext(SocketContext);
  const history = useHistory();
  //#endregion

  useEffect(() => {
    //Push to login if the user has no token
    if (!userData.user) {
      setUserData({
        token: undefined,
        user: undefined,
      });
      localStorage.setItem("auth-Token", "");
      history.push("/");
    }
  }, [history, setUserData, userData.user]);

  useEffect(()=>{
    //Listtning to sockets alerts
    
    socket.on('receiveAllActiveUsers',(data)=>{
      setActiveUsers(data)
    })

    socket.on('getNewRegisterUser',(data)=>{
      data && addNewUser(data);
    })

    socket.on('alertAboutNewGame',(data)=>{
      setGameAlertIds(prev => [...prev,data.senderId])
    })

  })

  //Add the new user to the users array so he will show up on the list
  const addNewUser = async (userId) => {
    try{
      const result = await Axios.get(
        `${process.env.REACT_APP_SERVER_URL}private/${userId}`,
        { headers: { Authorization: localStorage.getItem("auth-Token") } }
      );
      setUsers((prev) => [...prev, result.data]);
    } catch(error){
      setHasError(error);
    }
  };


  //Controlle the users list
  useEffect(() => {
    const getAllUsers = async () => {
      //Get all the users how are not the current user
      try {
        const result = await Axios.get(
          `${process.env.REACT_APP_SERVER_URL}private/all`,
          { headers: { Authorization: localStorage.getItem("auth-Token") } }
        );

        let filterUsers = result.data.filter((u) => {
          return u._id !== userData.user?._id;
        });

        setUsers(filterUsers);
      } catch (error) {
        setHasError(error);
      }
    };
    getAllUsers();

    socket.emit('getAllActiveUsers')

  }, [setHasError, userData.user?._id, socket]);

  return (
    <>
      <section>
        <NavBar isLobby={true} setUserData={setUserData}/>
      </section>
      <div className="lobby-continer">
        <Row>
          <header className="lobby-header">All Your Friends</header>

          <ul className="lobby-groups">
            {users.map((u) => (
              <UserLink key={u._id} user={u} isActive={activeUsers.includes(u._id)} isGameAlert={gameAlertIds.includes(u._id)}/>
            ))}
          </ul>
        </Row>
      </div>
    </>
  );
};

export default Lobby;
