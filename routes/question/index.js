const Router = require('koa-router');
const question = new Router();
const questionCtrl = require('./question');

question.post('/:LectureId', questionCtrl.submit);
question.get('/user', questionCtrl.userQuestions);
question.get('/:LectureId', questionCtrl.lectureQuestions);
question.get('/id/:QuestionId', questionCtrl.getQuestion);

module.exports = question;
