// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import OTAResponse from 'src/common/framework/OTAResponse';
import { AuthorityKey } from 'src/common/enum/authority';
import PreferenceService from 'src/service/PreferenceService';
import { PreferenceVO } from 'src/vo';

export interface AuthorityResponseEntity {
  method: string;
}

export type AuthorityGetParam = {
  authorityKeyList?: string[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<OTAResponse<AuthorityResponseEntity>>,
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
  res: NextApiResponse<OTAResponse<AuthorityResponseEntity>>,
) {
  const query = req.query;
  console.log({ query });
  const response = new OTAResponse<AuthorityResponseEntity>();
  const result: AuthorityResponseEntity[] = [];
  response.result = result;
  res.status(200).json(response);
}

function doPost(
  req: NextApiRequest,
  res: NextApiResponse<OTAResponse<AuthorityResponseEntity>>,
) {
  const response = new OTAResponse<AuthorityResponseEntity>();
  const result: AuthorityResponseEntity[] = [];
  response.result = result;
  res.status(200).json(response);
}

async function doPut(
  req: NextApiRequest,
  res: NextApiResponse<OTAResponse<AuthorityResponseEntity>>,
) {
  const response = new OTAResponse<AuthorityResponseEntity>();
  const result: AuthorityResponseEntity[] = [];
  response.result = result;
  res.status(200).json(response);
}
