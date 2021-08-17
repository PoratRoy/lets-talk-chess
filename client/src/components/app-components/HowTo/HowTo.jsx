import React, { useContext } from "react";
import UserContext from "../../../context/UserContext";
import { NavBar } from "../../UIKit";
import "./HowTo.css";

const HowTo = () => {
  const { setUserData } = useContext(UserContext);

  return (
    <>
      <section>
        <NavBar isLobby={false} setUserData={setUserData} />
      </section>
      <section className="how-continer">
        <h1>Chess Roules</h1>
        <section>
          <p>
            The <strong>King</strong> may move one square in any direction, so
            long as no piece is blocking his path.
          </p>
        </section>
        <section>
          <p>
            The <strong>Queen</strong> may move any number of squares straight
            or diagonally in any direction.
          </p>
        </section>
        <section>
          <p>
            The <strong>Rook</strong> may move in a straight line, any number of
            squares horizontally or vertically.
          </p>
        </section>
        <section>
          <p>
            The <strong>Bishop</strong> may move any number of squares
            diagonally.
          </p>
        </section>
        <section>
          <p>
            The <strong>Knight</strong> The only piece that can jump over a
            piece - be it your own, or the opponent’s.
          </p>
        </section>
        <section>
          <p>
            The <strong>Pawn</strong> on its first move may move either one or
            two squares straight forward.
            <div>
              After its first move the Pawn may only advance one square at a
              time. The Pawn captures by moving diagonally one square forward in
              each direction.
            </div>
            The Pawn cannot move or capture backwards!
          </p>
        </section>
        <br/>
        <section>
          <p>
            <strong>Castle</strong> Castling in both directions:
            <div>
              The King moves two squares in the direction of the Rook, the Rook
              jumps over the King and lands on the square next to it.
            </div>
          </p>
        </section>
        <section>
          <p>
            <strong>Check</strong> A King is in check, when it is attacked by
            the opponent’s piece. The King can never be captured.
          </p>
        </section>
        <section>
          <p>
            <strong>CheckMate</strong> If the King cannot escape from the check,
            the position is checkmate and the game is over. The player who got
            checkmated gets zero point and the player giving mate gets one
            point.
          </p>
        </section>
      </section>
    </>
  );
};

export default HowTo;
