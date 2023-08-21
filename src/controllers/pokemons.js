const axios = require("axios");

// Get All Dogs from API
const getAllApi = async () => {
  try {
    const apiResults = await axios.get("https://pokeapi.co/api/v2/pokemon");
    return apiResults;
  } catch (error) {
    throw new Error("Error trying to get all pokemons from API");
  }
};

module.exports = {
  getAllApi,
};
