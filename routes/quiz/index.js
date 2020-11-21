const Router = require("koa-router");

const quizRouter = new Router();

const quiz = require("./quiz")

quizRouter.post("/", quiz.ask)
quizRouter.post("/quizList", quiz.quizList)

module.exports = quizRouter; 