const Router = require("koa-router");

const studygroupRouter = new Router();

const studygroup = require("./studygroup")

studygroupRouter.post("/", studygroup.group)

module.exports = studygroupRouter;