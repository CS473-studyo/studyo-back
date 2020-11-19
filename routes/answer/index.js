const Router = require("koa-router");

const answerRouter = new Router();

const answer = require("./answer")

answerRouter.post("/", answer.answering)
answerRouter.post("/others", answer.others)

module.exports = answerRouter;