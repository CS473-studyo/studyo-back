const Router = require('koa-router');
const course = new Router();
const courseCtrl = require('./course.ctrl');

course.post('/join/:id', courseCtrl.join);

module.exports = course;
