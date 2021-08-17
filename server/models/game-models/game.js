const mongoose = require('mongoose')
//const Joi = require('joi');


const gameSchema = new mongoose.Schema(
    {
        members:[{
            type: new mongoose.Schema({
                name:{
                    type:String,
                    required:true,
                    minlength:2,
                    maxlength:40
                },
                color:{
                    type:String,
                    default:'w'
                }
            })
        }],
        fen:{
            type: String,
            default: ""
        },
        gameOver:{
            type: Boolean
        },
        result: {
            type:String,
            default: ""
        },
        turn:{
            type:String,
            default:'w'
        },
        deadPieces:[{
            type: new mongoose.Schema({
                type:{
                    type:String,
                },
                color:{
                    type:String,
                }
            })
        }],
        newGame:{
            type:Boolean,
            default:true
        },
    },{timestamps:true}
)

const Game = mongoose.model('Game',gameSchema);

module.exports.Game = Game;
module.exports.gameSchema = gameSchema;


// type:{
//     type:String,
// }

// whitePlayer:{
//     type: new mongoose.Schema({
//         name:{
//             type:String,
//             required:true,
//             minlength:2,
//             maxlength:40
//         }
//     })
// },
// blackPlayer:{
//     type: new mongoose.Schema({
//         name:{
//             type:String,
//             required:true,
//             minlength:2,
//             maxlength:40
//         }
//     })
// },

// const gameValidate = (input) =>{
//     const schema = {
//         userId: Joi.objectId().required(),
//         fen: Joi.string(),
//         gameOver: Joi.boolean(),
//         result: Joi.string().allow(""),
//         turn: Joi.string()
//     } 
//     return Joi.validate(input, schema);
// }

//module.exports.gameValidate = gameValidate;

// whitePlayerName: Joi.objectId().required(),
// blackPlayerName: Joi.objectId().required(),