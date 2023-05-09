const jwt = require("jsonwebtoken");
const User = require("../models/user");
const ErrorResponse = require("../utils/errorResponse");

exports.protect = async (req, res, next) => {
//   let token;
console.log('request came')
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    // return next(new ErrorResponse("not autherized to access this route", 401));
    res.status(401).json({
      "error" : "not autherized to access this route",
      "success" : false
    })
  }

// console.log('request came 2')
 

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decode.id);

    if (!user) {
      // return next(new ErrorResponse("user not found", 404));
      res.status(400).json({
        "error" : "User not found",
        "success" : false
      })
    }

console.log('entered try')


    req.user = user;

    next();
  } catch (error) {
    // return next(new ErrorResponse("not autherized to access this route", 401));
    console.log('entered catch')
    res.status(400).json({
      "error" : "not autherized to access this route",
      "success" : false
    })
  }

};
