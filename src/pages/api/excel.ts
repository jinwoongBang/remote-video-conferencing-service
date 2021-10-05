// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import * as _ from 'lodash';

/**
 * Framework
 */
import OTAController from 'src/common/framework/OTAController';
import OTAResponse from 'src/common/framework/OTAResponse';

/**
 * Service
 */
import AuthorityService from 'src/service/AuthorityService';

import ExcelService from 'src/service/ExcelService';

/**
 * VO
 */
import { PreferenceVO, User } from 'src/vo';

/**
 * Enum
 */
import { AuthorityKey, ParentsAuthorityKey } from 'src/common/enum/authority';
import { IExcel } from 'src/vo/ExcelVO';

export type OperatorGetParam = {
  currentPage: string;
  returnCount: string;
  [key: string]: string | string[];
};

export type OperatorDeleteParam = {
  id: string;
};
class OperatorController extends OTAController {
  constructor(request: NextApiRequest, response: NextApiResponse) {
    super(request, response);
  }

  protected async doGet(
    req: NextApiRequest,
    res: NextApiResponse<OTAResponse<IExcel>>,
  ): Promise<void> {
    const queryParam = req.query as OperatorGetParam;
    const returnCount = Number(10);
    const currentPage = Number(0);
    // const returnCount = Number(queryParam.returnCount);
    // const currentPage = Number(queryParam.currentPage);
    // const param = {
    //   returnCount,
    //   currentPage,
    // };
    const param = {
      returnCount,
      currentPage,
    };

    const response = new OTAResponse<IExcel>();
    try {
      const excelList = await ExcelService.selectExcelFileList(param);

      console.log('excelList', excelList);

      response.setPagination(currentPage, 1, returnCount);
      response.result = excelList;
      response.success = true;
      res.status(200).json(response);
    } catch (e) {
      const error = e as Error;
      console.error(error);
      response.success = false;
      response.message = error.message;
      res.status(500).json(response);
    }
  }

  protected async doPost(
    req: NextApiRequest,
    res: NextApiResponse<OTAResponse<IExcel>>,
  ): Promise<void> {}

  protected async doPut(
    request: NextApiRequest,
    response: NextApiResponse<OTAResponse<IExcel>>,
  ): Promise<void> {}

  protected async doDelete(
    request: NextApiRequest,
    response: NextApiResponse<OTAResponse<IExcel>>,
  ): Promise<void> {}
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const controller = new OperatorController(req, res);
  await controller.service();
}
