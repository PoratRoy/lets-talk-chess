import React, { useContext, useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { handleMove, gameSubject, hideLegalMoves } from "../../../Logic/Game";
import { getMembers } from "../../../Logic/Common"
import CurrentGameContext from '../../../context/CurrentGameContext'
import HasErrorContext from "../../../context/HasErrorContext"; 
import UserContext from '../../../context/UserContext'
import Piece from "../Piece/Piece";
import Square from "../Square/Square";
import Promote from "../Promote/Promote";
import "./BoardSquare.css";

const BoardSquare = ({ piece, black, position, legal }) => {
  
  const [promotion, setPromotion] = useState(null);

  const { currentGame } = useContext(CurrentGameContext);
  const { setHasError } = useContext(HasErrorContext);
  const { userData } = useContext(UserContext);

  //React DND, get the droped position of the piece and handle the new move
  const [, drop] = useDrop({
    accept: "piece",
    drop: async (item) => {
      const [fromPosition] = item.id.split("_");

      const members = getMembers(currentGame?.members, userData.user);

      try{
        await handleMove(fromPosition, position, members.currentPlayer, members.otherPlayer);
        hideLegalMoves();
      }catch(error){
        setHasError(error)
      }
    },
  });

  useEffect(() => {
    //Check if promotion
    const subscribe = gameSubject.subscribe(({pendingPromotion}) => {
      pendingPromotion && pendingPromotion.to === position
        ? setPromotion(pendingPromotion)
        : setPromotion(null);
    });
    return () => subscribe.unsubscribe();
  }, [position]);

  return (
    <div className="board-square" ref={drop}>
      <Square black={black} legal={legal}>
        {promotion ? (
          <Promote promotion={promotion}/>
        ) : piece ? (
          <Piece piece={piece} position={position} />
        ) : null}
      </Square>
    </div>
  );
};

export default BoardSquare;
