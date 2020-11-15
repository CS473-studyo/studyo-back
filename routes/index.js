const Router = require("koa-router");

const user = require("./user");
const course = require("./course");

const router = new Router();

router.use("/register", user.routes());

router.use("/course", course.routes());

module.exports = router;