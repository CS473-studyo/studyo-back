const Router = require('koa-router');

const noteRouter = new Router();

const note = require('./note');

noteRouter.post('/clap/:NoteId', note.clap);
noteRouter.get('/getclap/:NoteId', note.getClap);
noteRouter.post('/:LectureId', note.submit);
noteRouter.get('/:LectureId', note.lectureNotes);

module.exports = noteRouter;
