// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import UserVO from 'src/vo/UserVO';
import connectionPool from 'src/db';
import OTAResponse from 'src/common/framework/OTAResponse';

export type Data = {
  id: number;
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OTAResponse<UserVO>>,
) {
  const { method } = req;

  console.log('ramsanggggggggggggg');
  var conn = await connectionPool.getConnection();
  var rows = await conn.query('SELECT * FROM TB_USER'); // 쿼리 실행
  console.log(rows[0]);

  const seminarResponse = new OTAResponse<UserVO>();
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
