const Router = require('koa-router');

const answerRouter = new Router();

const answer = require('./answer');

answerRouter.post('/:questionId', answer.submit);
answerRouter.get('/:questionId', answer.answers);
answerRouter.get('/user/:questionId', answer.userAnswer);
answerRouter.post('/clap/:answerId', answer.clap);
answerRouter.get('/clap/:answerId', answer.getClap);
answerRouter.post('/select/:answerId', answer.select);
answerRouter.post('/delete/:AnswerId/:UserId', answer.deleteAnswer);

module.exports = answerRouter;
