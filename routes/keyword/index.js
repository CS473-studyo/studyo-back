const Router = require('koa-router');
const keywordRouter = new Router();
const keyword = require('./keyword');

keywordRouter.get('/:LectureId', keyword.lectureKeywords);
keywordRouter.post('/:LectureId', keyword.submit);
keywordRouter.post('/vote/:KeywordId', keyword.vote);
keywordRouter.post('/cancel/:KeywordId', keyword.cancel);
keywordRouter.get('/user/:LectureId', keyword.userKeywords);
keywordRouter.delete('/', keyword.deleteVotes);

module.exports = keywordRouter;
