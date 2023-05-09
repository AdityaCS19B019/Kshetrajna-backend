exports.getPrivateData = async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Authorised!",
    role : req.user.role,
    id : req.user._id
  });
};
