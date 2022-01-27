require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { urlencoded } = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const todolists = require("./routes/todolists");
const notes = require("./routes/notes");
const users = require("./routes/users");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");

const app = express();

//connect to db

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`
);

const indexHTML = __dirname + "/public/index.html";

//middleware
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//api route
app.use("/api/todolists/user", todolists);
app.use("/api/notes/user", notes);

app.use(express.static(__dirname + "/public"));

app.get("*", checkUser);
app.get("/todolist", requireAuth, (req, res) => {
  res.sendFile(indexHTML);
});
app.get("/notes", requireAuth, (req, res) => {
  res.sendFile(indexHTML);
});
app.get("/login", (req, res) => {
  res.sendFile(indexHTML);
});
app.get("/signup", (req, res) => {
  res.sendFile(indexHTML);
});
app.use(users);
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
