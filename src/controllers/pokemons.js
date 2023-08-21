const axios = require("axios");

// Get All Dogs from API
const getAllApi = async () => {
  const results = [];
  try {
    const apiResults = await axios.get("https://pokeapi.co/api/v2/pokemon");
    if (apiResults) {
      apiResults.data.results.forEach(async (r, index) => {
        results.push({
          id: index + 1,
          name: r.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            index + 1
          }.png`,
        });
      });
      return results;
    }
  } catch (error) {
    throw new Error("Error trying to get all pokemons from API");
  }
};

const getTypes = async (id) => {
  try {
    const pokemonFound = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    );
    if (pokemonFound) {
      return pokemonFound.data.types.map((t) => {
        return t.type.name.toUpperCase();
      });
    }
  } catch (error) {
    throw new Error("Error trying to get pokemon types");
  }
};

module.exports = {
  getAllApi,
};
