const models = require('@models');
const { checkAndGetUserId } = require('@utils/auth');
const { Op } = require('sequelize');

exports.userCourses = async (ctx) => {
  const UserId = await checkAndGetUserId(ctx);

  const user = await models.User.findOne({
    where: { id: UserId },
    include: {
      model: models.Course,
      include: {
        model: models.User,
        attributes: ['id'],
      },
    },
  });

  ctx.body = user.Courses;
};

exports.newCourses = async (ctx) => {
  const UserId = await checkAndGetUserId(ctx);

  const userCourses = await models.User_Course.findAll({ where: { UserId } });

  const idList = userCourses.map(({ CourseId }) => CourseId);

  const courses = await models.Course.findAll({
    where: { [Op.not]: { id: idList } },
  });

  ctx.body = courses;
};

exports.courseInfo = async (ctx) => {
  const { code } = ctx.params;
  ctx.assert(code, 400, '400: CodeId not sent');

  const course = await models.Course.findOne({
    where: { code },
    include: {
      model: models.User,
      attributes: ['id'],
    },
  });

  ctx.assert(course, 404, '404: Course not found');

  ctx.body = course;
};

exports.courseLectures = async (ctx) => {
  const { code } = ctx.params;
  ctx.assert(code, 400, '400: Course code not sent');

  const course = await models.Course.findOne({
    where: { code },
    include: [
      {
        model: models.Lecture,
        attributes: ['id', 'number', 'date'],
        include: [
          {
            model: models.Keyword,
            attributes: ['word', 'votes'],
            include: [
              {
                model: models.User,
                attributes: ['id'],
              },
            ],
          },
        ],
      },
      {
        model: models.User,
        attributes: ['id'],
      },
    ],
    order: [[models.Lecture, 'number', 'ASC']],
    limit: 3,
  });

  ctx.assert(course, 404, '404: Course not found');

  ctx.body = course.Lectures;
};

exports.join = async (ctx) => {
  const UserId = await checkAndGetUserId(ctx);

  const user = await models.User.findOne({ where: { id: UserId } });

  const { CourseId } = ctx.params;
  ctx.assert(CourseId, 400, '400: CourseId not sent');

  const course = await models.Course.findOne({
    where: { id: CourseId },
    include: {
      model: models.User,
      attributes: ['id'],
    },
  });

  ctx.assert(course, 404, '404: Course not found');

  await course.addUser(user);

  ctx.body = course.id;
};
