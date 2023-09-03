const express = require("express");
const router = express.Router();

const Pokemon = require("../models/Pokemon");
const Type = require("../models/Type");

const pokemonsController = require("../controllers/pokemons");

const uuid = require("uuid");

const validations = require("../utils/validations");

// Get pokemon by its id
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  let result = [];

  try {
    if (id.includes("-")) {
      result = await pokemonsController.findPokemonByIdDb(id);
    } else {
      result = await pokemonsController.findPokemonByIdApi(id);
    }

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
  const { name, page } = req.query;

  try {
    if (name) {
      const apiResults = await pokemonsController.findByNameApi(name);
      const dbResults = await pokemonsController.findByNameDb(name);

      const results = dbResults.concat(apiResults);

      if (!results.length) {
        return res.status(404).json({
          statusCode: 404,
          msg: `Pokemon with name ${name} not found!`,
        });
      }
      return res.status(200).json({
        statusCode: 200,
        data: results,
      });
    }

    const apiResults = await pokemonsController.getAllApi();
    const dbResults = await pokemonsController.getAllDb();
    const results = dbResults.concat(apiResults);

    if (page) {
      // Validate if its a number
      if (page !== "0" && !parseInt(page)) {
        return res.status(400).json({
          statusCode: 400,
          msg: `Page param must be a number!`,
        });
      }

      const totalPages = Math.round(results.length / 12);

      // Validates if page exists
      if (parseInt(page) === 0 || parseInt(page) > totalPages) {
        return res.status(404).json({
          statusCode: 404,
          msg: `Page ${page} not found!`,
        });
      }
    }

    return res.status(200).json({
      statusCode: 200,
      totalResults: results.length,
      totalPages: Math.round(results.length / 12),
      page: parseInt(page) || 1,
      data: await pokemonsController.getPokemonsPagination(
        results,
        parseInt(page) || 1
      ),
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
      const dbResults = await pokemonsController.findByTypeDb(type);

      const results = dbResults.concat(apiResults);
      if (!results.length) {
        return res.status(404).json({
          statusCode: 404,
          msg: `Pokemons of type ${type} not found!`,
        });
      }
      return res.status(200).json({
        statusCode: 200,
        data: results,
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
    if (from === "db") {
      const dbResults = await pokemonsController.getAllDb();
      if (!dbResults.length) {
        return res.status(404).json({
          statusCode: 404,
          msg: `There are not pokemons saved in the DB!`,
        });
      }
      return res.status(200).json({
        statusCode: 200,
        data: dbResults,
      });
    }
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

// POST a new pokemon
router.post("/", async (req, res, next) => {
  const pokemon = req.body;

  // Validations body properties

  if (validations.validateName(pokemon.name)) {
    return res.status(400).json({
      statusCode: 400,
      msg: validations.validateName(pokemon.name),
    });
  }

  if (validations.validateHeight(pokemon.height)) {
    return res.status(400).json({
      statusCode: 400,
      msg: validations.validateHeight(pokemon.height),
    });
  }

  if (validations.validateWeight(pokemon.weight)) {
    return res.status(400).json({
      statusCode: 400,
      msg: validations.validateWeight(pokemon.weight),
    });
  }

  if (validations.validateLife(pokemon.life)) {
    return res.status(400).json({
      statusCode: 400,
      msg: validations.validateLife(pokemon.life),
    });
  }

  if (validations.validateAttack(pokemon.attack)) {
    return res.status(400).json({
      statusCode: 400,
      msg: validations.validateAttack(pokemon.attack),
    });
  }

  if (validations.validateDefense(pokemon.defense)) {
    return res.status(400).json({
      statusCode: 400,
      msg: validations.validateDefense(pokemon.defense),
    });
  }

  if (validations.validateSpeed(pokemon.speed)) {
    return res.status(400).json({
      statusCode: 400,
      msg: validations.validateSpeed(pokemon.speed),
    });
  }

  try {
    const pokemonCreated = await Pokemon.create({
      ...dog,
      id: uuid.v4(),
    });

    pokemon.types.forEach(async (type) => {
      const typeFound = await Type.findOne({
        where: { name: type },
      });
      typeFound.addPokemon(pokemonCreated.id);
    });

    res.status(201).json({
      statusCode: 201,
      data: pokemonCreated,
    });
  } catch (error) {
    return next(new Error("Error trying to create a new pokemon!"));
  }
});

// DELETE a pokemon from DB
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await pokemonsController.deletePokemonFromDbById(id);

    if (!result.length) {
      return res.status(404).json({
        statusCode: 404,
        msg: `Pokemon with ID: ${id} not found!`,
      });
    }

    res.status(200).json({
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

// UPDATE a pokemon by its ID
router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const result = await pokemonsController.updatePokemonFromDb(id, body);
    res.status(200).json({
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
