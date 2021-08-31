import { NextApiRequest, NextApiResponse } from 'next';
import OTAController from 'src/common/framework/OTAController';
import OTAResponse from 'src/common/framework/OTAResponse';
import EventService from 'src/service/EventService';
import EventVO from 'src/vo/EventVO';

class EventController extends OTAController {
  protected async doGet(
    request: NextApiRequest,
    response: NextApiResponse<OTAResponse<EventVO>>,
  ): Promise<void> {
    const otaResponse = new OTAResponse<EventVO>();

    try {
      const eventList = await EventService.selectAllEventList();
      otaResponse.result = eventList;
      otaResponse.mappingData(EventVO);
      otaResponse.success = true;
      response.status(200).json(otaResponse);
    } catch (error) {
      console.error(error);
      otaResponse.success = false;
      otaResponse.message = error.message;
      response.status(500).json(otaResponse);
    }
  }
  protected doPost(
    request: NextApiRequest,
    response: NextApiResponse<any>,
  ): Promise<any> {
    throw new Error('Method not implemented.');
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const controller = new EventController(req, res);
  await controller.service();
}
