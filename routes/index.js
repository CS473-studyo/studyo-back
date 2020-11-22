const Router = require('koa-router');

const user = require('./user');
const lecture = require('./lecture');
const keyword = require('./keyword');
const note = require('./note');
const studygroup = require('./studygroup');
const course = require('./course');
const question = require('./question');
const answer = require('./answer');

const router = new Router();

router.use('/user', user.routes());
router.use('/lecture', lecture.routes());
router.use('/keyword', keyword.routes());
router.use('/note', note.routes());
router.use('/group', studygroup.routes());
router.use('/course', course.routes());
router.use('/answer', answer.routes());
router.use('/question', question.routes());

module.exports = router;
