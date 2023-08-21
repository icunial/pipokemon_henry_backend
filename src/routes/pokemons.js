const express = require("express");
const router = express.Router();

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
