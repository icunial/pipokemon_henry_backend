const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

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

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
