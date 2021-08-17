
const express = require('express');
const router = express.Router();
const {register, login, tokenIsValid} = require('../../controllers/app-controllers/auth');


//https://lets-talk-chess.herokuapp.com/api/auth/register
router.post('/register', register);

//https://lets-talk-chess.herokuapp.com/api/auth/login
router.post('/login', login);

//https://lets-talk-chess.herokuapp.com/api/auth/tokenIsValid -- is token valid
router.post('/tokenIsValid', tokenIsValid);

module.exports = router;


