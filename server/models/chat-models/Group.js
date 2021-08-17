const mongoose = require('mongoose');
const Joi = require('joi');

const groupSchema = new mongoose.Schema({

    members:[{
        type: new mongoose.Schema({
            name:{
                type:String,
                required:true,
                minlength:2,
                maxlength:40
            }
        })
    }]
    
},{timestamps:true})

const Group = mongoose.model('Group',groupSchema);

const groupValidate = (input) =>{
    const schema = {
        userId: Joi.objectId().required(),
        messageId: Joi.objectId().required(),
    } 
    return Joi.validate(input, schema);
}

module.exports.Group = Group;
module.exports.groupSchema = groupSchema;
module.exports.groupValidate = groupValidate;
