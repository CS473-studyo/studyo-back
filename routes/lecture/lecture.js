const models = require("../../database/models");

exports.show = async (ctx) => {
  console.log("received")
  const { course, number } = ctx.request.body;
  const new_lecture = await models.Lecture.create({ course, number });
  ctx.assert(new_lecture, 500);
  ctx.status = 204;
};