require("dotenv").config();
const Koa = require("koa");
const bodyParser = require("koa-body");
const cors = require("@koa/cors");
const logger = require("koa-logger");
const router = require("./routes");
const models = require("./database/models/index.js");
const helmet = require("koa-helmet");
// const { jwtMiddleware } = require("./src/utils");

const run = async () => {
  const app = new Koa();

  try {
    await models.sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  app.use(cors({ credentials: true, origin: process.env.ORIGIN }));
  app.use(helmet());
  app.use(logger());
  app.use(bodyParser());
  // app.use(jwtMiddleware);
  app.use(router.routes()).use(router.allowedMethods());

  const PORT = 8080;

  app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
  });
}

run()