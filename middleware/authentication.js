const JWT = require("jsonwebtoken");
const secretKey = "manishrawt1331@";

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    name: user.name,
  };
  const token = JWT.sign(payload, secretKey, { expiresIn: "1h" });
  return token;
}

async function verifyToken(req, res, next) {
  try {
    // Retrieve token from the Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({ message: "Token is required" });
    }

    // Extract the token from the Authorization header
    const token = authHeader.split(" ")[1];

    // Verify the token
    JWT.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "Invalid token",
          error: err.message,
        });
      }

      // If verification is successful, attach the user to the request object
      req.user = decoded;

      next(); // Proceed to the next middleware or route handler
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}
module.exports = { createTokenForUser, verifyToken };
