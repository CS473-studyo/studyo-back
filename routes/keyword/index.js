const Router = require('koa-router');
const keywordRouter = new Router();
const keyword = require('./keyword');

keywordRouter.get('/dropVote', keyword.dropVote);
keywordRouter.get('/:lectureId', keyword.lectureKeywords);
keywordRouter.post('/:lectureId', keyword.submit);
keywordRouter.post('/vote/:keywordId', keyword.vote);
keywordRouter.get('/user/:lectureId', keyword.userKeywords);

module.exports = keywordRouter;
