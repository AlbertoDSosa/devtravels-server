'use strict';

const mongoose = require('mongoose');

const env = process.env.NODE_ENV;

const dbName = env === 'development' ? 'devtravel': 'destravel';

mongoose.connect(`mongodb://localhost:27017/${dbName}`, { useNewUrlParser: true }, (err) => {
  if (err) console.log(err);
  console.log(`Mongo database ${dbName} running...`);
});

module.exports = mongoose;
