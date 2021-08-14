import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-iron-session';
import OTAResponse from 'src/common/framework/OTAResponse';
import withSession from 'src/common/utils/session';
import UserService from 'src/service/UserService';
import UserVO from 'src/vo/UserVO';

type NextIronRequest = NextApiRequest & { session: Session };

async function handler(
  req: NextIronRequest,
  res: NextApiResponse,
): Promise<void> {
  // get user from database then:
  const requestBody: UserVO = req.body;
  console.log({ requestBody });

  const user: UserVO = await UserService.selectUser(requestBody);

  const response = new OTAResponse<UserVO>();

  if (user) {
    console.log({ loginDB: user });
    req.session.set('user', user);
    await req.session.save();
    response.result.push(user);
  } else {
    response.success = false;
  }

  res.send(response);
}

export default withSession(handler);
