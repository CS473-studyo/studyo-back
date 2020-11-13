const Router = require("koa-router");

const keywordRouter = new Router();

const keyword = require("./keyword")

keywordRouter.post("/", keyword.word)

module.exports = keywordRouter;