'use strict';

const aws = require('aws-sdk');
const s3 = new aws.S3({apiVersion: '2006-03-01'});
const moment = require('moment-timezone');

const bucket = 'gamelog-kuro-wiz';
const objectKey = 'wukann.json';
const contentType = 'application/json';
const arrowedOrigin = '*';

const getDataFromS3 = () => {
  const s3Params = {
    Bucket: bucket,
    Key: objectKey
  };
  return s3.getObject(s3Params).promise();
};

const putDataToS3 = (data) => {
  const s3Params = {
    Bucket: bucket,
    Key: objectKey,
    ContentType: contentType,
    Body: data
  };
  return s3.putObject(s3Params).promise();
};

exports.handler = (event, context, callback) => {

  console.log('event', JSON.stringify(event));
  console.log('context', JSON.stringify(context));

  const done = (err, res) => callback(err, {
    statusCode: '200',
    body: JSON.stringify(res),
    headers: {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': arrowedOrigin
    }
  });

  const httpMethod = event.httpMethod;
  const requestBody = JSON.parse(event.body);
  const date = moment().valueOf();
  console.log('input values', requestBody, date);

  switch (httpMethod) {
    case 'POST':
      getDataFromS3()
        .then((output) => {
          let data = JSON.parse(output.Body.toString());
          data.push({ Date: date, Value: requestBody.level });
          return putDataToS3(JSON.stringify(data));
        })
        .then(() => {
          const localeDateString = moment(date).tz('Asia/Tokyo').format('YYYY-MM-DD HH:mm');
          const body = { date: date, localeDateString: localeDateString, level: requestBody.level };
          done(null, body);

          console.log('done', JSON.stringify(body));

        })
        .catch((err) => {
          done(err, null);
        });
      break;

    case 'GET':
      getDataFromS3()
        .then((output) => {
          const body = output.Body.toString();
          done(null, body);
        })
        .catch((err) => {
          done(err, null);
        });
      break;

    default:
      done(new Error('undefined switch case(defalut)'), null);
      break;
  }
};