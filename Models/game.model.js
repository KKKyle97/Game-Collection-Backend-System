const mongoose = require("mongoose");
const { Schema } = mongoose;

const gameSchema = new Schema({
  title: String,
  genre: String,
  platform: [],
});

module.exports = gameSchema;
