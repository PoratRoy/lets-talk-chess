import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Axios from "axios";
import GamePlayersContext from "context/GamePlayersContext";
import UserContext from "context/UserContext";
import { SocketContext, socket } from "context/SocketContext";
import CurrentChatContext from "context/CurrentChatContext";
import CurrentGameContext from "context/CurrentGameContext";
import HasErrorContext from "context/HasErrorContext";
import PrivateRoute from "components/app-components/routing/PrivateRouting";

import Login from "components/app-components/Auth/Login/Login";
import Register from "components/app-components/Auth/Register/Register";
import Lobby from "components/app-components/Lobby/Lobby";
import Game from "components/game-components/Game/Game";
import Chat from "components/chat-components/ChatPage/ChatPage";
import HowTo from 'components/app-components/HowTo/HowTo'
import PageNotFound from "components/app-components/Errors/TypesOfErrors/PageNotFound/PageNotFound";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  const [playersData, setPlayersData] = useState({
    player1: undefined,
    player2: undefined,
  });

  const [currentChat, setCurrentChat] = useState(null);
  const [currentGame, setCurrentGame] = useState(null);
  const [hasError, setHasError] = useState(null);

  useEffect(() => {
    //Find if there is a token
    let token = localStorage.getItem("auth-Token");
    if (!token) {
      localStorage.setItem("auth-Token", "");
      token = "";
    }

    //Check if the token is valid and set the user data with the token
    const fetchPrivateData = async () => {
      try {
        const resToken = await Axios.post(
          `${process.env.REACT_APP_SERVER_URL}auth/tokenIsValid`,
          null,
          { headers: { "x-auth-Token": token } }
        );

        if (resToken.data) {
          setUserData({
            token,
            user: resToken.data,
          });
        }
      } catch (error) {
        localStorage.removeItem("auth-Token");
      }
    };
    fetchPrivateData();
  }, []);

  return (
    <>
      <BrowserRouter>
        <GamePlayersContext.Provider value={{ playersData, setPlayersData }}>
        <CurrentChatContext.Provider value={{ currentChat, setCurrentChat }}>
        <CurrentGameContext.Provider value={{ currentGame, setCurrentGame }}>
        <HasErrorContext.Provider value={{ hasError, setHasError }}>
        <UserContext.Provider value={{ userData, setUserData }}>
            <SocketContext.Provider value={{ socket }}>
              <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/register" component={Register} />
                <PrivateRoute path="/lobby" component={Lobby} />
                <PrivateRoute path="/game" component={Game} />
                <PrivateRoute path="/chat" component={Chat} />
                <PrivateRoute path="/how" component={HowTo} />
                <Route path="*">
                  <PageNotFound />
                </Route>
              </Switch>
            </SocketContext.Provider>
          </UserContext.Provider>
          </HasErrorContext.Provider>
          </CurrentGameContext.Provider>
          </CurrentChatContext.Provider>
        </GamePlayersContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
