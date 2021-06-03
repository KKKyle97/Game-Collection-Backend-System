const GameSchema = require("../Models/game.model");
const mongoose = require("mongoose");

GameSchema.statics.createGame = function createGame(data, callback) {
  const game = this(data);
  game.save(callback);
};

GameSchema.statics.getAllGames = function getAllGames(callback) {
  this.find(callback);
};

GameSchema.statics.getOneGame = function getOneGame(id, callback) {
  this.findById(id, callback);
};

GameSchema.statics.updateGame = function updateGame(id, data, callback) {
  this.findByIdAndUpdate(id, data, { new: true }, callback);
};

GameSchema.statics.deleteGame = function deleteGame(id, callback) {
  this.findByIdAndDelete(id, callback);
};

const Game = mongoose.model("Game", GameSchema);

module.exports = Game;
