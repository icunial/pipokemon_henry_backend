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

// Get Pokemons by their type from API
const findByTypeApi = async (type) => {
  let results = [];
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
    results = results.filter((r) => {
      return r.types.includes(type.toUpperCase());
    });
    return results;
  } catch (error) {
    console.log(error.message);
    throw new Error("Error trying to get all pokemons by their type from API");
  }
};

// Get Pokemons ordered by their height from more to less
const orderPokemonsMoreHeight = async () => {
  const results = [];
  try {
    const apiResults = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20"
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
      result.height = pokemonFound.data.height;
      result.weight = pokemonFound.data.weight;
      result.life = pokemonFound.data.stats[0].base_stat;
      result.attack = pokemonFound.data.stats[1].base_stat;
      result.defense = pokemonFound.data.stats[2].base_stat;
      result.speed = pokemonFound.data.stats[5].base_stat;
    }

    return results.sort((a, b) => {
      if (a.height < b.height) return 1;
      if (a.height > b.height) return -1;
      return 0;
    });
  } catch (error) {
    throw new Error("Error trying to order pokemons from More Height to Less");
  }
};

// Get Pokemons ordered by their height from less to more
const orderPokemonsLessHeight = async () => {
  const results = [];
  try {
    const apiResults = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20"
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
      result.height = pokemonFound.data.height;
      result.weight = pokemonFound.data.weight;
      result.life = pokemonFound.data.stats[0].base_stat;
      result.attack = pokemonFound.data.stats[1].base_stat;
      result.defense = pokemonFound.data.stats[2].base_stat;
      result.speed = pokemonFound.data.stats[5].base_stat;
    }

    return results.sort((a, b) => {
      if (a.height > b.height) return 1;
      if (a.height < b.height) return -1;
      return 0;
    });
  } catch (error) {
    throw new Error("Error trying to order pokemons from More Height to Less");
  }
};

// Get Pokemons ordered by their weight from more to less
const orderPokemonsMoreWeight = async () => {
  const results = [];
  try {
    const apiResults = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20"
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
      result.height = pokemonFound.data.height;
      result.weight = pokemonFound.data.weight;
      result.life = pokemonFound.data.stats[0].base_stat;
      result.attack = pokemonFound.data.stats[1].base_stat;
      result.defense = pokemonFound.data.stats[2].base_stat;
      result.speed = pokemonFound.data.stats[5].base_stat;
    }

    return results.sort((a, b) => {
      if (a.weight < b.weight) return 1;
      if (a.weight > b.weight) return -1;
      return 0;
    });
  } catch (error) {
    throw new Error("Error trying to order pokemons from More Weight to Less");
  }
};

// Get Pokemons ordered by their weight from less to more
const orderPokemonsLessWeight = async () => {
  const results = [];
  try {
    const apiResults = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20"
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
      result.height = pokemonFound.data.height;
      result.weight = pokemonFound.data.weight;
      result.life = pokemonFound.data.stats[0].base_stat;
      result.attack = pokemonFound.data.stats[1].base_stat;
      result.defense = pokemonFound.data.stats[2].base_stat;
      result.speed = pokemonFound.data.stats[5].base_stat;
    }

    return results.sort((a, b) => {
      if (a.weight > b.weight) return 1;
      if (a.weight < b.weight) return -1;
      return 0;
    });
  } catch (error) {
    throw new Error("Error trying to order pokemons from More Weight to Less");
  }
};

// Get Pokemons ordered by their life from more to less
const orderPokemonsMoreLife = async () => {
  const results = [];
  try {
    const apiResults = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20"
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
      result.height = pokemonFound.data.height;
      result.weight = pokemonFound.data.weight;
      result.life = pokemonFound.data.stats[0].base_stat;
      result.attack = pokemonFound.data.stats[1].base_stat;
      result.defense = pokemonFound.data.stats[2].base_stat;
      result.speed = pokemonFound.data.stats[5].base_stat;
    }

    return results.sort((a, b) => {
      if (a.life < b.life) return 1;
      if (a.life > b.life) return -1;
      return 0;
    });
  } catch (error) {
    throw new Error("Error trying to order pokemons from More Life to Less");
  }
};

// Get Pokemons ordered by their life from less to more
const orderPokemonsLessLife = async () => {
  const results = [];
  try {
    const apiResults = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20"
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
      result.height = pokemonFound.data.height;
      result.weight = pokemonFound.data.weight;
      result.life = pokemonFound.data.stats[0].base_stat;
      result.attack = pokemonFound.data.stats[1].base_stat;
      result.defense = pokemonFound.data.stats[2].base_stat;
      result.speed = pokemonFound.data.stats[5].base_stat;
    }

    return results.sort((a, b) => {
      if (a.life > b.life) return 1;
      if (a.life < b.life) return -1;
      return 0;
    });
  } catch (error) {
    throw new Error("Error trying to order pokemons from More Life to Less");
  }
};

module.exports = {
  getAllApi,
  findPokemonByIdApi,
  findByNameApi,
  findByTypeApi,
  orderPokemonsMoreHeight,
  orderPokemonsLessHeight,
  orderPokemonsMoreWeight,
  orderPokemonsLessWeight,
  orderPokemonsMoreLife,
  orderPokemonsLessLife,
};
