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
