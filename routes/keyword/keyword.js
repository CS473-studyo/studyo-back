const models = require('@models');
const keywordRouter = require('.');

exports.join = async (ctx) => {
  console.log('received');
  const userId = ctx.request.user.id;
  const user = await models.User.findOne({
    where: { id: userId },
  });
  ctx.assert(user, 401);
  const { id } = ctx.params;

  const keyword = await models.Keyword.findOne({
    where: { id },
    include: models.User,
  });
  ctx.assert(keyword, 400);

  keyword.addUser([user]);
  ctx.body = keyword.id;
  ctx.status = 200;
};

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
  console.log('keyword/list');
  const courseId = ctx.request.body.course;
  const lecture = ctx.request.body.lecture;
  const keyword = await models.Keyword.findAll({
    where: { course: courseId, lecture: lecture },
    limit: 3,
    order: 'follower DESC',
  });

  var keywordlist = '';
  for (i in keyword) {
    console.log(keyword[i].content);
    keywordlist = keywordlist + keyword[i].content + ',';
  }
  keywordlist = keywordlist.slice(0, -1);

  ctx.body = keywordlist;
  ctx.status = 200;
};
