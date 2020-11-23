const Router = require('koa-router');

const answerRouter = new Router();

const answer = require('./answer');

answerRouter.post('/:questionId', answer.submit);
answerRouter.get('/:questionId', answer.answers);
answerRouter.get('/user/:questionId', answer.userAnswer);
answerRouter.post('/clap/:answerId', answer.clap);
answerRouter.get('/getclap/:answerId', answer.getClap);

module.exports = answerRouter;
