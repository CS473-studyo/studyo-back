const models = require("../../database/models");

exports.post = async (ctx) => {
  console.log("received question");
  const { title, detail, userid, lecture } = ctx.request.body;

  const user = await models.User.findOne({
      where: { id: userid },
  });
  ctx.assert(user, 401);
  console.log(userid);
  
  const new_question = await models.Question.create({ title, detail, userId: userid, lecture });
  ctx.assert(new_question, 500);

  new_question.addUser([user]);

  ctx.status = 204;
};

exports.list = async (ctx) => {
    console.log("question/list");
    const userId = ctx.request.body.userid;

    const user = await models.User.findOne({
        where: { id: userId },
        include: models.Question,
    });

    ctx.assert(user, 401);

    // console.log(user.Questions[0].detail);
    ctx.body = user.Questions;
    ctx.status = 200;
}