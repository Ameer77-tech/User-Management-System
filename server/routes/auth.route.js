const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const posts = require("../models/posts");
const users = require("../models/user_details");
require("dotenv").config();
const verifyToken = require("../middlewares/verifyToken");
const sendMail = require("../utils/mailer");

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (name === "" || email === "" || password === "") {
    res.status(403).json({ message: "Data Can't Be Empty", success: false });
  }
  try {
    const isRegistered = await users.findOne({ email });
    if (isRegistered) {
      res.status(403).json({
        message: "User with that email already exists",
        success: false,
      });
    } else {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await users.create({
          name,
          email,
          password: hashedPassword,
        });
        res
          .status(200)
          .json({ message: "User Registered Successfully", success: true });
      } catch (err) {
        res
          .status(500)
          .json({ message: "Error creating user", success: false });
      }
    }
  } catch (err) {
    res.status(500).json({ message: "Error finding user", success: false });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await users.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "Invalid Credentials", success: false });
    } else {
      const hashedPassword = user.password;
      const isMatched = await bcrypt.compare(password, hashedPassword);
      if (!isMatched) {
        res
          .status(401)
          .json({ message: "Invalid Credentials", success: false });
      } else {
        const token = jwt.sign(email, process.env.JWT_SECRET_KEY);
        res.cookie("token", token, {
          httpOnly: true,
          secure: false,
          sameSite: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(200).json({ message: "User Logged In", success: true });
      }
    }
  } catch (err) {
    res.status(500).json({ message: "Error Occured", success: false });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ msg: "Logged Out Successfully", success: true });
});

router.get("/check-auth", verifyToken, (req, res) => {
  res.json({ msg: "already logged in", loggedIn: true });
});

router.post("/sendcode", async (req, res) => {
  const { email } = req.body;
  const verificationCode = Math.floor(100000 + Math.random() * 900000);
  try {
    await sendMail(email, verificationCode);
    await users.findOneAndUpdate(
      { email },
      {
        verificationCode: verificationCode,
      }
    );
    res.status(200).json({ msg: "Verification Code Sent", success: true });
  } catch (err) {
    res.status(500).json({ msg: "Error Sending Code", success: false });
  }
});

router.post("/verifycode", async (req, res) => {
  const { code, email } = req.body;
  try {
    const user = await users.findOne({ email });
    const originalCode = user.verificationCode;
    if (code != originalCode) {
      res.status(401).json({ msg: "Invalid Code", success: false });
    }
    user.isVerified = true;
    user.verificationCode = "";
    await user.save();
    res.status(200).json({ msg: "Valid Code", success: true });
  } catch (err) {
    res.status(500).json({ msg: "Error Occured", success: false });
  }
});

module.exports = router;
