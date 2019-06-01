'use strict';

console.log('NODE_ENV =', process.env.NODE_ENV);

const environments = {
  "production": "production",
  "development": "development",
  "test": "test"
}

const ENV = process.env.NODE_ENV || environments.development;

const config = {
  [environments.production]: {
    PORT: 80,
    JWT_SECRET: 'ultrasecret',
    MongoDB: {
      HOST: 'localhost',
      PORT: 27017,
      DB: 'devtravel'
    }
  },
  [environments.development]: {
    PORT: 8080,
    JWT_SECRET: `ultrasecret`,
    MongoDB: {
      HOST: 'localhost',
      PORT: 27017,
      DB: 'devtravel_dev'
    }
  },
  [environments.test]: {
    PORT: 5050,
    JWT_SECRET: `ultrasecret`,
    MongoDB: {
        HOST: 'localhost',
        PORT: 27017,
        DB: 'devtravel_test'
    }
  }
};

const CONFIG = config[ENV];

if(!CONFIG) throw new Error(`Invalid NODE_ENV=${ENV}`);

process.env = {
  ...process.env,
  ...CONFIG
};
