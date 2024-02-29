require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const connect = require("./lib/connect");
const index = require("./routes");

app.use(express.json());

app.use("/", index);

const server = app.listen(port, () =>
  console.log(`Express app listening on port ${port}!`)
);

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
