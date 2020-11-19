const Router = require("koa-router");

const answerRouter = new Router();

const answer = require("./answer")

answerRouter.post("/", answer.answering)
answerRouter.post("/list", answer.answerlist)
answerRouter.post("/clap", answer.clap)

module.exports = answerRouter;