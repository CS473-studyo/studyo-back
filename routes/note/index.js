const Router = require('koa-router');

const noteRouter = new Router();

const note = require('./note');

noteRouter.post('/:lectureId', note.submit);
noteRouter.post('/clap/:noteId', note.clap);

module.exports = noteRouter;
