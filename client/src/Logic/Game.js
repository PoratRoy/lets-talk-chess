import * as Chess from 'chess.js'
import {BehaviorSubject} from 'rxjs'
import Axios from 'axios'


// special position fen
// let promotion = 'rnb2bnr/pppPkppp/8/4p3/7q/8/PPPP1PPP/RNBQKBNR w KQ - 1 5'
// let staleMate = '4k3/4P3/4K3/8/8/8/8/8 b - - 0 78'
// let checkMate = 'rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/PPPPP2P/RNBQKBNR w KQkq - 1 3'
// let insuficcientMaterial = 'k7/8/n7/8/8/8/8/7K b - - 0 1'

const chess = new Chess()

export const gameSubject = new BehaviorSubject()
export const turnSubject = new BehaviorSubject()
export const legalSquareSubject = new BehaviorSubject()
export const eatenPiecesSubject = new BehaviorSubject()

//Get the game by his players. If found load the game, else create new game
export const initGame= async (currentPlayerId, otherPlayerId)=>{
    let resGame
    try{
        const res = await Axios.get(`${process.env.REACT_APP_SERVER_URL}game/players/${currentPlayerId}/${otherPlayerId}`)
        const isGameExists = res.data.length !== 0
        const game = res.data[0]

        if(isGameExists){
            chess.load(game.fen)

            const data = {pieces: game.deadPieces, isNew: false}
            eatenPiecesSubject.next(data);

            resGame = game

        }else{
            const res = await createNewGameDB(currentPlayerId, otherPlayerId)
            resGame = res.data
        }
        
    }catch(err){
        console.log('MY ERROR: '+ err);
    }

    updateGame(resGame.members[0]._id === currentPlayerId ? resGame.members[0].color : resGame.members[1].color)
    return resGame
}

//When the game is over update the game status and create new game
export const newGame= async (currentPlayer, otherPlayer)=>{
    try{
        
        const isGameOver = chess.game_over()
        
        if(isGameOver){
            await updateGameEndDB(currentPlayer, otherPlayer, getGameResult())

            await createNewGameDB(currentPlayer._id, otherPlayer._id)
        }
        updateGame(currentPlayer.color)
        
    }catch(err){
        console.log('MY ERROR: '+ err);
    }
}

//When one player quit update the game status about the result and create new game
export const quitGame= async (loser,winner)=>{
    
    try{
        await updateGameEndDB(loser,winner,`${loser.color.toUpperCase()} QUIT, ${winner.color.toUpperCase()} WIN!`)
        
        await createNewGameDB(winner._id,loser._id)

    } catch(err){
        console.log('MY ERROR: '+ err);
    }

    updateGame(loser.color)
}

export const resetGame= async()=>{
    chess.reset()
    updateGame()
}

//Check if the move is simple move or if its promotion
export const handleMove= async (from,to, currentPlayer, otherPlayer)=>{

    if(from !== to){
        const promotions = chess.moves({verbose:true}).filter(m=>m.promotion)
        
        let pendingPromotion
        if(promotions.some(p=> `${p.from}:${p.to}`=== `${from}:${to}`)){
            pendingPromotion = {from,to,color:promotions[0].color}
            
            const piece = chess.get(to)

            await updateGameDB(currentPlayer, otherPlayer,piece)
            const data = {pieces: piece ? [piece] : null, isNew: true}
            eatenPiecesSubject.next(data)
    
            updateGame(currentPlayer.color, pendingPromotion)
        }
        //const {pendingPromotion}= gameSubject.getValue()
    
        if(!pendingPromotion){
            move(from,to,null, currentPlayer, otherPlayer)
        }
    }
}

//If the move was made by the current player and its legal, update the game
export const move= async (from,to,promotion, currentPlayer, otherPlayer)=>{  
    let tmpMove ={from,to}
    if(promotion){
        tmpMove.promotion = promotion
    }

    if(currentPlayer.color === chess.turn()){
        const piece = chess.get(to)

        const legalMove = chess.move(tmpMove)
    
        if(legalMove){
    
            await updateGameDB(currentPlayer, otherPlayer, piece)
            const data = {pieces: piece ? [piece] : null, isNew: true}
            eatenPiecesSubject.next(data)
    
            turnSubject.next(whoseTurnNow())
            updateGame(currentPlayer.color)
        }
    }
}

export const whoseTurnNow=()=>{
    return chess.turn();
}

//Update the chess game
const updateGame= (color, pendingPromotion)=>{

    const isGameOver = chess.game_over()
    const isCheck = chess.in_check()

    const displayGame = {
        board: chess.board(),
        pendingPromotion: pendingPromotion || null,
        isGameOver,
        result: isGameOver ? getGameResult() : null,
        position: color,
        isCheck,
        fen : chess.fen()
    }

    gameSubject.next(displayGame)
}

export const updateGameTest= (fen)=>{
    chess.load(fen)
}

const updateGameDB = async (currentPlayer, otherPlayer, deadPiece)=>{
    const isGameOver = chess.game_over()
    const isCheck = chess.in_check()
    const fen = chess.fen()

    try{
        const game = await Axios.get(`${process.env.REACT_APP_SERVER_URL}game/players/${currentPlayer._id}/${otherPlayer._id}`)

        await Axios.put(`${process.env.REACT_APP_SERVER_URL}game/${game.data[0]._id}`,{
            playerId1:game.data[0].members[0],
            playerId2:game.data[0].members[1],
            fen: fen,
            gameOver:isGameOver,
            result: isGameOver ? getGameResult() : isCheck? 'CHECK' : '',
            turn: whoseTurnNow(),
            deadPieces: addDeadPiece(game.data[0].deadPieces, deadPiece),
        })

    } catch(err){
        console.log('MY ERROR: '+ err);
    }
}

const addDeadPiece = (deadPieces, deadPiece)=>{
    const s = deadPiece? deadPieces.push(deadPiece) : deadPieces ? deadPieces : []
    return deadPieces
}


const updateGameEndDB = async (currentPlayer, otherPlayer, result)=>{
    try{

        const game = await Axios.get(`${process.env.REACT_APP_SERVER_URL}game/players/${currentPlayer._id}/${otherPlayer._id}`)

        await Axios.put(`${process.env.REACT_APP_SERVER_URL}game/${game.data[0]._id}`,{
            playerId1:game.data[0].members[0],
            playerId2:game.data[0].members[1],
            fen: chess.fen(),
            gameOver:true,
            result: result,
            turn: whoseTurnNow(),
            deadPieces: game.data[0].deadPieces
        })

    }catch(err){
        console.log('MY ERROR: '+ err);
    }
}

const createNewGameDB = async (player1, player2)=>{
    
    chess.reset()
    try{
        return await Axios.post(`${process.env.REACT_APP_SERVER_URL}game`,{
            playerId1:player1,
            playerId2:player2,
            fen: chess.fen(),
            gameOver:false,
            result: '',
            turn: 'w',
            deadPieces: []
        })
    }catch(err){
        console.log('MY ERROR: '+ err);
    }
}

export const hideLegalMoves = ()=>{
    legalSquareSubject.next([])
}

//Get all the optional moves that the piece can do from the specific square 
export const showLegalMoves = (square)=>{
    let options = chess.moves({square,verbose: true})
    options = options.map(option=>{return option.to})
    legalSquareSubject.next(options)
}

const getGameResult=()=>{

    if (chess.in_checkmate()) {
        const winner = chess.turn() === "w" ? 'BLACK' : 'WHITE'
        return `CHECKMATE - WINNER - ${winner}`
    } else if (chess.in_draw()) {
        let reason = '50 - MOVES - RULE'
        if (chess.in_stalemate()) {
            reason = 'STALEMATE'
        } else if (chess.in_threefold_repetition()) {
            reason = 'REPETITION'
        } else if (chess.insufficient_material()) {
            reason = "INSUFFICIENT MATERIAL"
        }
        return `DRAW - ${reason}`
    } else {
        return 'UNKNOWN REASON'
    }
}



