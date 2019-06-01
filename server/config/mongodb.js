'use strict';

const mongoose = require('mongoose');

const DOCKER_HOST = process.env.DOCKER_HOST;

const { HOST, PORT, DB } = process.env.MongoDB;

mongoose
  .connect(`mongodb://${DOCKER_HOST || HOST}:${PORT}/${DB}`, { useNewUrlParser: true })
  .then((connection) => {
    console.log(`Mongo ${DB} database running...`);
  })
  .catch(console.log);

module.exports = mongoose;
