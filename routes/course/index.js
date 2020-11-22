const Router = require('koa-router');

const courseRouter = new Router();
const course = require('./course');

courseRouter.get('/', course.userCourses);
courseRouter.get('/:courseId', course.courseInfo);
courseRouter.get('/lectures/:code', course.courseLectures);
courseRouter.post('/join/:courseId', course.join);

module.exports = courseRouter;
