const models = require('@models');
const { checkAndGetUserId } = require('@utils/auth');

exports.submit = async (ctx) => {
  const UserId = await checkAndGetUserId(ctx);

  const LectureId = ctx.params.lectureId;
  ctx.assert(LectureId, 400, '400: LectureId not sent');

  const { page, image } = ctx.request.body;
  const note = await models.Note.create({
    LectureId,
    UserId,
    page,
    image,
    clap: 0,
  });
  ctx.assert(note, 500);
  ctx.status = 204;
};

exports.clap = async (ctx) => {
  await checkAndGetUserId(ctx);
  const NoteId = ctx.params.noteId;
  ctx.assert(NoteId, 400, '400: NoteId not sent');
  await models.Note.increment('clap', { where: { id: NoteId } });

  ctx.status = 204;
};
