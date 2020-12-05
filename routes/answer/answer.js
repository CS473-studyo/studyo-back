const models = require('@models');
const { checkAndGetUserId } = require('@utils/auth');

const getQuestionId = (ctx) => {
  const QuestionId = ctx.params.questionId;
  ctx.assert(QuestionId, 400, '400: QuestionId not sent');
  return QuestionId;
};

exports.submit = async (ctx) => {
  const UserId = await checkAndGetUserId(ctx);
  const { content } = ctx.request.body;
  const QuestionId = getQuestionId(ctx);

  const question = await models.Question.findOne({ where: { id: QuestionId } });

  ctx.assert(question, 404, '404: Question not found');

  const user = await models.User.findOne({
    where: { id: UserId },
  });

  const answer = await models.Answer.findOne({ where: { QuestionId, UserId } });

  if (answer) {
    answer.content = content;
    await answer.save();
    ctx.status = 204;
    return;
  }

  const newAnswer = await models.Answer.create({
    QuestionId: question.id,
    UserId,
    content,
    clap: 0,
    isSelected: false,
  });

  ctx.assert(newAnswer, 500, '500: Answer could not be created');

  user.badge = user.badge + 1;
  await user.save();

  ctx.status = 204;
};

exports.answers = async (ctx) => {
  const QuestionId = getQuestionId(ctx);

  const answers = await models.Answer.findAll({
    where: { QuestionId },
    include: models.User,
  });

  ctx.body = answers;
};

exports.userAnswer = async (ctx) => {
  const UserId = await checkAndGetUserId(ctx);
  const QuestionId = getQuestionId(ctx);

  const answer = await models.Answer.findOne({
    where: { QuestionId, UserId },
  });
  ctx.body = answer;
};

exports.clap = async (ctx) => {
  await checkAndGetUserId(ctx);
  const AnswerId = ctx.params.answerId;
  ctx.assert(AnswerId, 400, '400: AnswerId not sent');

  await models.Answer.increment('clap', { where: { id: AnswerId } });

  ctx.status = 204;
};

exports.getClap = async (ctx) => {
  const answerId = ctx.params.answerId;

  const answer = await models.Answer.findOne({
    where: { id: answerId },
  });
  console.log(answer.clap);
  ctx.body = answer.clap;
};

exports.select = async (ctx) => {
  const answerId = ctx.params.answerId;
  const UserId = checkAndGetUserId(ctx);

  ctx.assert(answerId, 400, '400: AnswerId not sent');

  const answer = await models.Answer.findOne({
    where: { id: answerId },
  });

  ctx.assert(answer, 404, '404: answer not found');

  answer.isSelected = true;
  answer.save();
  ctx.status = 204;
};
