const Router = require("koa-router");

const answerRouter = new Router();

const answer = require("./answer")

answerRouter.post("/", answer.answering)

module.exports = answerRouter;