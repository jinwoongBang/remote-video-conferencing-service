import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-iron-session';
import OTAResponse from 'src/common/framework/OTAResponse';
import withSession from 'src/common/utils/session';
import UserService from 'src/service/UserService';
import UserVO from 'src/vo/UserVO';

type NextIronRequest = NextApiRequest & { session: Session };
class Login {
  private request: NextIronRequest;
  private response: NextApiResponse;
  private method?: HTTPMethod;

  constructor(req: NextIronRequest, res: NextApiResponse) {
    this.request = req;
    this.response = res;
    this.method = req.method as HTTPMethod;
  }

  async doPost() {
    const { request, response } = this;
    const requestBody: UserVO = request.body;
    const otaResponse = new OTAResponse<UserVO>();

    try {
      const user: UserVO = await UserService.selectUser(requestBody);
      console.log({ user });
      if (!user) {
        throw new Error('일치하는 계정이 존재하지 않습니다.');
      }

      otaResponse.result.push(user);

      request.session.set('user', user);
      await request.session.save();

      response.status(200);
    } catch (error) {
      console.error(error);
      response.status(401);
      otaResponse.message = error.message;
      otaResponse.success = false;
    }

    response.send(otaResponse);
  }

  async handler() {
    switch (this.method) {
      case 'GET':
        break;
      case 'POST':
        await this.doPost();
        break;
      case 'PUT':
        break;
      default:
        throw new Error('지정된 Method API 가 존재하지 않습니다.');
    }
  }
}

export default withSession((req, res) => new Login(req, res).handler());
