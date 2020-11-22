const models = require('@models');
const { checkAndGetUserId } = require('@utils/auth');

const getLectureId = (ctx) => {
  const LectureId = ctx.params.lectureId;
  ctx.assert(LectureId, 400, '400: LectureId not sent');
  return LectureId;
};

exports.lectureKeywords = async (ctx) => {
  const LectureId = getLectureId(ctx);

  const keywords = await models.Keyword.findAll({
    where: { LectureId },
    include: models.User,
  });

  ctx.body = keywords;
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

  const KeywordId = ctx.params.keywordId;
  ctx.assert(KeywordId, 400, '400: KeywordId not sent');

  const keyword = await models.Keyword.findOne({
    where: { id: KeywordId },
  });

  ctx.assert(keyword, 404, '404: Keyword not found');

  keyword.addUser(user);
  ctx.body = keyword.id;
  ctx.status = 200;
};
