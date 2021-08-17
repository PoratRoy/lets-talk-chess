const { Message } = require("../../models/chat-models/Message");
const ErrorResponse = require("../../utils/errorResponse");

exports.addMessage = async (req, res, next) => {
  try {
    const newMessage = new Message(req.body);
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (error) {
    next(error);
  }
};

exports.getMessageById = async (req, res, next) => {
  try {
    const message = await Message.find({
      groupId: req.params.id,
    });
    if (!message) {
      return next(new ErrorResponse("Can't get message", 400));
    }
    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};
