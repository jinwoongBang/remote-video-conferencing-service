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

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<OTAResponse<OperatorResponseEntity>>,
) {
  const { method } = req;

  switch (method) {
    case 'GET':
      doGet(req, res);
      break;
    case 'POST':
      doPost(req, res);
      break;
    case 'PUT':
      doPut(req, res);
      break;
    default:
      throw new Error('지정된 Method API 가 존재하지 않습니다.');
  }
}

function doGet(
  req: NextApiRequest,
  res: NextApiResponse<OTAResponse<OperatorResponseEntity>>,
) {
  const query = req.query;
  console.log({ query });
  const response = new OTAResponse<OperatorResponseEntity>();
  const result: OperatorResponseEntity[] = [];
  response.result = result;
  res.status(200).json(response);
}

function doPost(
  req: NextApiRequest,
  res: NextApiResponse<OTAResponse<OperatorResponseEntity>>,
) {
  const param = req.body as OperatorPostParam;
  OperatorService.insertOperator(param.user);
  const response = new OTAResponse<OperatorResponseEntity>();
  const result: OperatorResponseEntity[] = [];
  response.result = result;
  res.status(200).json(response);
}

async function doPut(
  req: NextApiRequest,
  res: NextApiResponse<OTAResponse<OperatorResponseEntity>>,
) {
  const response = new OTAResponse<OperatorResponseEntity>();
  const result: OperatorResponseEntity[] = [];
  response.result = result;
  res.status(200).json(response);
}
