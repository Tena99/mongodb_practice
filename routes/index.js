const { Router } = require("express");
const connect = require("../lib/connect");
const Note = require("../models/Note");

const route = Router();

route.get("/", async (req, res) => {
  await connect();
  const notes = await Note.find();

  if (!notes.length) {
    return res.json({ message: "note not found" });
  }

  return res.json(notes);
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

module.exports = route;
