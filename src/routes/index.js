const express = require("express");
const router = express.Router();

const pokemonsRouter = require("./pokemons");

// Specify router root route
router.use("/pokemons", pokemonsRouter);

module.exports = router;
