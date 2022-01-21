require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { urlencoded } = require("body-parser");
const cors = require("cors");
const todolists = require("./routes/todolists");
const notes = require("./routes/notes");
const authRoutes = require("./routes/authRoutes");

const app = express();

//connect to db

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`
);

//middleware
app.use(urlencoded({ extended: true }));
app.use(express.json({ limit: "1mb" }));
app.use(cors());

//api route
app.use("/api/todolists", todolists);
app.use("/api/notes", notes);
app.use(authRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
