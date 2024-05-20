const AWS = require("aws-sdk");

const { YOUR_ACCESS_KEY_ID, YOUR_SECRET_ACCESS_KEY, YOUR_BUCKET_REGION } =
  process.env;

AWS.config.update({
  accessKeyId: YOUR_ACCESS_KEY_ID,
  secretAccessKey: YOUR_SECRET_ACCESS_KEY,
  region: YOUR_BUCKET_REGION,
  signatureVersion: "v4",
});

const s3 = new AWS.S3({
  accessKeyId: YOUR_ACCESS_KEY_ID,
  secretAccessKey: YOUR_SECRET_ACCESS_KEY,
  region: YOUR_BUCKET_REGION,
});

module.exports = { s3 };
