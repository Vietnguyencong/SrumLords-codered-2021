require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");

const usersRouter = require("./routes/users");
const inspectionRouter = require("./routes/inspection");
const incidentsRouter = require("./routes/incidents");

app.use(express.json());
app.use(express.static("static"));

app.use(cors());
app.use(function (req, res, next) {
  console.log(req.method, ": ", req.url, "at", Date.now());
  next();
});

app.get("/", (req, res) => {
  return res.json({
    message: "that is good looking",
  });
});

app.use("/users", usersRouter);
app.use("/inspection", inspectionRouter);
app.use("/incidents", incidentsRouter);

PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`API listening at http://localhost:${PORT}`);
  console.log("CORS-enable webserver");
});
