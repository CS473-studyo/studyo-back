const Router = require('koa-router');

const noteRouter = new Router();

const note = require('./note');

noteRouter.post('/clap', note.clap);
noteRouter.get('/clap/:LectureId/:UserId/:page', note.getClap);
noteRouter.post('/:LectureId', note.submit);
// noteRouter.get('/:LectureId', note.lectureNotes);
noteRouter.post('/select/:NoteId', note.select);
noteRouter.post('/text/:LectureId', note.comment);
noteRouter.get('/user/:LectureId/:page', note.userLectureNotes);
noteRouter.get('/other/:LectureId/:page', note.otherLectureNotes);

module.exports = noteRouter;
