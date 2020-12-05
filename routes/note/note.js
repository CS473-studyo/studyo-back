const models = require('@models');
const { checkAndGetUserId } = require('@utils/auth');
const { uploadFile } = require('@utils/aws');

exports.clap = async (ctx) => {
  await checkAndGetUserId(ctx);
  const { NoteId } = ctx.params;
  ctx.assert(NoteId, 400, '400: NoteId not sent');
  await models.Note.increment('clap', { where: { id: NoteId } });

  ctx.status = 204;
};

exports.getClap = async (ctx) => {
  const { NoteId } = ctx.params;
  ctx.assert(NoteId, 400, '400: NoteId not sent');

  const note = await models.Note.findOne({
    where: { id: NoteId },
  });

  ctx.assert(note, 404, '404: Note not found');

  ctx.body = note.clap;
};

exports.lectureNotes = async (ctx) => {
  const { LectureId } = ctx.params;
  ctx.assert(LectureId, 400, '400: LectureId not sent');

  const notes = await models.Note.findAll({
    where: { LectureId },
    include: models.User,
  });

  ctx.body = notes;
};

exports.submit = async (ctx) => {
  const UserId = await checkAndGetUserId(ctx);

  const { LectureId } = ctx.params;
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
    isSelected: false,
  });

  ctx.body = { key, url };
};

exports.select = async (ctx) => {
  const { NoteId } = ctx.params;
  const valid = await checkAndGetUserId(ctx);

  const note = await models.Note.findOne({
    where: { id: NoteId },
    include: {
      model: models.User,
      attributes: ['id'],
    },
  });

  ctx.assert(note, 404, '404: note not found');

  const UserId = note.UserId;

  const user = await models.User.findOne({
    where: { id: UserId },
    include: models.Note,
  });
  ctx.assert(user, 404, '404: user not found');

  user.badge = true;
  user.save();
  // console.log(models.Admin_Note);
  ctx.body = user.badge;
};
