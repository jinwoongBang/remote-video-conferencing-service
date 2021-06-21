// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import UserVO from '../../src/vo/UserVO';

export type Data = {
  id: number;
  name: string;
};

export interface SeminarResponse<T> {
  success: boolean;
  result: T[];
}

export class SeminarResponseImpl<T> implements SeminarResponse<T> {
  success!: boolean;
  result!: T[];

  constructor() {
    this.success = true;
    this.result = [];
  }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SeminarResponse<UserVO>>,
) {
  const { method } = req;

  const seminarResponse = new SeminarResponseImpl<UserVO>();
  const result: UserVO[] = [
    new UserVO({
      userName: '진웅 방',
      userId: 'jinwoong-bang',
      userPassword: '1234',
    }),
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
