const Router = require('koa-router');

const lectureRouter = new Router();

const lecture = require('./lecture');

lectureRouter.get('/:CourseId', lecture.courseLectures);
lectureRouter.post('/pdf/:LectureId', lecture.uploadPdf);
lectureRouter.get('/info/:LectureId', lecture.lectureInfo);

module.exports = lectureRouter;
