const express = require("express");
const { urlencoded } = require("body-parser");
const cors = require("cors");

const app = express();

//middleware
app.use(urlencoded({ extended: true }));
app.use(express.json({ limit: "1mb" }));
app.use(cors());

const list = require("./routes/list");
const notes = require("./routes/notes");

app.use("/api/list", list);
app.use("/api/notes", notes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
