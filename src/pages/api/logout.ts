import { NextApiRequest, NextApiResponse } from 'next';
import withSession from 'src/common/utils/session';

import { Session } from 'next-iron-session';
import OTAResponse from 'src/common/framework/OTAResponse';
type NextIronRequest = NextApiRequest & { session: Session };

async function handler(req: NextIronRequest, res: NextApiResponse) {
  req.session.unset('user');
  req.session.destroy();
  const response = new OTAResponse();
  res.statusCode = 200;
  // res.send('Logged out');
  res.send(response);
}

export default withSession(handler);
