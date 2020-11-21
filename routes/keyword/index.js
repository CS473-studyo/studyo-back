const Router = require('koa-router');
const keywordRouter = new Router();
const keyword = require('./keyword');

keywordRouter.get('/:lectureId', keyword.lectureKeywords);
keywordRouter.post('/:lectureId', keyword.submit);
keywordRouter.post('/vote/:keywordId', keyword.vote);

module.exports = keywordRouter;
