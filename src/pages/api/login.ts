import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSession, Session } from 'next-iron-session';
import OTAResponse from 'src/common/framework/OTAResponse';
import UserVO from 'src/vo/UserVO';
type NextIronRequest = NextApiRequest & { session: Session };

async function handler(
  req: NextIronRequest,
  res: NextApiResponse,
): Promise<void> {
  // get user from database then:
  const requestBody = req.body;
  console.log({ requestBody });
  const { id, password } = requestBody;

  const user = new UserVO({
    userName: '방진웅',
    userPassword: password,
    userId: id,
  });

  req.session.set('user', user);

  await req.session.save();
  const response = new OTAResponse<UserVO>();
  response.result.push(user);

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
