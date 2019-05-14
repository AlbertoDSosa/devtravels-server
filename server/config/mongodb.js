'use strict';

const mongoose = require('mongoose');

const { HOST, PORT, DB } = process.env.MongoDB;

mongoose
  .connect(`mongodb://${HOST}:${PORT}/${DB}`, { useNewUrlParser: true })
  .then((connection) => {
    console.log(`Mongo ${DB} database running...`);
  })
  .catch(console.log);

module.exports = mongoose;
