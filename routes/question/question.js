const models = require('../../database/models');
const { checkAndGetUserId } = require('@utils/auth');

exports.post = async (ctx) => {
  console.log('received question');
  const UserId = await checkAndGetUserId(ctx);
  const { title, content } = ctx.request.body;
  const LectureId = ctx.params.lectureId;

  //   const user = await models.User.findOne({ id: UserId });

  const new_question = await models.Question.create({
    LectureId: LectureId,
    UserId: UserId,
    title,
    content,
  });
  ctx.assert(new_question, 500);

  ctx.status = 204;
};

exports.list = async (ctx) => {
  //my question
  console.log('question/list');
  const UserId = await checkAndGetUserId(ctx);

  const user = await models.User.findOne({
    where: { id: UserId },
    include: models.Question,
  });
  ctx.assert(user, 401);

  // console.log(user.Questions[0].detail);
  ctx.body = user.Questions;
  ctx.status = 200;
};

exports.quizList = async (ctx) => {
  const lecture = ctx.params.lectureId;
  const UserId = await checkAndGetUserId(ctx);
  const quizzes = await models.Question.findAll({
    //todo: except my Q
    where: { LectureId: lecture },
  });

  //   console.log(quizzes);

  //   for (var i = quizzes.length - 1; i >= 0; i--) {
  //     console.log(i);
  //     // if (quizzes[i].UserId == UserId) {
  //     //   quizzes.splice(i, 1);
  //     // }
  //   }

  ctx.body = quizzes;
  ctx.status = 200;
};
