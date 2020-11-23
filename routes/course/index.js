const Router = require('koa-router');

const courseRouter = new Router();
const course = require('./course');

courseRouter.get('/', course.userCourses);
courseRouter.get('/:code', course.courseInfo);
courseRouter.get('/lectures/:code', course.courseLectures);
courseRouter.post('/join/:CourseId', course.join);

module.exports = courseRouter;
