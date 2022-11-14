//const socketio = require('socket.io');
const { addUser, removeUser, getUser, getAllUsers } = require('./users');

module.exports = function(server) {
	const io = require('socket.io')(server);
    // const io = require('socket.io').listen(server);

	//connect
	io.on('connect', (socket) => {
		//add login user to users socket array
		socket.on('addUserToArray', (userId) => {
			const users = addUser(userId, socket.id);
			io.emit('receiveAllActiveUsers', users);
		});

		//add new register user to users socket array
		socket.on('addNewRegisterUser', (userId) => {
			const users = addUser(userId, socket.id);
			io.emit('getNewRegisterUser', userId);
		});

		socket.on('getAllActiveUsers', () => {
			const users = getAllUsers();
			io.emit('receiveAllActiveUsers', users);
		});

		//-----chat-----//

		//send and get message
		socket.on('newArrivalMessageToServer', ({ senderId, receiver, text }) => {
			const receiverId = receiver._id;
			const receivedUser = getUser(receiverId);
			if (receivedUser) {
				io.to(receivedUser.socketId).emit('newArrivalMessageToClient', {
					senderId,
					receiverId,
					text
				});
			}
		});

		//update the new group that open
		socket.on('addNewGroup', (receiverId) => {
			const receivedUser = getUser(receiverId);
			if (receivedUser) {
				io.to(receivedUser.socketId).emit('updateGroups');
			}
		});

		//-----game-----//

		//new move
		socket.on('newMove', (game, receiverId) => {
			const receivedPlayer = getUser(receiverId);
			if (receivedPlayer) {
				io.to(receivedPlayer.socketId).emit('updateNewMove', {
					game
				});
			}
		});

		//eaten pieces
		socket.on('newEatenPiece', (piece, receiverId) => {
			const receivedPlayer = getUser(receiverId);
			if (receivedPlayer) {
				io.to(receivedPlayer.socketId).emit('updateNewEatenPiece', {
					piece
				});
			}
		});

		//turns
		socket.on('turn', (turn, receiverId) => {
			const receivedPlayer = getUser(receiverId);
			if (receivedPlayer) {
				io.to(receivedPlayer.socketId).emit('updateTurn', {
					turn
				});
			}
		});

		//alert to other player about the game
		socket.on('newGame', (senderId, receiverId) => {
			const receivedPlayer = getUser(receiverId);
			if (receivedPlayer) {
				io.to(receivedPlayer.socketId).emit('alertAboutNewGame', {
					senderId
				});
			}
		});

		// alert other player to clear the game details
		socket.on('restartGameDetails', (receiverId) => {
			const receivedPlayer = getUser(receiverId);
			if (receivedPlayer) {
				io.to(receivedPlayer.socketId).emit('updateRestartGameDetails');
			}
		});

		//disconnect
		socket.on('disconnect', () => {
			const users = removeUser(socket.id);
			io.emit('receiveAllActiveUsers', users);
		});
	});

	return io;
};
