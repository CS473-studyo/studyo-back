const Router = require('koa-router');

const lectureRouter = new Router();

const lecture = require('./lecture');

lectureRouter.get('/:courseId', lecture.courseLectures);
lectureRouter.post('/pdf/:lectureId', lecture.uploadPdf);

module.exports = lectureRouter;
