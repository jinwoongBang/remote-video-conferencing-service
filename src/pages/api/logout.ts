import { NextApiRequest, NextApiResponse } from 'next';
import withSession from 'src/common/utils/session';

import { withIronSession, Session } from 'next-iron-session';
import OTAResponse from 'src/common/framework/OTAResponse';
type NextIronRequest = NextApiRequest & { session: Session };

async function handler(req: NextIronRequest, res: NextApiResponse) {
  await req.session.destroy();
  const response = await new OTAResponse();
  res.statusCode = 200;
  // res.send('Logged out');
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
