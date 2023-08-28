const validateName = (name) => {
  if (!name) return `${prop} parameter is missing!`;
  if (typeof name !== "string") return `Name must be a string!`;

  return false;
};

const validateHeight = (height) => {
  if (!height) return "Height parameter is missing!";
  if (typeof height !== "number") return "Height must be a number!";
  if (height <= 0) return "Height must be higher than 0!";
};

const validateWeight = (weight) => {
  if (!weight) return "Weight parameter is missing!";
  if (typeof weight !== "number") return "Weight must be a number!";
  if (weight <= 0) return "Weight must be higher than 0!";
};

const validateLife = (life) => {
  if (!life) return "Life parameter is missing!";
  if (typeof life !== "number") return "Life must be a number!";
  if (life <= 0) return "Life must be higher than 0!";
};

const validateAttack = (attack) => {
  if (!attack) return "Attack parameter is missing!";
  if (typeof attack !== "number") return "Attack must be a number!";
  if (attack <= 0) return "Attack must be higher than 0!";
};

const validateDefense = (defense) => {
  if (!defense) return "Defense parameter is missing!";
  if (typeof defense !== "number") return "Defense must be a number!";
  if (defense <= 0) return "Defense must be higher than 0!";
};

const validateSpeed = (speed) => {
  if (!speed) return "Speed parameter is missing!";
  if (typeof speed !== "number") return "Speed must be a number!";
  if (speed <= 0) return "Speed must be higher than 0!";
};

module.exports = {
  validateName,
  validateHeight,
  validateWeight,
  validateLife,
  validateAttack,
  validateDefense,
  validateSpeed,
};
