const models = require('@models');
const { checkAndGetUserId } = require('@utils/auth');

const getLectureId = (ctx) => {
  const { LectureId } = ctx.params;
  ctx.assert(LectureId, 400, '400: LectureId not sent');
  return LectureId;
};

exports.lectureKeywords = async (ctx) => {
  const LectureId = getLectureId(ctx);
  ctx.assert(LectureId, 400, '400: LectureId not sent');
  const lecture = await models.Lecture.findOne({
    where: { id: LectureId },
  });

  ctx.assert(lecture, 404, '404: Lecture not found');

  const keywords = await models.Keyword.findAll({
    where: { LectureId },
    include: models.User,
  });
  ctx.body = keywords;
};

exports.deleteVotes = async (ctx) => {
  const UserId = await checkAndGetUserId(ctx);

  await models.User_Keyword.destroy({ where: { UserId } });
  ctx.body = 204;
};

exports.submit = async (ctx) => {
  const UserId = await checkAndGetUserId(ctx);
  const LectureId = getLectureId(ctx);
  const { word } = ctx.request.body;

  const keyword = models.Keyword.create({
    UserId,
    LectureId,
    word,
  });

  ctx.assert(keyword, 500, '500: Keyword could not be created');

  ctx.status = 204;
};

exports.vote = async (ctx) => {
  const UserId = await checkAndGetUserId(ctx);
  const user = await models.User.findOne({
    where: { id: UserId },
  });

  const { KeywordId } = ctx.params;
  ctx.assert(KeywordId, 400, '400: KeywordId not sent');

  const keyword = await models.Keyword.findOne({
    where: { id: KeywordId },
  });

  ctx.assert(keyword, 404, '404: Keyword not found');

  await keyword.addUser(user);
  ctx.body = keyword.id;
  ctx.status = 200;
};

exports.cancel = async (ctx) => {
  const UserId = await checkAndGetUserId(ctx);
  const { KeywordId } = ctx.params;
  ctx.assert(KeywordId, 400, '400: KeywordId not sent');

  const relation = await models.User_Keyword.findOne({
    where: { UserId, KeywordId },
  });

  ctx.assert(relation, 404, '404: Relation not found');

  await models.User_Keyword.destroy({ where: { UserId, KeywordId } });

  ctx.status = 204;
};

exports.userKeywords = async (ctx) => {
  const UserId = await checkAndGetUserId(ctx);
  const LectureId = getLectureId(ctx);

  const user = await models.User.findOne({ where: { id: UserId } });

  const keywords = await user.getKeywords();

  const lectureKeywords = keywords.filter(
    (keyword) => keyword.LectureId === LectureId
  );

  ctx.body = lectureKeywords;
};
