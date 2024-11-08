const mongoose = require("mongoose");
const doctorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "please add your name"],
    },
    email: {
      type: String,
      require: [true, "please add your last name"],
    },
    Speciality: {
      type: String,
      require: [true, "please add your Speciality"],
    },
    Experience: {
      type: String,
      require: [true, "please add your experience"],
    },
    phoneNumber: {
      type: Number,
      require: [true, "please add your phone number"],
    },
    address: {
      type: String,
      require: [true, "please add your address"],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Doctor", doctorSchema);
