const express = require("express");
const router = express.Router();

const Pokemon = require("../models/Pokemon");
const Type = require("../models/Type");

const axios = require("axios");

// Get all types
router.get("/", async (req, res, next) => {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/type");

    let typesFromApi = response.data.results.map((item) => {
      return item.name.toUpperCase();
    });

    const typeExist = await Type.findOne({
      where: {
        name: typesFromApi[0],
      },
    });

    //Get all types from DB if are saved

    if (typeExist) {
      return res.status(200).json({
        statusCode: 200,
        data: await Type.findAll({ order: [["name"]] }),
      });
    }

    // Create a type for each item in the array, in the DB
    for (type of typesFromApi) {
      await Type.create({ name: type });
    }

    // Get all types from DB
    res.status(200).json({
      statusCode: 200,
      data: await Type.findAll({ order: [["name"]] }),
    });
  } catch (error) {
    console.log(error.message);
    return next("Error trying to get all types");
  }
});

module.exports = router;
