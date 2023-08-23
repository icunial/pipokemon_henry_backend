const axios = require("axios");

// Get All Dogs from API
const getAllApi = async () => {
  const results = [];
  try {
    const apiResults = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=200"
    );
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

// Get Pokemon by its ID from API
const findPokemonByIdApi = async (id) => {
  const result = [];

  try {
    const apiResults = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    );
    if (apiResults) {
      result.push({
        id: apiResults.data.id,
        name: apiResults.data.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        types: apiResults.data.types.map((t) => t.type.name.toUpperCase()),
        height: apiResults.data.height,
        weight: apiResults.data.weight,
        life: apiResults.data.stats[0].base_stat,
        attack: apiResults.data.stats[1].base_stat,
        defense: apiResults.data.stats[2].base_stat,
        speed: apiResults.data.stats[5].base_stat,
      });
    }
    return result;
  } catch (error) {
    if (error.response.status === 404) return result;
    throw new Error("Error trying to get a pokemon by its id");
  }
};

// Get Pokemon by its NAME from API
const findByNameApi = async (name) => {
  const result = [];

  try {
    const apiResults = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    if (apiResults) {
      result.push({
        id: apiResults.data.id,
        name: apiResults.data.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${apiResults.data.id}.png`,
        types: apiResults.data.types.map((t) => t.type.name.toUpperCase()),
        height: apiResults.data.height,
        weight: apiResults.data.weight,
        life: apiResults.data.stats[0].base_stat,
        attack: apiResults.data.stats[1].base_stat,
        defense: apiResults.data.stats[2].base_stat,
        speed: apiResults.data.stats[5].base_stat,
      });
    }
    return result;
  } catch (error) {
    if (error.response.status === 404) return result;
    throw new Error("Error trying to get a dog by its name from API");
  }
};

module.exports = {
  getAllApi,
  findPokemonByIdApi,
  findByNameApi,
};
