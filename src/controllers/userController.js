import { User } from "../models/index.js";
import { createToken } from "../middleware/auth.js";

const register = async (req, res) => {
  const { name, password } = req.body;

  try {
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }
    const newUser = new User({ name, password });
    await newUser.save();

  
    const token = createToken(newUser);

    return res.status(201).json({
      success: true,
      message: "User Registered successfully.",
      data: newUser,
      token: token,
    }); 
  } catch (error) {
    console.error(`Registration error: ${error.message}`);
    return res.status(500).json({ message: "Internal server error." }); 
  }
};


const login = async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await User.findOne({ name });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials." }); 
    }

    const token = createToken(user);

    return res
      .status(200)
      .json({ success: true, message: "Login successful", token: token }); 
  } catch (error) {
    console.error(`Login error: ${error.message}`);
    return res.status(500).json({ message: "Internal server error." }); 
  }
};

export { register, login };
