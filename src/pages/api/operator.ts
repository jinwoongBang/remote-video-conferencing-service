// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import OTAResponse from 'src/common/framework/OTAResponse';
import OperatorService from 'src/service/OperatorService';
import { PreferenceVO, User } from 'src/vo';

export interface OperatorResponseEntity {
  method: string;
}

export type OperatorPostParam = {
  user: User;
};

class OperatorAPI {
  private request: NextApiRequest;
  private response: NextApiResponse;
  private method?: HTTPMethod;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    this.request = req;
    this.response = res;
    this.method = req.method as HTTPMethod;
  }

  async doPost() {
    const response = new OTAResponse<OperatorResponseEntity>();
    const param = this.request.body as OperatorPostParam;
    const resultCount = await OperatorService.insertOperator(param.user);
    const isSuccess = resultCount === 1;

    const result: OperatorResponseEntity[] = new Array(resultCount).fill({
      method: 'INSERT',
    });
    response.result = result;
    response.success = isSuccess;

    this.response.status(200).json(response);
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

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  new OperatorAPI(req, res).handler();
}
