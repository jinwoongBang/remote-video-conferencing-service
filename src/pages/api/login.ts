import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSession, Session } from 'next-iron-session';
import OTAResponse from 'src/common/framework/OTAResponse';
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

export default withIronSession(handler, {
  password: 'complex_password_at_least_32_characters_long',
  cookieName: 'myapp_cookiename',
  // if your localhost is served on http:// then disable the secure flag
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
});
