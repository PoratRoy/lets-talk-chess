import React, { useEffect, useState, useContext } from "react";
import { SocketContext } from "../../../context/SocketContext";
import { gameSubject } from "../../../Logic/Game";
import "./GameDetails.css";

const DeadPieces = ({
  playerTurn,
  setPlayerTurn,
  openChat,
  gameOverNewGame,
  playerQuit,
}) => {
  
  const [isGameOver, setIsGameOver] = useState();

  const { socket } = useContext(SocketContext);

  useEffect(() => {
    //Find if the game is over
    const gameSubscribe = gameSubject.subscribe((game) => {
      if (game) {
        setIsGameOver(game.isGameOver);
      }
    });

    return () => {
      gameSubscribe.unsubscribe();
    };
  }, [socket]);

  useEffect(() => {
    //Alert other player about the socket actions
    socket.on("updateNewMove", (data) => {
      if (data.game) {
        setIsGameOver(data.game.isGameOver);
      }
    });

    socket.on("updateTurn", (data) => {
      if (data.turn) {
        setPlayerTurn(data.turn);
      }
    });

    socket.on("updateRestartGameDetails", () => {
      setPlayerTurn("w");
    });
  }, [socket, playerTurn]);

  return (
    <div className="game-details-continer">
      <div className="game-details-turn">
        {playerTurn ? <div className={playerTurn} /> : <div className="w" />}
      </div>

      <div>
        {isGameOver && (
          <button onClick={gameOverNewGame} className="game-details-btn-new">
            New Game
          </button>
        )}
        {!isGameOver && (
          <button onClick={playerQuit} className="game-details-btn-quit">
            Quit Game
          </button>
        )}
      </div>

      <button className="game-details-chat-btn" onClick={openChat}>
        <i className="fas fa-comments chat-icon"></i>
      </button>
    </div>
  );
};

export default DeadPieces;
