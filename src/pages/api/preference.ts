// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import OTAResponse from 'src/common/framework/OTAResponse';
import { PreferenceKey } from 'src/common/preference';
import PreferenceService from 'src/service/PreferenceService';
import { PreferenceVO } from 'src/vo';

export interface PreferenceResponseEntity {
  method: string;
}

export type PreferencePutParam = {
  [Property in PreferenceKey]: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<OTAResponse<PreferenceResponseEntity>>,
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
  res: NextApiResponse<OTAResponse<PreferenceResponseEntity>>,
) {
  const response = new OTAResponse<PreferenceResponseEntity>();
  const result: PreferenceResponseEntity[] = [];
  response.result = result;
  res.status(200).json(response);
}

function doPost(
  req: NextApiRequest,
  res: NextApiResponse<OTAResponse<PreferenceResponseEntity>>,
) {
  const response = new OTAResponse<PreferenceResponseEntity>();
  const result: PreferenceResponseEntity[] = [];
  response.result = result;
  res.status(200).json(response);
}

async function doPut(
  req: NextApiRequest,
  res: NextApiResponse<OTAResponse<PreferenceResponseEntity>>,
) {
  const requestBody: PreferencePutParam = req.body;

  const preferenceList: PreferenceVO[] = [];

  for (const key in requestBody) {
    const preference = new PreferenceVO();
    preference.PREFERENCE_KEY = key;
    preference.PREFERENCE_VALUE = requestBody[key as PreferenceKey];
    preferenceList.push(preference);
  }

  const resultCount = await PreferenceService.insertSiteInformation(
    preferenceList,
  );

  const resultList = new Array(resultCount).fill('UPDATE');

  const response = new OTAResponse<PreferenceResponseEntity>();
  response.result = resultList;

  res.status(200).json(response);
}
