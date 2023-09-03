const axios = require("axios");
const Pokemon = require("../models/Pokemon");
const Type = require("../models/Type");
const { Op } = require("sequelize");
const utils = require("../utils/index");

const pokemonApi_url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1008";

// Get All Pokemons from API
const getAllApi = async () => {
  const results = [];
  try {
    const apiResults = await axios.get(pokemonApi_url);
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

    return results;
  } catch (error) {
    throw new Error("Error trying to get all pokemons from API");
  }
};

// Get All Pokemons from DB
const getAllDb = async () => {
  const results = [];
  try {
    const dbResults = await Pokemon.findAll({
      attributes: ["id", "name", "image"],
      include: Type,
    });
    dbResults.forEach((r) => {
      results.push({
        id: r.id,
        name: r.name,
        image: r.image,
        type: r.types.map((t) => t.name),
      });
    });
    return results;
  } catch (error) {
    throw new Error("Error trying to get all pokemons from DB");
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

// Get Pokemons by its ID from DB
const findPokemonByIdDb = async (id) => {
  try {
    const dbResult = await Pokemon.findByPk(id, {
      include: Type,
    });
    const result = [
      {
        id: dbResult.id,
        name: dbResult.name,
        image: dbResult.image,
        height: dbResult.height,
        weight: dbResult.weight,
        life: dbResult.life,
        attack: dbResult.attack,
        defense: dbResult.defense,
        speed: dbResult.speed,
        type: dbResult.types.map((t) => t.name),
      },
    ];
    return result;
  } catch (error) {
    throw new Error("Error trying to get a pokemon by its ID from DB");
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

// Get Pokemon by its NAME from DB
const findByNameDb = async (name) => {
  const results = [];
  try {
    const dbResults = await Pokemon.findAll({
      attributes: ["id", "name", "image"],
      include: Type,
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });
    dbResults.forEach((r) => {
      results.push({
        id: r.id,
        name: r.name,
        image: r.image,
        type: r.types.map((t) => t.name),
      });
    });
    return results;
  } catch (error) {
    throw new Error("Error trying to get a pokemon ");
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

// Get Pokemons by their type from DB
const findByTypeDb = async (type) => {
  const results = [];
  try {
    const dbResults = await Pokemon.findAll({
      attributes: ["id", "name", "image"],
      include: Type,
    });
    dbResults.forEach((r) => {
      results.push({
        id: r.id,
        name: r.name,
        image: r.image,
        type: r.types.map((t) => t.name),
      });
    });
    results = results.filter((r) => {
      return r.types.includes(type);
    });

    return results;
  } catch (error) {
    throw new Error("Error trying to get pokemons by their type from DB");
  }
};

// Get Pokemons ordered by their height from more to less
const orderPokemonsMoreHeight = async () => {
  let results = [];
  try {
    const dbResults = await utils.getFullAllDb();
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
    results = [...dbResults, ...results];
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
  let results = [];
  try {
    const dbResults = await utils.getFullAllDb();
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
    results = [...dbResults, ...results];
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
  let results = [];
  try {
    const dbResults = await utils.getFullAllDb();
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
    results = [...dbResults, results];
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
  let results = [];
  try {
    const dbResults = await utils.getFullAllDb();
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
    results = [...dbResults, ...results];
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
  let results = [];
  try {
    const dbResults = await utils.getFullAllDb();
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
    results = [...dbResults, results];
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
  let results = [];
  try {
    const dbResults = await utils.getFullAllDb();
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
    results = [...dbResults, ...results];
    return results.sort((a, b) => {
      if (a.life > b.life) return 1;
      if (a.life < b.life) return -1;
      return 0;
    });
  } catch (error) {
    throw new Error("Error trying to order pokemons from More Life to Less");
  }
};

// Get Pokemons ordered by their attack from more to less
const orderPokemonsMoreAttack = async () => {
  let results = [];
  try {
    const dbResults = await utils.getFullAllDb();
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

    results = [...dbResults, ...results];
    return results.sort((a, b) => {
      if (a.attack < b.attack) return 1;
      if (a.attack > b.attack) return -1;
      return 0;
    });
  } catch (error) {
    throw new Error("Error trying to order pokemons from More Attack to Less");
  }
};

// Get Pokemons ordered by their attack from less to more
const orderPokemonsLessAttack = async () => {
  let results = [];
  try {
    const dbResults = await utils.getFullAllDb();
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

    results = [...dbResults, ...results];
    return results.sort((a, b) => {
      if (a.attack > b.attack) return 1;
      if (a.attack < b.attack) return -1;
      return 0;
    });
  } catch (error) {
    throw new Error("Error trying to order pokemons from More Attack to Less");
  }
};

// Delete a pokemon from DB by its ID
const deletePokemonFromDbById = async (id) => {
  let result = [];
  try {
    result = await findPokemonByIdDb(id);
    if (result.length === 1) {
      const pokemonDeleted = await Pokemon.destroy({
        where: { id },
      });
      if (pokemonDeleted) {
        return result;
      }
    }
    return result;
  } catch (error) {
    throw new Error("Error deleting a pokemon by its ID from DB");
  }
};

// Update a pokemon from DB
const updatePokemonFromDb = async (id, data) => {
  try {
    const pokemonUpdated = await Pokemon.update(
      {
        ...data,
      },
      {
        where: {
          id,
        },
      }
    );

    if (pokemonUpdated) {
      const pokemonFound = await findPokemonByIdDb(id);
      return pokemonFound;
    } else {
      return [];
    }
  } catch (error) {
    throw new Error("Error updating a pokemon!");
  }
};

// Get pokemons pagination
const getPokemonsPagination = async (pokemons, page) => {
  let results = pokemons.slice(page * 12 - 12, page * 12);

  for (result of results) {
    if (typeof result.id === "number") {
      try {
        const pokemonFound = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${result.id}`
        );
        result.types = pokemonFound.data.types.map((t) =>
          t.type.name.toUpperCase()
        );
      } catch (error) {
        throw new Error("Error trying to get pokemons results paginated");
      }
    }
  }

  return results;
};

module.exports = {
  getAllApi,
  getAllDb,
  findPokemonByIdApi,
  findPokemonByIdDb,
  findByNameApi,
  findByNameDb,
  findByTypeApi,
  findByTypeDb,
  orderPokemonsMoreHeight,
  orderPokemonsLessHeight,
  orderPokemonsMoreWeight,
  orderPokemonsLessWeight,
  orderPokemonsMoreLife,
  orderPokemonsLessLife,
  orderPokemonsMoreAttack,
  orderPokemonsLessAttack,
  deletePokemonFromDbById,
  updatePokemonFromDb,
  getPokemonsPagination,
};
