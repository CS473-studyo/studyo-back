const Router = require("koa-router");

const user = require("./user");
const quiz = require("./quiz");

const router = new Router();

router.use("/register", user.routes());
router.use("/ask", quiz.routes());

module.exports = router;