const models = require("../../database/models");

exports.writenote = async (ctx) => {
  console.log("received")
  const { course, lecture, page, author, content } = ctx.request.body;
  const new_note = await models.Note.create({ course, lecture, page, author, content });
  ctx.assert(new_note, 500);
  ctx.status = 204;
};