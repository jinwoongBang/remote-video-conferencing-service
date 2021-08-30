// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { KeyboardReturnOutlined } from '@material-ui/icons';
import type { NextApiRequest, NextApiResponse } from 'next';
import { atom, atomFamily, selector, selectorFamily } from 'recoil';
import OTAResponse from 'src/common/framework/OTAResponse';
import UserService from 'src/service/UserService';
import { SiteInformationProps } from 'src/store/preference';
import { reqUser } from 'src/vo';
import { UserSearch } from 'src/store/user';
import UserVO from '../../vo/UserVO';

export type Data = {
  id: number;
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OTAResponse<UserVO>>,
) {
  const { method, body, query } = req;
  // console.log(
  //   'api user req:: ' + method + '  // body:: ' + JSON.stringify(body),
  // );
  console.log(
    'api user method[' +
      method +
      ']:: ' +
      JSON.stringify(query) +
      '  // body:: ' +
      JSON.stringify(body),
  );

  const querys = query as UserSearch;

  console.log('api user query::', querys);

  const reqUser = body as reqUser;
  console.log('// reqUser:: ' + JSON.stringify(reqUser));

  const seminarResponse = new OTAResponse<UserVO>();

  // if(true){
  //   seminarResponse.success = false;
  //   res.send(seminarResponse);
  //   return;
  // }

  const result: Data[] = [
    { id: 20, name: 'before1' },
    { id: 20, name: 'before2' },
    { id: 20, name: 'before5' },
  ];

  switch (method) {
    case 'GET':
      seminarResponse.result = await UserService.selectUserList(querys);
      res.status(200).json(seminarResponse);
      break;
    case 'POST':
      const reqUser = body as reqUser;
      console.log('POST // reqUser:: ' + JSON.stringify(reqUser));

      const checkUser = await UserService.selectUserIdCheck(
        reqUser.userId ?? '',
      );

      if (!checkUser) {
        console.log('POST api user:: exist user: ');
        seminarResponse.success = false;
        res.send(seminarResponse);
        return;
      }

      const data = await UserService.insertUser(reqUser);

      console.log('POST api user:: insert data: ' + data);
      res.status(200).json(seminarResponse);
      break;
    default:
      res.status(200).json(seminarResponse);
      break;
  }
}
