// centaralized error handling

const errorHandling = (error, req, res, next) => {
  res.status(500).json({
    status: 500,
    message: "Something went wrong",
    error: error.message,
  });
};

module.exports = errorHandling;
