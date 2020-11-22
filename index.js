require('dotenv').config();
require('module-alias/register');
const Koa = require('koa');
const helmet = require('koa-helmet');
const bodyParser = require('koa-body');
const cors = require('@koa/cors');
const logger = require('koa-logger');
const models = require('@models');
const router = require('./routes');
const { jwtMiddleware } = require('./utils/jwt');

const PORT = 8080;

const run = async () => {
  const app = new Koa();

  try {
    await models.sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
  app.use(helmet());
  app.use(logger());
  app.use(bodyParser({ multipart: true }));
  app.use(jwtMiddleware);
  app.use(router.routes());
  app.use(router.allowedMethods());

  app.listen(PORT);
};

run();
