const Joke = require("../models/joke.model.js");

exports.create = (req, res) => {
  if (!req.body.content) {
    return res.status(400).send({
      message: "Joke content can not be empty",
    });
  }

  const joke = new Joke({
    category: req.body.category || "Untitled",
    content: req.body.content,
  });

  joke
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Joke.",
      });
    });
};

exports.findAll = (req, res) => {
  Joke.find()
    .then((jokes) => {
      res.send(jokes);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving jokes.",
      });
    });
};

exports.findOne = (req, res) => {
  Joke.findById(req.params.jokeId)
    .then((joke) => {
      if (!joke) {
        return res.status(404).send({
          message: "Joke not found with id " + req.params.jokeId,
        });
      }
      res.send(joke);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Joke not found with id " + req.params.jokeId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving joke with id " + req.params.jokeId,
      });
    });
};

exports.update = (req, res) => {
  if (!req.body.content) {
    return res.status(400).send({
      message: "Joke content can not be empty",
    });
  }

  Joke.findByIdAndUpdate(
    req.params.jokeId,
    {
      title: req.body.title || "Untitled Joke",
      content: req.body.content,
    },
    { new: true }
  )
    .then((joke) => {
      if (!joke) {
        return res.status(404).send({
          message: "Joke not found with id " + req.params.jokeId,
        });
      }
      res.send(joke);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Joke not found with id " + req.params.jokeId,
        });
      }
      return res.status(500).send({
        message: "Error updating joke with id " + req.params.jokeId,
      });
    });
};

exports.delete = (req, res) => {
  Joke.findByIdAndRemove(req.params.jokeId)
    .then((joke) => {
      if (!joke) {
        return res.status(404).send({
          message: "Joke not found with id " + req.params.jokeId,
        });
      }
      res.send({ message: "Joke deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Joke not found with id " + req.params.jokeId,
        });
      }
      return res.status(500).send({
        message: "Could not delete joke with id " + req.params.jokeId,
      });
    });
};

exports.random = (req, res) => {
  function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  Joke.find()
    .then((jokes) => {
      if (jokes.length > 0) {
        const randomIndex = randomInteger(0, jokes.length - 1);
        res.send(jokes[randomIndex]);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving joke.",
      });
    });
};

exports.category = (req, res) => {
  function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  Joke.find()
    .then((jokes) => {
      if (jokes.length > 0) {
        if (req.query.category) {
          const newArray = jokes.filter((joke) =>
            joke.category?.includes(req.query.category)
          );
          const randomIndex = randomInteger(0, newArray.length - 1);
          res.send(newArray[randomIndex]);
        } else {
          res.status(503).send({
            message:
              err.message || "Some error occurred while retrieving joke.",
          });
        }
      }
    })
    .catch((err) => {
      res.status(502).send({
        message: err.message || "Some error occurred while retrieving joke.",
      });
    });
};

exports.search = (req, res) => {
  Joke.find()
    .then((jokes) => {
      const result = jokes.filter(
        (joke) => joke.content.indexOf(req.params.query) > 0
      );
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving joke.",
      });
    });
};
