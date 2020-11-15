const models = require("../../database/models");

exports.join = async (ctx) => {
  console.log("received")
  const userId = ctx.request.User.id;
  const user = await models.User.findOne({
      where: { id: userId },
  });
  ctx.assert(user, 401);

  const { id } = ctx.params;

  const course = await models.Course.findOne({
      where: { id },
      include: models.User,
  });
  ctx.assert(course, 400);

  const exists = course.User.some((courseUser) => {
      return courseUser.id === userId;
  });

  if (exists) {
      ctx.status = 204;
      return;
  }

  course.addUser([User]);
  ctx.body = course.id;
  ctx.status = 200;
};