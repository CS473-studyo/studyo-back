const Router = require('koa-router');

const lectureRouter = new Router();

const lecture = require('./lecture');

lectureRouter.get('/:courseId', lecture.courseLectures);
lectureRouter.post('/pdf/:lectureId', lecture.uploadPdf);
lectureRouter.get('/info/:lectureId', lecture.lectureInfo);

module.exports = lectureRouter;
