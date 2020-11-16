const models = require("../../database/models");

exports.show = async (ctx) => {
  console.log("lecture/show")
  const { course } = ctx.params;
  console.log(course);

  const lectures = await models.Lecture.findAll({
    where: { course: course }
  })

  ctx.assert(lectures.length != 0, 401, "No lectures");

  ctx.body = lectures;
  ctx.status = 200;
};