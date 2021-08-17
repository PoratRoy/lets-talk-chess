
const express = require('express');
const router = express.Router();
const {currentUser, allUsers, userById} = require('../../controllers/app-controllers/private')
const {protect} = require('../../middleware/auth');


//https://lets-talk-chess.herokuapp.com/api/private/me -- get current user
router.get('/me',protect, currentUser);

//https://lets-talk-chess.herokuapp.com/api/private/all -- get all users
router.get('/all',protect, allUsers);

//https://lets-talk-chess.herokuapp.com/api/private/id -- get user by id 
router.get('/:id',protect, userById);


module.exports = router;