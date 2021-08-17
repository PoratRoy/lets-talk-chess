
const mongoose = require('mongoose');
const Joi = require('joi');

const messageSchema = new mongoose.Schema({

    groupId:{
        type:String
    },
    sender: {
        type: String
    },
    text: {
        type: String
    }

},{timestamps:true})

const Message = mongoose.model('Message',messageSchema);

const messageValidate = (input) =>{
    const schema = {
        userId: Joi.objectId().required(),
        text: Joi.string().required().min(0).max(1000),
        time: Joi.date().required()
    } 
    return Joi.validate(input, schema);
}

module.exports.Message = Message;
module.exports.messageSchema = messageSchema;
module.exports.messageValidate = messageValidate;

