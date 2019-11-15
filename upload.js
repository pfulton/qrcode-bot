const aws = require("aws-sdk");
const S3 = new aws.S3();

const upload = (imgData) => new Promise((resolve, reject) => {
  const filename = `${Date.now()}.svg`;
  S3.putObject(
    {
      Body: imgData,
      Key: filename,
      Bucket: process.env.AWS_BUCKET,
      ContentType: 'image/svg+xml',
      ACL: "public-read"
    },
    (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(filename);
    }
  );
});

module.exports.upload = upload;
