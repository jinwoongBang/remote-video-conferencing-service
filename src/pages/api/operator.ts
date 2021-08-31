// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
/**
 * Framework
 */
import OTAController from 'src/common/framework/OTAController';
import OTAResponse from 'src/common/framework/OTAResponse';

/**
 * Service
 */
import AuthorityService from 'src/service/AuthorityService';
import OperatorService, {
  DeleteOperatorParam,
  InsertOperatorParam,
  SelectOperatorParam,
} from 'src/service/OperatorService';

/**
 * VO
 */
import { PreferenceVO, User } from 'src/vo';

/**
 * Enum
 */
import { AuthorityKey } from 'src/common/enum/authority';
import OperatorVO from 'src/vo/OperatorVO';

export interface OperatorResponseEntity {
  method: string;
}

export type OperatorGetParam = {
  currentPage: string;
  returnCount: string;
  [key: string]: string | string[];
};

export type OperatorPostParam = {
  user: InsertOperatorParam;
};

export type OperatorDeleteParam = {
  id: string;
};

type OmitOperatorVO = Omit<OperatorVO, 'dateOfCreated'>;

class OperatorController extends OTAController {
  constructor(request: NextApiRequest, response: NextApiResponse) {
    super(request, response);
  }

  protected async doGet(
    req: NextApiRequest,
    res: NextApiResponse<OTAResponse<OperatorVO>>,
  ): Promise<void> {
    const queryParam = req.query as OperatorGetParam;
    const returnCount = Number(queryParam.returnCount);
    const currentPage = Number(queryParam.currentPage);
    const param = {
      returnCount,
      currentPage,
    };

    const response = new OTAResponse<OperatorVO>();
    try {
      const totalUserCount = await OperatorService.selectOperatorCount();
      const userList = await OperatorService.selectOperator(param);
      const authorityList = await AuthorityService.selectAuthorityListByKeys({
        authorityKeys: Object.values(AuthorityKey),
      });

      const operatorList = userList.map((user) => {
        const operator: OperatorVO = Object.assign(new OperatorVO(), user);
        const { AUTHORITIES } = operator;
        if (AUTHORITIES) {
          const authList = AUTHORITIES.split('-');
          authorityList.forEach((authority) => {
            const key = authority.AUTHORITY_KEY;
            const hasAuth =
              authList.findIndex(
                (auth) => Number(auth) === Number(authority.ID),
              ) !== -1;

            operator[key as keyof OmitOperatorVO] = hasAuth;
          });
        }
        return operator;
      });

      response.setPagination(currentPage, totalUserCount, returnCount);
      response.result = operatorList;
      response.success = true;
      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      response.success = false;
      response.message = error.message;
      res.status(500).json(response);
    }
  }

  protected async doPost(
    req: NextApiRequest,
    res: NextApiResponse<OTAResponse<OperatorResponseEntity>>,
  ): Promise<void> {
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
    response: NextApiResponse<OTAResponse<OperatorResponseEntity>>,
  ): Promise<void> {
    // const param: OperatorDeleteParam = request.body;
    const queryParam = request.query as OperatorDeleteParam;
    const param = {
      id: Number(queryParam.id),
    };
    const otaResponse = new OTAResponse<OperatorResponseEntity>();
    try {
      const resultCount = await OperatorService.deleteOperator(param);
      const isSuccess = resultCount === 1;
      const result: OperatorResponseEntity[] = new Array(resultCount).fill({
        method: 'DELETE',
      });
      otaResponse.result = result;
      otaResponse.success = isSuccess;
      response.status(200).json(otaResponse);
    } catch (error) {
      console.error(error);
      otaResponse.success = false;
      otaResponse.message = error.message;
      response.status(500).json(otaResponse);
    }
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const controller = new OperatorController(req, res);
  await controller.service();
}
