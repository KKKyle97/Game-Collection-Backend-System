const Game = require("../Dao/game.dao");

exports.create = (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(403).json({
      message: "Unathorized action.",
    });

  if (!req.body) {
    return res.status(400).send({
      message: "No item found",
    });
  }

  const game = {
    title: req.body.title,
    genre: req.body.genre,
    platform: req.body.platform,
  };

  Game.createGame(game, (err, data) => {
    if (err) {
      res.status(500).json({
        status: "failed",
        message: err.message,
      });
    }
    res.status(201).json({
      status: "success",
      data,
    });
  });
};

exports.findAll = (req, res) => {
  Game.getAllGames((err, data) => {
    if (err) {
      return res.status(500).json({
        status: "failed",
        message: err.message,
      });
    }

    return res.status(200).json({
      status: "success",
      data,
    });
  });
};

exports.findOne = (req, res) => {
  Game.getOneGame(req.params.gameId, (err, data) => {
    if (err) {
      if (err.kind === "ObjectId") {
        return res.status(404).json({
          message: "Game not found with id " + req.params.gameId,
        });
      }

      return res.status(500).json({
        status: "failed",
        message: "Error retrieving game with id " + req.params.gameId,
      });
    }

    if (!data) {
      return res.status(404).json({
        message: "Game not found with id" + req.params.gameId,
      });
    }

    res.status(200).json({
      status: "success",
      data,
    });
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "No item found",
    });
  }

  const newGameData = {
    title: req.body.title,
    genre: req.body.genre,
    platform: req.body.platform,
  };

  Game.updateGame(req.params.gameId, newGameData, (err, data) => {
    if (err) {
      if (err.kind === "ObjectId") {
        return res.status(404).json({
          message: "Game not found with id " + req.params.gameId,
        });
      }
      return res.status(500).json({
        status: "failed",
        message: "Error updating game with id " + req.params.gameId,
      });
    }

    if (!data) {
      return res.status(404).json({
        message: "Game not found with id " + req.params.gameId,
      });
    }

    return res.status(200).json({
      status: "success",
      data,
    });
  });
};

exports.delete = (req, res) => {
  Game.deleteGame(req.params.gameId, (err, data) => {
    if (err) {
      if (err.kind === "ObjectId") {
        return res.status(404).json({
          message: "Game not found with id " + req.params.gameId,
        });
      }
      return res.status(500).json({
        status: "failed",
        message: "Error deleting game with id " + req.params.gameId,
      });
    }

    if (!data) {
      return res.status(404).json({
        message: "Game not found with id " + req.params.gameId,
      });
    }

    return res.status(200).json({
      status: "success",
      message: "game deleted!",
    });
  });
};
