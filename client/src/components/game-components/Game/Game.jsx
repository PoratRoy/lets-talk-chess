import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import Board from "../Board/Board";
import DeadPieces from "../DeadPieces/DeadPieces";
import GameDetails from "../GameDetails/GameDetails";
import ErrorPage from '../../app-components/Errors/ErrorPage/ErrorPage'
import {
  turnSubject,
  whoseTurnNow,
  eatenPiecesSubject,
  gameSubject,
  updateGameTest,
  quitGame,
  newGame,
} from "../../../Logic/Game";
import { nameLength, getMembers } from '../../../Logic/Common'
import CurrentGameContext from "../../../context/CurrentGameContext";
import CurrentChatContext from "../../../context/CurrentChatContext";
import HasErrorContext from "../../../context/HasErrorContext";
import { SocketContext } from "../../../context/SocketContext";
import UserContext from "../../../context/UserContext";
import Chat from "../../chat-components/Chat/Chat";
import { NavBar } from "../../UIKit";
import "./Game.css";

const Game = () => {
  //#region Instances
  const [whitEatenPieces, setWhiteEatenPieces] = useState([]);
  const [blackEatenPieces, setBlackEatenPieces] = useState([]);
  const [openChatTab, setOpenChatTab] = useState(false);
  const [playerTurn, setPlayerTurn] = useState("");
  const [hasError, setHasError] = useState(null);
  const [check, setCheck] = useState(false);
  const [position, setPosition] = useState();
  const [result, setResult] = useState();
  const [board, setBoard] = useState([]);

  const { setCurrentChat } = useContext(CurrentChatContext);
  const { userData, setUserData } = useContext(UserContext);
  const { currentGame } = useContext(CurrentGameContext);
  const { socket } = useContext(SocketContext);

  let members = getMembers(currentGame?.members, userData.user);
 
  //#endregion

  useEffect(() => {
    //Init new game or load existing one
    //Alert to other player to change his board
    const gameSubscribe = gameSubject.subscribe((game) => {
      if (game) {
        setBoard(game.board);
        setResult(game.result);
        setCheck(game.isCheck);
        setPosition(game.position);
        socket.emit("newMove", game, members.otherPlayer._id);
      }
    });

    //Add the new dead pieces to right array of dead pieces (black or white)
    //Alert to other player to change his board
    const pieceSubscribe = eatenPiecesSubject.subscribe((data) => {
      if (data?.pieces) {
        if (data.pieces.length !== 0) {
          data.pieces.map((piece) => {
            addPieceToEatenPieces(piece);
            if (data.isNew) {
              socket.emit("newEatenPiece", piece, members.otherPlayer._id);
            }
          });
        }
      }
    });

    //Set player turn and alert to other player to change his board
    const turnSubscribe = turnSubject.subscribe((turn) => {
      const currentTurn = turn ? turn : whoseTurnNow();
      setPlayerTurn(currentTurn);
      socket.emit("turn", currentTurn, members.otherPlayer._id);
    });

    return () => {
      gameSubscribe.unsubscribe();
      pieceSubscribe.unsubscribe();
      turnSubscribe.unsubscribe();
    };
  }, [members.otherPlayer._id, socket]);

  useEffect(() => {
    //Alert other player about the socket actions
    socket.on("updateNewMove", (data) => {
      if (data.game) {
        setBoard(data.game.board);
        setResult(data.game.result);
        setCheck(data.game.isCheck);

        updateGameTest(data.game.fen);
      }
    });

    socket.on("updateNewEatenPiece", (data) => {
      if (data.piece) {
        addPieceToEatenPieces(data.piece);
      }
    });

    socket.on("updateRestartGameDetails", () => {
      setWhiteEatenPieces([]);
      setBlackEatenPieces([]);
    });
  }, [socket]);

  //Find the specific piece and add it to the right array (black array or white array)
  const addPieceToEatenPieces = (piece) => {
    const pieceString = require(`../../../assets/tools-images/${piece.type}_${piece.color}.png`);
    if (piece.color === "w") {
      setWhiteEatenPieces((pieces) => [...pieces, pieceString]);
    } else {
      setBlackEatenPieces((pieces) => [...pieces, pieceString]);
    }
  };

  const openChat = async () => {
    let group;
    try {
      group = await Axios.get(
        `${process.env.REACT_APP_SERVER_URL}groups/members/${userData.user._id}/${members.otherPlayer._id}`
      );
    } catch (error) {
      setHasError(error)
    }

    const isGroupExsist = group.data.length === 0;

    try {
      if (isGroupExsist) {
        //create new group with the selected user
        const newGroup = {
          senderId: userData.user._id,
          receiverId: members.otherPlayer._id,
          createdAt: Date.now(),
        };

        group = await Axios.post(
          `${process.env.REACT_APP_SERVER_URL}groups`,
          newGroup
        );
      }

      setCurrentChat(group.data);
    } catch (error) {
      setHasError(error)
    }

    setOpenChatTab(!openChatTab);
  };

  const playerQuit = async () => {
    try{
      await quitGame(members.currentPlayer, members.otherPlayer);
      restartGameDetails();
    }catch(error){
      setHasError(error)
    }
  };

  const gameOverNewGame = async () => {
    try{
      await newGame(members.currentPlayer, members.otherPlayer);
      restartGameDetails();
    }catch(error){
      setHasError(error)
    }
  };

  const restartGameDetails = () => {
    setWhiteEatenPieces([]);
    setBlackEatenPieces([]);
    setPlayerTurn("w");
    socket.emit("restartGameDetails", members.otherPlayer._id);
  };

  return (
    <>
      <section>
        <NavBar isLobby={false} setUserData={setUserData} />
      </section>

      {hasError ? (
        <ErrorPage error={hasError} />
      ) : (
        <HasErrorContext.Provider value={{ setHasError }}>
          <div className="game-page">
            <div className="game-continer">
              <div className="game-header">
                {currentGame ? (
                  <>
                    <div className="game-title" lenght={nameLength(members.otherPlayer)}>
                      Playing with {members.otherPlayer.name}
                    </div>
                  </>
                ) : null}

                <div className="game-result">
                  {check && result ? (
                    <div>Game Over {result}</div>
                  ) : check ? (
                    <div>CHECK</div>
                  ) : null}
                </div>
              </div>

              <div className="game-show">
                <section className="game-black-pieces">
                  <DeadPieces pieces={blackEatenPieces} />
                </section>

                <section className="game-board">
                  <Board board={board} position={position} />
                </section>

                <section className="game-white-pieces">
                  <DeadPieces pieces={whitEatenPieces} />
                </section>
              </div>

              <section className="game-details">
                <GameDetails
                  playerTurn={playerTurn}
                  setPlayerTurn={setPlayerTurn}
                  openChat={openChat}
                  gameOverNewGame={gameOverNewGame}
                  playerQuit={playerQuit}
                />
              </section>
            </div>
            {openChatTab && (
              <section className="chat-tab-continer">
                <Chat />
              </section>
            )}
          </div>
        </HasErrorContext.Provider>
      )}
    </>
  );
};

export default Game;
