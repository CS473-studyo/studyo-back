const Router = require('koa-router');
const course = new Router();
const courseCtrl = require('./course.ctrl');

course.post('/join/:id', courseCtrl.join);
course.post('/list', courseCtrl.list);
course.get('/info/:courseid', courseCtrl.info);
course.get('/studentno/:courseid', courseCtrl.studentno);

module.exports = course;
