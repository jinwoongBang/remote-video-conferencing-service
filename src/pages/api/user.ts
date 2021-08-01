// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { atom, atomFamily, selector, selectorFamily } from 'recoil';
import OTAResponse from 'src/common/framework/OTAResponse';
import UserService from 'src/service/UserService';
import { reqUser } from 'src/vo';
import UserVO from '../../vo/UserVO';

export type Data = {
  id: number;
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OTAResponse<Data>>,
) {
  const { method, body } = req;
  console.log("api user req:: " + method + "  // body:: " + JSON.stringify(body));
  
  const reqUser = (body as reqUser)
  console.log("// reqUser:: " + JSON.stringify(reqUser));

  const checkUser = await UserService.selectUserIdCheck(reqUser.userId ?? '')

  const seminarResponse = new OTAResponse<Data>();

  if(!checkUser){
    console.log("api user:: exist user: " );
    seminarResponse.success = false;
    res.send(seminarResponse);
    return
  }

  const data = await UserService.insertUser(reqUser);

  console.log("api user:: insert data: " + data);

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
