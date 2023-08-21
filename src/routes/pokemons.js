const express = require("express");
const router = express.Router();

const pokemonsController = require("../controllers/pokemons");

// Get pokemon by its id
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  let result = [];

  try {
    result = await pokemonsController.findPokemonByIdApi(id);

    if (!result.length)
      return res.status(404).json({
        statusCode: 404,
        msg: `Pokemon with ID: ${id} not found!`,
      });

    res.status(200).json({
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

// Get all pokemons
router.get("/", async (req, res, next) => {
  try {
    const apiResults = await pokemonsController.getAllApi();

    return res.status(200).json({
      statusCode: 200,
      data: apiResults,
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
