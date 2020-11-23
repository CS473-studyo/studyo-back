const models = require('@models');
const { checkAndGetUserId } = require('@utils/auth');
const { uploadFile } = require('@utils/aws');

exports.submit = async (ctx) => {
  const UserId = await checkAndGetUserId(ctx);

  const LectureId = ctx.params.lectureId;
  ctx.assert(LectureId, 400, '400: LectureId not sent');
  const lecture = await models.Lecture.findOne({
    where: { id: LectureId },
  });

  ctx.assert(lecture, 404, '404: Lecture not found');

  const fileName = `${UserId}--${LectureId}.pdf`;

  const { file } = ctx.request.files;
  ctx.assert(file, 400, '400: file not sent');

  const { key, url } = await uploadFile({
    fileName,
    filePath: file.path,
    fileType: file.type,
  });

  const note = await models.Note.findOne({
    where: {
      UserId,
      LectureId,
    },
  });

  if (note) {
    note.pdf = url;
    await note.save();
    ctx.body = { key, url };
    return;
  }

  await models.Note.create({
    UserId,
    LectureId,
    pdf: url,
    clap: 0,
  });

  ctx.body = { key, url };
};

exports.clap = async (ctx) => {
  await checkAndGetUserId(ctx);
  const NoteId = ctx.params.noteId;
  ctx.assert(NoteId, 400, '400: NoteId not sent');
  await models.Note.increment('clap', { where: { id: NoteId } });

  ctx.status = 204;
};

exports.getClap = async (ctx) => {
  const noteId = ctx.params.noteId;

  const note = await models.Note.findOne({
    where: { id: noteId },
  });
  console.log(note.clap);
  ctx.body = answer.clap;
};
