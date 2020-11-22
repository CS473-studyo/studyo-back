const Router = require('koa-router');
const question = new Router();
const questionCtrl = require('./question');

question.post('/post/:lectureId', questionCtrl.post);
question.post('/list', questionCtrl.list);
question.post('/quizList/:lectureId', questionCtrl.quizList);

module.exports = question;
