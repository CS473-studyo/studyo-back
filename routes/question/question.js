const models = require('@models');
const { checkAndGetUserId } = require('@utils/auth');

exports.submit = async (ctx) => {
  const UserId = await checkAndGetUserId(ctx);

  const { title, content } = ctx.request.body;
  const LectureId = ctx.params.lectureId;
  ctx.assert(LectureId, 400, '400: LectureId not sent');

  const question = await models.Question.create({
    LectureId,
    UserId,
    title,
    content,
  });
  ctx.assert(question, 500);

  ctx.status = 204;
};

exports.userQuestions = async (ctx) => {
  const UserId = await checkAndGetUserId(ctx);

  const questions = await models.Question.findOne({
    where: { UserId },
  });

  ctx.body = questions;

  ctx.status = 200;
};

exports.lectureQuestions = async (ctx) => {
  const LectureId = ctx.params.lectureId;
  ctx.assert(LectureId, 400, '400: LectureId not sent');

  const quizzes = await models.Question.findAll({
    where: { LectureId },
  });

  ctx.body = quizzes;
  ctx.status = 200;
};
