const models = require('@models');

exports.ask = async (ctx) => {
  console.log('received');
  const { title, content, author, lecture } = ctx.request.body;
  const new_quiz = await models.Quiz.create({
    title,
    content,
    author,
    lecture,
  });
  ctx.assert(new_quiz, 500);
  ctx.status = 204;
};

exports.list = async (ctx) => {
  console.log('quiz/list')
  const courseId = ctx.request.body.courseId
  const lecture = ctx.request.body.lecture
  const quizzes = await models.Quiz.findAll({
  where: { lecture: lecture }
  });
  ctx.body = quizzes;
  ctx.status = 200;
}