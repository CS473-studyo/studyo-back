const fs = require('fs');
const aws = require('aws-sdk');

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_KEY,
});

exports.uploadFile = async ({ fileName, filePath, fileType }) => {
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(filePath);
    stream.on('error', function (err) {
      reject(err);
    });

    s3.upload(
      {
        ACL: 'public-read',
        Bucket: process.env.BUCKET_NAME,
        Body: stream,
        Key: fileName,
        ContentType: fileType,
      },
      function (err, data) {
        if (err) {
          reject(err);
        } else if (data) {
          resolve({ key: data.Key, url: data.Location });
        }
      }
    );
  });
};
