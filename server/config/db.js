
const mongoose = require('mongoose');

const connectDB = async() => {

    try{
        await mongoose.connect(process.env.CONNECTION_URL);
        console.log('Connect to mongodb...');
    }
    catch (error){
        console.log(error);
    }
}

module.exports = connectDB;