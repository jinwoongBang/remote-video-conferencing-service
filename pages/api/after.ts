// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  id: number;
  name: string;
};

interface SeminarResponse<T> {
  success: boolean;
  result: T[];
}

class SeminarResponseImpl implements SeminarResponse<Data> {
  success!: boolean;
  result!: Data[];

  constructor() {
    this.success = true;
    this.result = [];
  }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SeminarResponse<Data>>,
) {
  const { method } = req;

  const seminarResponse = new SeminarResponseImpl();
  const result: Data[] = [{ id: 20, name: 'after' }];
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
