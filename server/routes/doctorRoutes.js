// doctorRoutes.js
const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctorDetailsModal"); 

router.post("/register", async (req, res) => {
  try {
    // Extract relevant data from the request body
    const { email, name, specialty } = req.body;

    // Check if a doctor with the same email already exists
    const existingDoctor = await Doctor.findOne({ email });

    if (existingDoctor) {
      // If a duplicate is found, respond with an error message
      return res
        .status(400)
        .json({ message: "A doctor with this email already exists." });
    }

    // If no duplicate, proceed with registration
    const newDoctor = new Doctor({
      name,
      email,
      specialty,
    });

    // Save the new doctor in the database
    await newDoctor.save();

    res
      .status(201)
      .json({ message: "Doctor registered successfully", doctor: newDoctor });
  } catch (error) {
    console.error("Error registering doctor:", error);
    res.status(500).json({ message: "An error occurred during registration" });
  }
});

module.exports = router;
