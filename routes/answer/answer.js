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
