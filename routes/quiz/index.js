const Router = require("koa-router");

const quizRouter = new Router();

const quiz = require("./quiz")

quizRouter.post("/", quiz.ask)

module.exports = quizRouter;