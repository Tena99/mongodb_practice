require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const connect = require("./connect");
const Note = require("./models/Note");
const User = require("./models/User");

app.use(express.json());

app.get("/", async (req, res) => {
  await connect();
  const notes = await Note.find();

  if (!notes.length) {
    return res.json({ message: "note not found" });
  }

  return res.json(notes);
});

app.post("/", async (req, res) => {
  await connect();

  const content = req.body;
  try {
    await Note.create(content);
    res.status(201).json({ message: "Document created successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/:noteId", async (req, res) => {
  await connect();

  let { noteId } = req.params;

  try {
    const content = await Note.find({ _id: noteId });
    if (!content) {
      return res.send({ message: "Error" });
    }
    res.send(content);
  } catch (error) {
    return res.send("Sorry. Not found");
  }
});

const server = app.listen(port, () =>
  console.log(`Express app listening on port ${port}!`)
);

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
