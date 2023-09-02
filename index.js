const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const db = require("./src/db");

const router = require("./src/routes/index");

// Body-Parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Res Headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// Set Router
app.use("/", router);

// Instantiated Models
const Pokemon = require("./src/models/Pokemon");
const Type = require("./src/models/Type");

// Models associations
Pokemon.belongsToMany(Type, { through: "PokemonsTypes" });
Type.belongsToMany(Pokemon, { through: "PokemonsTypes" });

// Error catching endware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  res.status(status).json({
    statusCode: status,
    msg: message,
  });
});

// Initialize Express Server / Database Sync
db.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
  });
});
