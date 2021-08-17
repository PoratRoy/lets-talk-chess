const express = require('express');
const router = express.Router();
const {addGroup, getGroupById, getGroupByMembers} = require('../../controllers/chat-controllers/groups');

//https://lets-talk-chess.herokuapp.com/api/groups -- add new group
router.post('/', addGroup);

//https://lets-talk-chess.herokuapp.com/api/groups/:id -- get group by id
router.get('/:id', getGroupById);

//https://lets-talk-chess.herokuapp.com/api/groups/members/:memberId1/:memberId2 -- get group by his members
router.get('/members/:memberId1/:memberId2', getGroupByMembers);

module.exports = router;

