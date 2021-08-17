import React from "react";
import "./DeadPieces.css";

const DeadPieces = ({ pieces }) => {
  return (
    <div className="dead-pieces-continer">
      <div className="dead-pieces-imgs">
        {pieces.map((p, i) => (
          <img key={i} src={p.default} className="dead-pieces-img" alt="" />
        ))}
      </div>
    </div>
  );
};

export default DeadPieces;
