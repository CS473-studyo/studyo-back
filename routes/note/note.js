const models = require('@models');

exports.writenote = async (ctx) => {
  console.log('received');
  const { course, lecture, page, author, content, clap } = ctx.request.body;
  const new_note = await models.Note.create({
    course,
    lecture,
    page,
    author,
    content,
    clap,
  });
  ctx.assert(new_note, 500);
  ctx.status = 204;
};