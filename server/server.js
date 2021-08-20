const express = require("express");
const app = express();
const router = require("./src/router");

app.use(express.json());

// Route API V1
app.use("/api", router);

// Route
app.use("/", (req, res) => {
  res.send(`<h1 align="center"> Memo API</h1>`);
});

// Running On Port
app.listen(3000);
