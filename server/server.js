require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { urlencoded } = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const todolists = require("./routes/todolists");
const notes = require("./routes/notes");
const users = require("./routes/users");

const app = express();

//connect to db

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`
);

//middleware
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//api route
app.use("/api/todolists/user", todolists);
app.use("/api/notes/user", notes);
app.use("/api/users", users);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
