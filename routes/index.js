const Router = require('koa-router');

const user = require("./user");
const quiz = require("./quiz");
const lecture = require("./lecture");
const keyword = require("./keyword");
const note = require("./note");
const studygroup = require("./studygroup");
const course = require("./course");
const question = require("./question");
const answer = require('./answer');

const router = new Router();

router.use("/register", user.routes());
router.use("/ask", quiz.routes());
router.use("/lecture", lecture.routes());
router.use("/word", keyword.routes()); 
router.use("/writenote", note.routes());
router.use("/group", studygroup.routes());
router.use("/course", course.routes());
router.use("/question", question.routes());
router.use('/answering', answer.routes());

module.exports = router;