const models = require('@models');
const { uploadFile } = require('@utils/aws');

exports.courseLectures = async (ctx) => {
  const CourseId = ctx.params.courseId;
  ctx.assert(CourseId, 400, '400: CourseId not sent');

  const lectures = await models.Lecture.findAll({
    where: { CourseId },
  });

  ctx.body = lectures;
  ctx.status = 200;
};

exports.uploadPdf = async (ctx) => {
  const LectureId = ctx.params.lectureId;
  ctx.assert(LectureId, 400, '400: LectureId not sent');

  const lecture = await models.Lecture.findOne({
    where: { id: LectureId },
  });

  ctx.assert(lecture, 404, '404: Lecture not found');

  const { file } = ctx.request.files;
  const { key, url } = await uploadFile({
    fileName: file.name,
    filePath: file.path,
    fileType: file.type,
  });

  lecture.pdf = url;
  await lecture.save();

  ctx.body = { key, url };
};

exports.lectureInfo = async (ctx) => {
  const LectureId = ctx.params.lectureId;
  ctx.assert(LectureId, 400, '400: LectureId not sent');

  const lecture = await models.Lecture.findOne({
    where: { id: LectureId },
  });

  ctx.assert(lecture, 404, '404: Lecture not found');
  ctx.body = lecture;
  ctx.status = 200;
};
