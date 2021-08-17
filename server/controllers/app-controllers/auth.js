const { User, loginValidate, userValidate } = require("../../models/app-models/User");
const ErrorResponse = require("../../utils/errorResponse");
const _ = require("lodash");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  const { error } = userValidate(req.body);
  if (error) {
    return next(new ErrorResponse(error.details[0].message, 400));
  }

  try {
    const user = new User(_.pick(req.body, ["name", "userName", "password"]));
    await user.save(); 

    const token = user.generateAuthToken();
    res
      .header("x-auth-Token", token)
      .status(201)
      .send(_.pick(user, ["name", "userName"]));
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { error } = loginValidate(req.body);
  if (error) {
    return next(
      new ErrorResponse("Please provide user name and password", 400)
    );
  }

  try {
    const user = await User.findOne({ userName: req.body.userName });
    if (!user) {
      return next(new ErrorResponse("invalid userName or password", 401));
    }

    const isMatch = await user.matchesPassword(req.body.password);
    if (!isMatch) {
      return next(new ErrorResponse("invalid userName or password", 401));
    }

    const token = user.generateAuthToken();
    res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        userName: user.userName,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.tokenIsValid = async (req, res, next) => {
  try {
    const token = req.header("x-auth-Token"); 
    if (!token) return res.json(null);
    
    const verified = jwt.verify(token, process.env.CHAT_JWT_KEY); 
    if (!verified) return res.json(null);
    
    const user = await User.findById(verified._id).select("-password");
    if (!user) return res.json(null);

    
    return res.status(200).json({
      name: user.name,
      userName: user.userName,
      _id: user._id,
    });
  } catch (error) {
    next(error);
  }
};
