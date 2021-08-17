import React, {useEffect, useState} from "react";
import BoardSquare from "../BoardSquare/BoardSquare";
import { legalSquareSubject } from '../../../Logic/Game'
import './Board.css'

const Board = ({ board, position }) => {

    const [squares, setSquars] = useState([])
    const [currBoard, setCurrBoard] = useState([])

    useEffect(()=>{
      //Set the board for black player view or white player view
      setCurrBoard( position === 'w' ? board.flat() : board.flat().reverse())
    },[board, position])

    useEffect(()=>{
      //When the player move, show where he can move
        const subscribe = legalSquareSubject.subscribe((options)=>{
            setSquars(options);
        })
        return () => subscribe.unsubscribe();
    },[])

    const legalSquare = (position)=>{
        return squares ? squares?.some(s=> s === position) : false 
    }

    const getXYPosition = (i)=> {
      //Position of the squars on the board
        const x = position === 'w' ? i % 8 : Math.abs((i%8)-7)
        const y = position === 'w' ? Math.abs(Math.floor(i/8)-7) : Math.floor(i/8)
        return {x,y}
    }

    const isBlack = (i)=> {
        const { x, y } = getXYPosition(i)
        return (x + y) % 2 === 1
    }
    
    const getPosition = (i)=>{
        const { x, y } = getXYPosition(i)
        const letter = ['a','b','c','d','e','f','g','h'][x]
        const number = y+1
        return `${letter}${number}`
    }

  return (
    <div className="board">
      {currBoard.map((piece, i) => (
        <div key={i} className="square">
            <BoardSquare piece={piece} black={isBlack(i)} position={getPosition(i)} legal={legalSquare(getPosition(i))}/>
        </div>
      ))}
    </div>
  );
};

export default Board;



