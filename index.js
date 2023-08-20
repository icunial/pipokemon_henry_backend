const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

// Body-Parse middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
