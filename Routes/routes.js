let router = require("express").Router();
const jwtMiddleware = require("../Middleware/middleware");

const gameController = require("../Controllers/game.controller");

router.post("/games", jwtMiddleware, gameController.create);

router.get("/games", gameController.findAll);

router.get("/games/:gameId", gameController.findOne);

router.put("/games/:gameId", gameController.update);

router.delete("/games/:gameId", gameController.delete);

module.exports = router;
