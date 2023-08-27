const express = require("express");
const router = express.Router();

const pokemonsRouter = require("./pokemons");
const typesRouter = require("./types");

// Specify router root route
router.use("/pokemons", pokemonsRouter);
router.use("/types", typesRouter);

module.exports = router;
