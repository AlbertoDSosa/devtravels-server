'use strict';

require('./config')
const express = require('express');
const server = express();
const cors = require('cors');

const PORT = process.env.PORT || 3030;

server.use(cors({
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: 'Authorization'
}));

server.use(express.json());
server.use((err, req, res, next) => {
  if (err) {
    err['SyntaxError'] = undefined;
    res.json(err);
  } else {
    next();
  }
});

server.use(require('./routes'));

if(process.env.NODE_ENV !== 'test') {
  server.listen(PORT, () => {
      console.log(`Server listening at http://localhost:${PORT}/`);
  });
}

module.exports = server;
