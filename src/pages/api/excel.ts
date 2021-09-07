// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import * as _ from 'lodash';

import nextConnect from 'next-connect';
import multer from 'multer';

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

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
    console.log(req);
    console.log('post', req.file);
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
