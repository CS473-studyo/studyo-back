const models = require('@models');
const { checkAndGetUserId } = require('@utils/auth');

exports.writenote = async (ctx) => {
  console.log('received');
  const { id, LectureId, UserId, page, image, clap } = ctx.request.body;
  const new_note = await models.Note.create({
    id, LectureId, UserId, page, image, clap
  });
  ctx.assert(new_note, 500);
  ctx.status = 204;
};

exports.clap = async (ctx) => {
  await checkAndGetUserId(ctx);
  const NoteId = ctx.params.noteId;
  ctx.assert(NoteId, 400, '400: Note ID not sent');
  await models.Note.increment('clap', { where: { id: NoteId } });
  
  ctx.status = 204;
};