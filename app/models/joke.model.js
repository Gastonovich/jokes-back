const mongoose = require("mongoose");

const JokeSchema = mongoose.Schema(
  {
    category: [String],
    content: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Joke", JokeSchema);
