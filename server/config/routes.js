
const errorHandler = require('../middleware/error')

const URL = '/api';

const routes = async(app) => {
    
    //app
    app.use(`${URL}/auth`, require('../routes/app-routes/auth')); 
    app.use(`${URL}/private`, require('../routes/app-routes/private')); 
    
    //chat
    app.use(`${URL}/groups`, require('../routes/chat-routes/groups'));
    app.use(`${URL}/messages`, require('../routes/chat-routes/messages'));
    
    //game
    app.use(`${URL}/game`, require('../routes/game-routes/game'));


    app.use(errorHandler);

}

module.exports = routes;


