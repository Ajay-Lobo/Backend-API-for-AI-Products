import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const createToken = (user) => {
  try {
    if (!user || !user._id || !user.name) {
      return {
        statusCode: 400,
        message: "Invalid user data provided for token generation",
      };
    }

    const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return {
      statusCode: 200,
      token: token,
    };
  } catch (error) {
    console.error(`Error generating token: ${error.message}`);
    return {
      statusCode: 500,
      message: "Token generation failed",
    };
  }
};

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res
      .status(403)
      .json({ message: "Access denied. No token provided." }); 
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error(`Token verification failed: ${err.message}`);
    return res.status(401).json({ message: "Invalid token." });
  }
};

export { createToken, verifyToken };
