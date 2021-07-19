// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export type Data = {
  id: number;
  name: string;
};

export interface SeminarResponse<T> {
  success: boolean;
  result: T[];
}

export class SeminarResponseImpl implements SeminarResponse<Data> {
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
