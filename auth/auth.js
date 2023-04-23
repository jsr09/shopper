const express = require("express");
const router = express.Router();
const {User} = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ err: "Please fill all fields" });
  const user = await User.findOne({ email });
  if (user) return res.status(400).json({ err: "User already exists" });
  const hash = await bcrypt.hash(password, 10);
  const newUser = new User({
    name,
    email,
    password: hash,
    cart: [],
  });
  await newUser.save();
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
  res.cookie("auth", token);
  return res.send({ email, name });

});

router.post("/login", async (req, res) => {
  try{
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ err: "Please fill all fields" });
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ err: "User not found" });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ err: "Invalid password" });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("auth", token);
  return res.send({ email, name: user.name });
  }catch (err) {
    res.status(500).send({ err: "internal server error" });
  }
});

router.get("/logout", (req, res) => {
  try{
  res.clearCookie("auth");
  return res.send({ message: "Logged out" });
  }catch (err) {
    res.status(500).send({ err: "internal server error" });
  }
});

router.get("/me", async (req, res) => {
  try{
  let auth = req.cookies.auth;
  if (!auth) return res.status(401).json({ err: "Not logged in" });
  const verified = jwt.verify(auth, process.env.JWT_SECRET);
  if (!verified) return res.status(401).json({ err: "Invalid token" });
  const user = await User.findById(verified.id);
  if (!user) return res.status(401).json({ err: "User not found" });
  return res.send({ email: user.email, name: user.name });
  }catch (err) {
    res.status(500).send({ err: "internal server error" });
  }
});

module.exports = router;
