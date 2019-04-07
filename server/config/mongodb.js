'use strict';

const mongoose = require('mongoose');

const env = process.env.NODE_ENV;

const dbName = env === 'development' ? 'devtravel': 'destravel';

mongoose
  .connect(`mongodb://localhost:27017/${dbName}`, { useNewUrlParser: true })
  .then((connection) => {
    console.log(`Mongo ${dbName} database running...`);
  })
  .catch(console.log);

module.exports = mongoose;
