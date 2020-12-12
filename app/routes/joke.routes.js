module.exports = (app) => {
  const jokes = require("../controllers/joke.controller.js");
  app.get("/jokes/category", jokes.category);
  app.get("/jokes/random/", jokes.random);

  app.post("/jokes", jokes.create);
  app.get("/jokes", jokes.findAll);
  app.get("/jokes/search/:query", jokes.search);
};
