const Router = require('koa-router');
const keywordRouter = new Router();
const keyword = require('./keyword');

keywordRouter.get('/dropVote', keyword.dropVote);
keywordRouter.get('/:LectureId', keyword.lectureKeywords);
keywordRouter.post('/:LectureId', keyword.submit);
keywordRouter.post('/vote/:KeywordId', keyword.vote);
keywordRouter.get('/user/:LectureId', keyword.userKeywords);

module.exports = keywordRouter;
