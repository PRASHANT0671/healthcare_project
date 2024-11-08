const express = require("express");
const router = express.Router();
const {
  registerUser,

} = require("../controllers/userController");

router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists." });
    }
    const newUser = new User({ email, password, name });
    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "An error occurred during registration" });
  }
});
module.exports = router;
