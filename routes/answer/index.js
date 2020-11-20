const Router = require("koa-router");

const answerRouter = new Router();

const answer = require("./answer")

answerRouter.post("/", answer.answering)
answerRouter.post("/join/:id", answer.join)
answerRouter.post("/others", answer.others)
answerRouter.post("/myanswer", answer.myanswer)

module.exports = answerRouter;