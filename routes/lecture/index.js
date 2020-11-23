const Router = require('koa-router');

const lectureRouter = new Router();

const lecture = require('./lecture');

lectureRouter.post('/pdf/:LectureId', lecture.uploadPdf);
lectureRouter.get('/:LectureId', lecture.lectureInfo);

module.exports = lectureRouter;
