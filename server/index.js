require('dotenv').config();
const express = require('express');
const app = express();
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const cors = require('cors');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
 });

app.use(express.json());

let server
mongoose.connect(process.env.CONNECTION_URL)
.then(()=>{
    console.log('Connect to mongodb...');
    server = app.listen(PORT, ()=> {console.log(`Server running on port ${PORT}....`)});
    require('./socket/socketUsers')(server);
})
.catch((error)=>{console.log(error.message)});

require('./config/routes')(app);
require('./config/prod')(app);

app.get('/',async (req,res)=>{
    res.status(200).send('Server up and running...')
})

//handeling errors
process.on('unhandledRejection', (err, promise) => {
    console.log(err.message);
    server.close(()=> {process.exit(1)});
})

