const { Router } = require("express");
const connect = require("../lib/connect");
const Note = require("../models/Note");
const User = require("../models/User");

const route = Router();

route.get("/", async (req, res) => {
  await connect();
  const notes = await Note.find();

  if (!notes.length) {
    return res.json({ message: "note not found" });
  }

  return res.json(notes);
});

route.get("/:noteId", async (req, res) => {
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

route.post("/", async (req, res) => {
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

app.post("/:user", async (req, res) => {
  await connect();

  const { user } = req.params;

  if (user) {
    let { _id: userId } = (await User.findOne({ name: user })) || {
      _id: null,
    };

    if (!userId) {
      const { _id: newUserId } = (await User.create({ name: user })) || {
        _id: null,
      };

      userId = newUserId;
    }

    const { content } = req.body;

    if (content) {
      const { _id } = await Note.create({ content, user: userId });
      res.json({ _id, message: "Note was successfully created" });
    } else {
      res.json({ message: "Note is not created. Check the content" });
    }
  }
});

route.put("/:noteId", async (req, res) => {
  await connect();

  const { content } = req.body;
  const { noteId } = req.params;

  try {
    await Note.updateOne({ _id: noteId }, { content });
    res.status(200).json({ message: "Updated succesfully" });
  } catch (error) {
    res.status(404).json({ message: "Not updated", error });
  }
});

route.delete("/:noteId", async (req, res) => {
  await connect();

  const { noteId } = req.params;

  try {
    await Note.deleteOne({ _id: noteId });
    res.status(200).json({ message: "Deleted succesfully" });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Not deleted. Please provide a valid ID.", error });
  }
});

module.exports = route;
