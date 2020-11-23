const Router = require('koa-router');
const keywordRouter = new Router();
const keyword = require('./keyword');

keywordRouter.get('/:LectureId', keyword.lectureKeywords);
keywordRouter.post('/:LectureId', keyword.submit);
keywordRouter.post('/vote/:KeywordId', keyword.vote);

module.exports = keywordRouter;
