import React from 'react'
import './Square.css'

const Square = ({children, black, legal})=> {
    
    const legalClass = legal ? 'square-legal' : ''
    const bClass = black ? 'square-black' : 'square-white'
    
    return(
        <div className={`${bClass} ${legalClass} board-square`}>
            {children}
        </div>
    );
}

export default Square;