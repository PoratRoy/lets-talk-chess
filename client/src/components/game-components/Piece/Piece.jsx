import React from "react";
import { useDrag, DragPreviewImage } from "react-dnd";
import { showLegalMoves, hideLegalMoves } from "../../../Logic/Game";
import "./Piece.css";

const Piece = ({ piece: { type, color }, position }) => {
  const pieceImage = require(`../../../assets/tools-images/${type}_${color}.png`);

  //React DND, collect the piece and drag it
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: "piece", id: `${position}_${type}_${color}` },
    collect: (monitor) => {
      return { isDragging: !!monitor.isDragging() };
    },
  });

  const showMovesOnDragStart = () => {
    showLegalMoves(position);
  };

  const hideMovesOnDrop = () => {
    hideLegalMoves()
  };

  return (
    <>
      <DragPreviewImage connect={preview} src={pieceImage.default} />
      <div
        className="piece-continer"
        ref={drag}
        style={{ opacity: isDragging ? 0 : 1 }}
        onDrop={hideMovesOnDrop}
        onDragStart={showMovesOnDragStart}
      >
        <img src={pieceImage.default} alt="" className="piece" />
      </div>
    </>
  );
};

export default Piece;
