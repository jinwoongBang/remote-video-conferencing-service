import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSession, Session } from 'next-iron-session';
type NextIronRequest = NextApiRequest & { session: Session };

async function handler(
  req: NextIronRequest,
  res: NextApiResponse,
): Promise<void> {
  // get user from database then:
  req.session.set('user', {
    id: 230,
    admin: true,
  });
  await req.session.save();
  res.send('Logged in');
}

export default withIronSession(handler, {
  password: 'complex_password_at_least_32_characters_long',
  cookieName: 'myapp_cookiename',
  // if your localhost is served on http:// then disable the secure flag
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
});
