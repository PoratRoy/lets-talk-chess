import React from "react";
import Square from "../Square/Square";
import {move} from '../../../Logic/Game'
import "./Promote.css";

const promotionPieces = ["r", "n", "b", "q"];

const Promote = ({ promotion: { from, to, color } }) => {
  return (
    <div className="board">
      {promotionPieces.map((p, i) => (
        <div className="promote-square" key={i}>
          <Square black={i % 3 === 0}>
            <div className="piece-continer" onClick={()=>{move(from,to,p)}}>
              <img
                src={require(`../../../assets/tools-images/${p}_${color}.png`).default}
                alt=""
                className="piece select-piece"
              />
            </div>
          </Square>
        </div>
      ))}
    </div>
  );
};
export default Promote;
