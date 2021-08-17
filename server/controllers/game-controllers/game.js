const { Game } = require("../../models/game-models/game");
const { User } = require("../../models/app-models/User");
const ErrorResponse = require("../../utils/errorResponse");

exports.getAllGames = async (req, res, next) => {
  try{
    res.status(200).send(await Game.find());
  } catch(error){
    next(error)
  }
};

exports.getGameById = async (req, res, next) => {
  try{
    const resGame = await Game.findById(req.params.id);
    if (!resGame)
      return res.status(404).send("game with the spacific ID not found");
  
    res.status(200).send(resGame);
  }catch(error){
    next(error)
  }
};

exports.getGameByHisPlayers = async (req, res, next) => {
  try{
    const player1 = await User.findById(req.params.playerId1).select("_id name");
    const player2 = await User.findById(req.params.playerId2).select("_id name");
    if(!player1 || !player2){
      return res.status(404).send(`Player not found`);
    }

    let player1Option1 = {_id: player1._id, name:player1.name, color: 'w'}
    let player1Option2 = {_id: player1._id, name:player1.name, color: 'b'}
    let player2Option1 = {_id: player2._id, name:player2.name, color: 'w'}
    let player2Option2 = {_id: player2._id, name:player2.name, color: 'b'}

    const resGame = await Game.find({
      $and: [ {members: {$in: [player1Option1,player1Option2]}} , {members: {$in: [player2Option1,player2Option2]}} ]
    });

    if (!resGame){
      return res.status(404).send("game with the spacific players not found");
    }
    
    const newestGame = resGame.filter(g=> g.gameOver === false)
    
    if(!newestGame){
      return res.status(404).send("Not found a valid game for those players");
    }
    
    res.status(200).send(newestGame); 
  }catch(error){
    next(error)
  }
};

exports.addGame = async (req, res, next) => {
  
  try {
    const player1 = await User.findById(req.body.playerId1).select("_id name");
    let player2 = await User.findById(req.body.playerId2).select("_id name");
    if(!player1 || !player2){
      return res.status(404).send(`Player not found`);
    }

    player2 = {_id: player2._id, name:player2.name, color: 'b'}

    const newGame = new Game({
      members: [player1,player2],
      fen: req.body.fen,
      gameOver: req.body.gameOver,
      result: req.body.result,
      turn: req.body.turn,
      deadPieces: req.body.deadPieces,
      newGame:true,
    });

    const savedGame = await newGame.save();
    if (!savedGame) return res.status(500).send("cant create the game");
    res.status(200).send(newGame);
  } catch(error){
    next(error)
  }
};

exports.updateGame = async (req, res, next) => {

  try{
    const resGame = await Game.findByIdAndUpdate(
      req.params.id,
      {
        fen: req.body.fen,
        gameOver: req.body.gameOver,
        result: req.body.result,
        turn: req.body.turn,
        deadPieces: req.body.deadPieces,
        newGame:false,
      },
      { new: true }
    );

    if (!resGame)
      return res.status(404).send("game with the spacific ID not found");
  
    res.status(200).send(resGame);

  }catch(error){
    next(error)
  }
};


exports.deleteGame = async (req, res, next) => {
  try{
    const resGame = await Game.findByIdAndRemove(req.params.id);
    if (!resGame)
      return res.status(404).send("game with the spacific ID not found");
  
    res.status(200).send(resGame);
  }catch(error){
    next(error)
  }
};

