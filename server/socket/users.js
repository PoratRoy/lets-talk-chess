
let users = [];

const addUser = (userId, socketId) => {
    !users.some((user)=> user.userId === userId) && users.push({userId, socketId});
    return users.map(u => u.userId);
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
    return users.map(u => u.userId);
}

const getAllUsers = () => {
    return users.map(u => u.userId);
}

const getUser = (userId) => {
    return users.find((user)=> user.userId === userId);
}


module.exports.addUser = addUser;
module.exports.removeUser = removeUser;
module.exports.getAllUsers = getAllUsers;
module.exports.getUser = getUser;