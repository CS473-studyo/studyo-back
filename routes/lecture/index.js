const Router = require("koa-router");

const lectureRouter = new Router();

const lecture = require("./lecture")

lectureRouter.post("/", lecture.show)

module.exports = lectureRouter;