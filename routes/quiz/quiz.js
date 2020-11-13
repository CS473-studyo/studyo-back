const models = require("../../database/models");

exports.ask = async (ctx) => {
  console.log("received")
  const { title, content, author, lecture } = ctx.request.body;
  const new_quiz = await models.Quiz.create({ title, content, author, lecture });
  ctx.assert(new_quiz, 500);
  ctx.status = 204;
};