const models = require('@models');

exports.join = async (ctx) => {
  console.log('received');
  const userId = ctx.request.user.id;
  const user = await models.User.findOne({
    where: { id: userId },
  });
  ctx.assert(user, 401);
  const { id } = ctx.params;
  const answer = await models.Answer.findOne({
    where: { id },
    include: models.User,
  });
  ctx.assert(answer, 400);

  answer.addUser([user]);
  ctx.body = answer.id;
  ctx.status = 200;
};

exports.answering = async (ctx) => {
  console.log('answering');
  const { question, user, content } = ctx.request.body;
  const new_answer = await models.Answer.create({
    question, 
    user, 
    content,
    clap: 0,
  });
  ctx.assert(new_answer, 500);
  ctx.status = 204;
};

exports.answerlist = async (ctx) => {
  console.log('answering/list');
  const { question } = ctx.request.body;

  const answers = await models.Answer.findAll({
    where: { question: question }
  });
  
  ctx.body = answers;
  ctx.status = 200;
};

exports.clap = async (ctx) => {
  console.log('answering/clap');
  const { id, user } = ctx.request.body;
  
  const answer = await models.Answer.findOne({
    where: { id: id }
  });

  ctx.assert(answer, 401);

  if (answer.user == user) {
    ctx.body = answer.clap;
  }
  else {
    answer.update({ clap: answer.clap + 1 });
    ctx.body = answer.clap;
  }
  ctx.status = 200;
}

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