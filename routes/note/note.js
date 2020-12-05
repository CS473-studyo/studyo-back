const models = require('@models');
const { Op } = require('sequelize');
const { checkAndGetUserId } = require('@utils/auth');
const { uploadFile } = require('@utils/aws');

exports.clap = async (ctx) => {
  await checkAndGetUserId(ctx);
  const { UserId, LectureId, page } = ctx.request.body;
  ctx.assert(LectureId, 400, '400: LectureId not sent');

  const note = await models.Note.findOne({
    where: {
      UserId,
      LectureId,
      page,
    },
  });

  if (note) {
    note.clap += 1;
    await note.save();
    ctx.status = 204;
    return;
  }

  await models.Note.create({
    UserId,
    LectureId,
    page,
    clap: 1,
  });

  ctx.status = 204;
};

exports.getClap = async (ctx) => {
  const { UserId, LectureId, page } = ctx.params;
  ctx.assert(LectureId, 400, '400: LectureId not sent');

  const note = await models.Note.findOne({
    where: { UserId, LectureId, page },
  });

  ctx.body = note ? note.clap : 0;
};

exports.userLectureNotes = async (ctx) => {
  const UserId = await checkAndGetUserId(ctx);
  const { LectureId, page } = ctx.params;
  ctx.assert(LectureId, 400, '400: LectureId not sent');

  const notes = await models.Note.findAll({
    where: { LectureId, page: { [Op.or]: [-1, page] }, UserId },
    include: models.User,
  });

  ctx.body = notes;
};

exports.otherLectureNotes = async (ctx) => {
  const UserId = await checkAndGetUserId(ctx);
  const { LectureId, page } = ctx.params;
  ctx.assert(LectureId, 400, '400: LectureId not sent');

  const notes = await models.Note.findAll({
    where: { LectureId, page: { [Op.or]: [-1, page] }, [Op.not]: { UserId } },
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

  const user = await models.User.findOne({
    where: { id: UserId },
  });
  ctx.assert(user, 404, '404: User not found');

  user.badge = user.badge + 1;
  await user.save();

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
      page: -1,
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
    page: -1,
    clap: 0,
    isSelected: false,
  });

  ctx.body = { key, url };
};

exports.comment = async (ctx) => {
  const UserId = await checkAndGetUserId(ctx);
  const { LectureId } = ctx.params;
  const { page, text } = ctx.request.body;
  ctx.assert(LectureId, 400, '400: NoteId not sent');

  const note = await models.Note.findOne({
    where: {
      UserId,
      LectureId,
      page,
    },
  });

  if (note) {
    note.text = text;
    await note.save();
    ctx.status = 204;
    return;
  }

  await models.Note.create({
    UserId,
    LectureId,
    page,
    text,
    clap: 0,
  });

  ctx.status = 204;
};

exports.deleteNotes = async (ctx) => {
  const loginuser = await checkAndGetUserId(ctx);
  const { UserId, LectureId } = ctx.params;

  if (loginuser != UserId) {
    ctx.body = false;
    return;
  }

  const note = await models.Note.findOne({
    where: { UserId, LectureId },
  });

  ctx.assert(note, 404, '404: note not found');

  await models.Note.destroy({ where: { UserId, LectureId } });
  ctx.status = 204;
};
