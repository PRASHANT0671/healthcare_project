// Import dependencies
const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const hbs = require("hbs");
const path = require("path");
const multer = require("multer");
const dotenv = require("dotenv");
const app = express();
const port = process.env.PORT || 5000;
const userRouter = require("./routes/userRouter");
const doctorRoutes = require("./routes/doctorRoutes");


dotenv.config();

connectDb();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    console.log("Uploaded file extension:", ext);
    if (ext !== ".jpg" && ext !== ".png" && ext !== ".gif" && ext != ".jpeg") {
      return callback(new Error("Only images are allowed."));
    }
    callback(null, true);
  },
  limits: {
    fileSize: 1024 * 1024,
  },
});

// API routes
app.use("/api/users", userRouter);
app.use("/api/register", userRouter);
app.use("/api/doctors", doctorRoutes);

app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.send(`File uploaded successfully: ${req.file.filename}`);
});

app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "./views/partials/header"));

const getSampleUsers = () => [
  { username: "Parth", date: "23-10-2024", subject: "Maths" },
  { username: "Aarav", date: "23-10-2024", subject: "Science" },
  { username: "Ishita", date: "23-10-2024", subject: "History" },
];

app.get("/", (req, res) => {
  res.send("Server is working");
});

app.get("/home", (req, res) => {
  res.render("home", { users: getSampleUsers() });
});

app.get("/allusers", (req, res) => {
  res.render("users", { users: getSampleUsers() });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
