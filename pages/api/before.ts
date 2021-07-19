// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import OTAResponse from './framework/OTAResponse';

export type Data = {
  id: number;
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<OTAResponse<Data>>,
) {
  const { method } = req;

  const seminarResponse = new OTAResponse<Data>();
  const result: Data[] = [
    { id: 20, name: 'before1' },
    { id: 20, name: 'before2' },
    { id: 20, name: 'before5' },
  ];
  seminarResponse.result = result;

  switch (method) {
    case 'GET':
      res.status(200).json(seminarResponse);
      break;
    case 'POST':
      res.status(200).json(seminarResponse);
      break;
    default:
      res.status(200).json(seminarResponse);
      break;
  }
}
