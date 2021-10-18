import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-iron-session';
import OTAController from 'src/common/framework/OTAController';
import OTAResponse from 'src/common/framework/OTAResponse';
import withSession from 'src/common/utils/session';
import UserLogService from 'src/service/UserLogService';
import UserService from 'src/service/UserService';
import UserVO, { User } from 'src/vo/UserVO';
import jwt from 'jsonwebtoken';

//TODO 1018 임시 이거도 어떻게 할지 정해야할 듯 유저 데이터에 PASSWORD KeY를 둘지
const JWT_KEY = 'asdjasiodjsaiojdioasjd';

type NextIronRequest = NextApiRequest & { session: Session };
class LoginController extends OTAController {
  protected doGet(
    request: NextApiRequest,
    response: NextApiResponse<any>,
  ): Promise<any> {
    throw new Error('Method not implemented.');
  }
  protected async doPost(
    request: NextIronRequest,
    response: NextApiResponse<any>,
  ): Promise<any> {
    const requestBody: UserVO = request.body;
    const otaResponse = new OTAResponse<User>();

    try {
      const user: User = await UserService.selectUser(requestBody);
      if (!user) {
        throw new Error('일치하는 계정이 존재하지 않습니다.');
      }

      const { EVENT_ID, USER_ID, STATUS, IS_DELETED } = user;
      const userHost = request.headers.host;
      const token = jwt.sign(
        {
          EVENT_ID,
          USER_ID,
          STATUS,
          idDeleted: IS_DELETED === 1,
          userHost,
        },
        JWT_KEY,
      );

      otaResponse.result.push(user);

      request.session.set('user', user);
      await request.session.save();

      const accessToken = request.cookies['on-the-air/access-token'] || '';

      await UserLogService.insertUserLog({
        userId: user.ID,
        accessToken: token,
        accessIp: request.headers.host || '',
        accessEnv: request.headers['user-agent'] || '',
        message: '',
      });

      response.status(200);
    } catch (error) {
      console.error(error);
      response.status(401);
      otaResponse.message = error.message;
      otaResponse.success = false;
    }

    response.send(otaResponse);
  }
  protected doPut(
    request: NextApiRequest,
    response: NextApiResponse<any>,
  ): Promise<any> {
    throw new Error('Method not implemented.');
  }
  protected doDelete(
    request: NextApiRequest,
    response: NextApiResponse<any>,
  ): Promise<any> {
    throw new Error('Method not implemented.');
  }
}

export default withSession((req, res) =>
  new LoginController(req, res).service(),
);
