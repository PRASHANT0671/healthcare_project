const asyncHandler = require("express-async-handler");
// const bcrypt = require("bcrypt");
const Doctor = require("../models/doctorDetailsModal"); // Corrected variable name to 'doctor'
require("dotenv").config();

const registerDoctor = asyncHandler(async (req, res) => {
  const { name, email, speciality, phoneNumber, experience, address } =
    req.body;

  // Validate all required fields
  if (
    !name ||
    !email ||
    !speciality ||
    !experience ||
    !phoneNumber ||
    !address
  ) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  // Check if the user already exists
  const doctorExists = await Doctor.findOne({ email });
  if (doctorExists) {
    return res.status(400).json({ message: "Doctor already exists" });
  }

  // Create a new user
  const newDoctor = await Doctor.create({
    name,
    email,
    speciality,
    experience,
    address,
    phoneNumber,
    // password: hashedPassword,
  });

  res.status(201).json({ message: "Doctor registered successfully" });
});

module.exports = { registerDoctor };
