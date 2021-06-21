// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  id: number;
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { method } = req;

  switch (method) {
    case 'GET':
      res.status(200).json({ id: 10, name: 'John Doe' });
      break;
    case 'POST':
      res.status(200).json({ id: 20, name: 'John Doe' });
      break;
  }
}
