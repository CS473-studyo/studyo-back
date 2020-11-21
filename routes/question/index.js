const Router = require('koa-router');
const question = new Router();
const questionCtrl = require('./question.ctrl');

question.post('/post', questionCtrl.post);
question.post('/list', questionCtrl.list);
question.post("/quizList", questionCtrl.quizList)

module.exports = question;
