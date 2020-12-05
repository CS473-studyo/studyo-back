const Router = require('koa-router');

const noteRouter = new Router();

const note = require('./note');

noteRouter.post('/clap', note.clap);
noteRouter.get('/clap/:LectureId/:UserId/:page', note.getClap);
noteRouter.post('/:LectureId', note.submit);
noteRouter.post('/text/:LectureId', note.comment);
noteRouter.get('/user/:LectureId/:page', note.userLectureNotes);
noteRouter.get('/other/:LectureId/:page', note.otherLectureNotes);
noteRouter.post('/delete/:LectureId/:UserId', note.deleteNotes);

module.exports = noteRouter;
