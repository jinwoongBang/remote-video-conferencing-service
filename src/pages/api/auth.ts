import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-iron-session';
import OTAResponse from 'src/common/framework/OTAResponse';
import withSession from 'src/common/utils/session';
import UserVO, { User } from 'src/vo/UserVO';
// import { withIronSession, Session } from 'next-iron-session';

type NextIronRequest = NextApiRequest & { session: Session };

async function handler(req: NextIronRequest, res: NextApiResponse) {
  const user: User | undefined = req.session.get('user');
  const response = new OTAResponse<User>();

  if (user) {
    res.statusCode = 200;
    response.result.push(user);
  } else {
    res.statusCode = 401;
    response.success = false;
    response.message = '실패';
    response.code = 401;
  }

  res.send(response);
}

export default withSession(handler);
