const Router = require('koa-router');
const question = new Router();
const questionCtrl = require('./question');

question.post('/:lectureId', questionCtrl.submit);
question.get('/user', questionCtrl.userQuestions);
question.get('/:lectureId', questionCtrl.lectureQuestions);
question.get('/id/:questionId', questionCtrl.getQuestion);

module.exports = question;
