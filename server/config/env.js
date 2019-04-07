'use strict';

console.log('NODE_ENV =', process.env.NODE_ENV);

const enviroments = {
  "production": "production",
  "development": "development"
}

const ENV = process.env.NODE_ENV || enviroments.development;

const config = {
  [enviroments.production]: {
    PORT: 80
  },
  [enviroments.development]: {
    PORT: 8080,
    JWT_SECRET: `ultrasecret`
  }
};

const CONFIG = config[ENV];

if(!CONFIG) throw new Error(`Invalid NODE_ENV=${ENV}`);

process.env = {
  ...process.env,
  ...CONFIG
};
