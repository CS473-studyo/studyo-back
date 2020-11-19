const models = require('@models');

exports.answering = async (ctx) => {
  console.log('received');
  const { question, user, content,clap } = ctx.request.body;
  const new_answer = await models.Answer.create({
    question, 
    user, 
    content,
    clap
  });
  ctx.assert(new_answer, 500);
  ctx.status = 204;
};

exports.others = async (ctx) => {
  console.log('answer/others')
  const quizId = ctx.request.body.id
  const answers = await models.Answer.findAll({
  where: { question: quizId }
  });
  ctx.body = answers;
  ctx.status = 200;
}

exports.myanswer= async (ctx) => {
  console.log('answer/myanswer')
  const quizId = ctx.request.body.id
  const userId = ctx.request.body.userId
  const answers = await models.Answer.findAll({
  where: { question: quizId, user: userId }
  });
  ctx.body = answers;
  ctx.status = 200;
}