import { NextApiRequest, NextApiResponse } from 'next';
import OTAResponse from 'src/common/framework/OTAResponse';
import withSession from 'src/common/utils/session';
import UserVO from 'src/vo/UserVO';
import { withIronSession, Session } from 'next-iron-session';

type NextIronRequest = NextApiRequest & { session: Session };

async function handler(req: NextIronRequest, res: NextApiResponse) {
  const user: UserVO | undefined = req.session.get('user');
  const response = new OTAResponse<UserVO>();

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

export default withIronSession(handler, {
  password: 'complex_password_at_least_32_characters_long',
  cookieName: 'myapp_cookiename',
  // if your localhost is served on http:// then disable the secure flag
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
});
