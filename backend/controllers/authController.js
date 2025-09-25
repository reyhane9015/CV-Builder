const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password, profileImageUrl } = req.body;

    const userExsits = await User.findOne({ email });
    if (userExsits) {
      return res.status(400).json({ message: "کاربر قبلا ثبت نام کرده است" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profileImageUrl,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "SERVER error", error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "نام کاربری یا کلمه عبور نامعتبر است" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "نام کاربری یا کلمه عبور نامعتبر است" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "SERVER error", error: error.message });
  }
};

// @desc Get user profile
// @route POST /api/auth/profile
// @access Private (requires JWT)
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "کاربر یافت نشد" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "SERVER error", error: error.message });
  }
};

module.exports = { registerUser, loginUser, getUserProfile };
