const models = require("../../database/models");

exports.group = async (ctx) => {
  console.log("received")
  const { course, creator } = ctx.request.body;
  const new_studygroup = await models.Studygroup.create({ course, creator });
  ctx.assert(new_studygroup, 500);
  ctx.status = 204;
};