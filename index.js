require('dotenv').config();
require('module-alias/register');
const Koa = require('koa');
const bodyParser = require('koa-body');
const cors = require('@koa/cors');
const logger = require('koa-logger');
const router = require('./routes');
const models = require('@models');
const helmet = require('koa-helmet');
const { jwtMiddleware } = require('./utils/jwt');
// const http = require('http');
// const https = require('https');
// const fs = require('fs');

// const options = {
//   key: fs.readFileSync('key.pem'),
//   cert: fs.readFileSync('cert.pem'),
// };

const PORT = 8080;

const run = async () => {
  const app = new Koa();

  try {
    await models.sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  app.use(cors({ credentials: true, origin: process.env.ORIGIN }));
  app.use(helmet());
  app.use(logger());
  app.use(bodyParser({ multipart: true }));
  app.use(jwtMiddleware);
  app.use(router.routes());
  app.use(router.allowedMethods());

  app.listen(PORT);

  // Listen
  // http.createServer(app.callback()).listen(8080);
  // https.createServer(options, app.callback()).listen(443);
};

run();
