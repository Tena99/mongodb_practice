const mongoose = require("mongoose");

const { Schema } = mongoose;

const usersSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { versionKey: false }
);

const User = mongoose.models.User || mongoose.model("User", usersSchema);

module.exports = User;
