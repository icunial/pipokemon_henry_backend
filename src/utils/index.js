const Pokemon = require("../models/Pokemon");
const Type = require("../models/Type");

// Get All Pokemons from DB with all the properties
const getFullAllDb = async () => {
  const results = [];
  try {
    const dbResults = await Pokemon.findAll({
      include: Type,
    });
    dbResults.forEach((r) => {
      results.push({
        id: r.id,
        name: r.name,
        image: r.image,
        height: r.height,
        weight: r.weight,
        life: r.life,
        attack: r.attack,
        defense: r.defense,
        speed: r.speed,
        type: r.types.map((t) => t.name),
      });
    });
    return results;
  } catch (error) {
    throw new Error("Error trying to get all pokemons from DB");
  }
};

module.exports = {
  getFullAllDb,
};
