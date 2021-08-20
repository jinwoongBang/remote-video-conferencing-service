// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import OTAApi from 'src/common/framework/OTAApi';
import OTAResponse from 'src/common/framework/OTAResponse';
import OperatorService, {
  InsertOperatorParam,
} from 'src/service/OperatorService';
import { PreferenceVO, User } from 'src/vo';

export interface OperatorResponseEntity {
  method: string;
}

export type OperatorPostParam = {
  user: InsertOperatorParam;
};

class OperatorAPI extends OTAApi {
  constructor(request: NextApiRequest, response: NextApiResponse) {
    super(request, response);
  }

  protected async doGet(
    request: NextApiRequest,
    response: NextApiResponse<any>,
  ): Promise<any> {}

  protected async doPost(
    req: NextApiRequest,
    res: NextApiResponse<any>,
  ): Promise<any> {
    const param: OperatorPostParam = req.body;
    const response = new OTAResponse<OperatorResponseEntity>();
    try {
      const resultCount = await OperatorService.insertOperator(param.user);
      const isSuccess = resultCount === 1;
      const result: OperatorResponseEntity[] = new Array(resultCount).fill({
        method: 'INSERT',
      });
      response.result = result;
      response.success = isSuccess;
      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      response.success = false;
      response.message = error.message;
      res.status(500).json(response);
    }
  }

  protected async doPut(
    request: NextApiRequest,
    response: NextApiResponse<any>,
  ): Promise<any> {}

  protected async doDelete(
    request: NextApiRequest,
    response: NextApiResponse<any>,
  ): Promise<any> {}
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await new OperatorAPI(req, res).service();
}
