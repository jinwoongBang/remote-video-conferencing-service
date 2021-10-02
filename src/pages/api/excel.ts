// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import * as _ from 'lodash';

import nextConnect from 'next-connect';
import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

aws.config.loadFromPath('/Users/ramsang/Desktop/on-the-air/config/s3.json');
const s3 = new aws.S3();
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'bangdukbucket01/test', //todo 0926 일단 성공은 했는데 너무 public이라서 뭔가 꺼림직하여 더 알아보고 적용하기
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, Date.now() + '.' + file.originalname.split('.').pop()); // 이름 설정
    },
  }),
});

// FIXME Local
// const upload = multer({
//   storage: multer.diskStorage({
//     destination: './public/uploads',
//     filename: (req, file, cb) => cb(null, file.originalname),
//   }),
// });

const OTARouter = nextConnect<any, NextApiResponse>({
  onError(error, req, res) {
    console.log('Sorry something Happened!', error.message);
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
})
  .use(upload.single('excel_file'))
  .get((req, res) => {
    console.log('get', req);
  })
  .post((req, res) => {
    console.log('post', req.file);
    console.log('post 성공 seccesss@@@@ ', req.file.key);
    res.status(200).json({ ok: 'success' });
  })
  .put(async (req, res) => {
    res.end('async/await is also supported!');
  })
  .patch(async (req, res) => {
    throw new Error('Throws me around! Error can be caught and handled.');
  });

export default OTARouter;
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
    // sizeLimit: '500kb',
  },
};
