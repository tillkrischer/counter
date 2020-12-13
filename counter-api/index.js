const express = require("express");
const app = express();
const port = 3000;

let counter = {};

app.get("/", (req, res) => {
  const name = req.query.name || "default";
  counter[name] = counter[name] || 0;
  res.send(`${counter[name]}`);
});

app.get("/all", (req, res) => {
  res.send(JSON.stringify(counter));
});

app.get("/inc", (req, res) => {
  const name = req.query.name || "default";
  counter[name] = counter[name] + 1 || 1;
  res.send(`${counter[name]}`);
});

app.get("/dec", (req, res) => {
  const name = req.query.name || "default";
  counter[name] = Math.max((counter[name] || 0) - 1, 0);
  res.send(`${counter[name]}`);
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
