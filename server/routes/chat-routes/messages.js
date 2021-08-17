const express = require('express');
const router = express.Router();
const {addMessage, getMessageById} = require('../../controllers/chat-controllers/messages');

//https://lets-talk-chess.herokuapp.com/api/messages -- add new message
router.post('/', addMessage);

//https://lets-talk-chess.herokuapp.com/api/messages/:id -- get message by id
router.get('/:id', getMessageById);

module.exports = router;

