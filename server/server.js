const express = require("express");
const app = express();
const PORT = 8080;
require("./src/config/db");
const path = require("path");

app.use(express.json());

const CLIENT_BUILD_PATH = path.join(__dirname, "../client/build");

// Static files
app.use(express.static(CLIENT_BUILD_PATH));

// Server React Client
app.get("/", (req, res) => {
  res.sendFile(path.join(CLIENT_BUILD_PATH, "index.html"));
});

app.use("/posts", require("./src/routes/posts.route"));

app.listen(PORT, () => {
  console.log(`API Server is running on port => ${PORT}`);
});
