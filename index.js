const express = require("express");
const apiRoutes = require("./server/index");
const { errorlogs, errorHandler } = require("./middleware/error.handler");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Happy Art");
});

apiRoutes(app);
app.use(errorHandler);
app.use(errorlogs);

app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`);
  console.log(`http://localhost:${port}`);
});

module.exports = app;