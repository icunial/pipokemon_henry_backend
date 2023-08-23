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
  const { name } = req.query;

  try {
    if (name) {
      const apiResults = await pokemonsController.findByNameApi(name);

      if (!apiResults.length) {
        return res.status(404).json({
          statusCode: 404,
          msg: `Pokemon with name ${name} not found!`,
        });
      }
      return res.status(200).json({
        statusCode: 200,
        data: apiResults,
      });
    }

    const apiResults = await pokemonsController.getAllApi();

    return res.status(200).json({
      statusCode: 200,
      data: apiResults,
    });
  } catch (error) {
    return next(error);
  }
});

// Get pokemons by their type
router.get("/types/:type", async (req, res, next) => {
  const { type } = req.params;
  try {
    if (type) {
      const apiResults = await pokemonsController.findByTypeApi(type);
      if (!apiResults.length) {
        return res.status(404).json({
          statusCode: 404,
          msg: `Pokemons of type ${type} not found!`,
        });
      }
      return res.status(200).json({
        statusCode: 200,
        data: apiResults,
      });
    }
  } catch (error) {
    return next(error);
  }
});

// Order height routes
router.get("/filter/height/:opt", async (req, res, next) => {
  try {
    const { opt } = req.params;

    let results = [];

    if (opt === "more") {
      results = await pokemonsController.orderPokemonsMoreHeight();
    } else if (opt === "less") {
      results = await pokemonsController.orderPokemonsLessHeight();
    } else {
      return res.status(400).json({
        statusCode: 400,
        msg: `No filter available`,
      });
    }
    res.status(200).json({
      statusCode: 200,
      data: results,
    });
  } catch (error) {
    return next(error);
  }
});

// Order weight routes
router.get("/filter/weight/:opt", async (req, res, next) => {
  try {
    const { opt } = req.params;

    let results = [];

    if (opt === "more") {
      results = await pokemonsController.orderPokemonsMoreWeight();
    } else if (opt === "less") {
      results = await pokemonsController.orderPokemonsLessWeight();
    } else {
      return res.status(400).json({
        statusCode: 400,
        msg: `No filter available`,
      });
    }
    res.status(200).json({
      statusCode: 200,
      data: results,
    });
  } catch (error) {
    return next(error);
  }
});

// Order life routes
router.get("/filter/life/:opt", async (req, res, next) => {
  try {
    const { opt } = req.params;

    let results = [];

    if (opt === "more") {
      results = await pokemonsController.orderPokemonsMoreLife();
    } else if (opt === "less") {
      results = await pokemonsController.orderPokemonsLessLife();
    } else {
      return res.status(400).json({
        statusCode: 400,
        msg: `No filter available`,
      });
    }
    res.status(200).json({
      statusCode: 200,
      data: results,
    });
  } catch (error) {
    return next(error);
  }
});

// Order attack routes
router.get("/filter/attack/:opt", async (req, res, next) => {
  try {
    const { opt } = req.params;

    let results = [];

    if (opt === "more") {
      results = await pokemonsController.orderPokemonsMoreAttack();
    } else if (opt === "less") {
      results = await pokemonsController.orderPokemonsLessAttack();
    } else {
      return res.status(400).json({
        statusCode: 400,
        msg: `No filter available`,
      });
    }
    res.status(200).json({
      statusCode: 200,
      data: results,
    });
  } catch (error) {
    return next(error);
  }
});

// Gets pokemons from API or DB
router.get("/from/:from", async (req, res, next) => {
  const { from } = req.params;
  try {
    if (from === "api") {
      const apiResults = await pokemonsController.getAllApi();
      if (!apiResults.length) {
        return res.status(404).json({
          statusCode: 404,
          msg: `There are not pokemons saved in the API!`,
        });
      }
      return res.status(200).json({
        statusCode: 200,
        data: apiResults,
      });
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
