const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../model/User");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      /// GET THE TOKEN FROM HEADER
      token = req.headers.authorization.split(' ')[1];
      // VERIFY THE TOKEN
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      // GET USER FROM THE TOKEN
      req.user = await User.findById(decode.id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, No Token");
  }
});

module.exports = { protect };
