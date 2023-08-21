const axios = require("axios");

// Get All Dogs from API
const getAllApi = async () => {
  const results = [];
  try {
    const apiResults = await axios.get("https://pokeapi.co/api/v2/pokemon");
    if (apiResults) {
      apiResults.data.results.forEach((r, index) => {
        results.push({
          id: index + 1,
          name: r.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            index + 1
          }.png`,
        });
      });
    }
    for (result of results) {
      const pokemonFound = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${result.id}`
      );
      result.types = pokemonFound.data.types.map((t) =>
        t.type.name.toUpperCase()
      );
    }
    return results;
  } catch (error) {
    throw new Error("Error trying to get all pokemons from API");
  }
};

module.exports = {
  getAllApi,
};
