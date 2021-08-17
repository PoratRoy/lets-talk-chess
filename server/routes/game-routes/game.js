const express = require('express');
const router = express.Router();
const {getAllGames, getGameById, getGameByHisPlayers, addGame, updateGame, deleteGame } = require('../../controllers/game-controllers/game');


//https://lets-talk-chess.herokuapp.com/api/game/ -- get all games
router.get('/',getAllGames);

//https://lets-talk-chess.herokuapp.com/api/game/:id -- get game by id
router.get('/:id', getGameById);

//https://lets-talk-chess.herokuapp.com/api/game/players/:playerId1/:playerId2 -- get game by the players id
router.get('/players/:playerId1/:playerId2', getGameByHisPlayers);

//https://lets-talk-chess.herokuapp.com/api/game/ -- add new game
router.post('/', addGame);

//https://lets-talk-chess.herokuapp.com/api/game/:id -- update game
router.put('/:id', updateGame);

//https://lets-talk-chess.herokuapp.com/api/game/:id -- delete game
router.delete('/:id',deleteGame);


module.exports = router;