const models = require('@models');

exports.word = async (ctx) => {
  console.log('received');
  const { user, course, lecture, content } = ctx.request.body;
  const new_keyword = await models.Keyword.create({
    user,
    course,
    lecture,
    content,
  });
  ctx.assert(new_keyword, 500);
  ctx.status = 204;
};

exports.list = async (ctx) => {
  console.log('keyword/list')
  const courseId = ctx.request.body.course
  const lecture  = ctx.request.body.lecture
  const keyword = await models.Keyword.findAll({
  where: { course: courseId, lecture: lecture },
  });
  ctx.body = keyword;
  ctx.status = 200;
}