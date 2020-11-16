const Router = require("koa-router");

const lectureRouter = new Router();

const lecture = require("./lecture")

lectureRouter.post("/show/:course", lecture.show)

module.exports = lectureRouter;