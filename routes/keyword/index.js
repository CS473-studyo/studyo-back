const Router = require("koa-router");
const keywordRouter = new Router();
const keyword = require("./keyword")

keywordRouter.post("/", keyword.word)
keywordRouter.post("/list", keyword.list)

module.exports = keywordRouter;