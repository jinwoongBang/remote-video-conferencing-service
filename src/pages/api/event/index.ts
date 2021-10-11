import { NextApiRequest, NextApiResponse } from 'next';
import OTAController from 'src/common/framework/OTAController';
import OTAResponse from 'src/common/framework/OTAResponse';
import EventService from 'src/service/event';
import EventOptionService from 'src/service/eventOption';
import EventVO, { EventOption } from 'src/vo/EventVO';
import ExcuteVO from 'src/vo/ExcuteVO';
import { EventGetParam, EventPostParam } from 'src/pages/api/event/type';

class EventController extends OTAController {
  protected async doGet(
    request: NextApiRequest,
    response: NextApiResponse<OTAResponse<EventVO>>,
  ): Promise<void> {
    const otaResponse = new OTAResponse<EventVO>();

    const queryParam = request.query as EventGetParam;
    const returnCount = Number(queryParam.returnCount);
    const currentPage = Number(queryParam.currentPage);

    const param = {
      returnCount,
      currentPage,
    };

    try {
      const totalEventCount = await EventService.selectAllEventCount();
      const eventList = await EventService.selectAllEventList(param);
      const eventIdList = eventList.map((item) => item.ID);
      const eventOptionList =
        await EventOptionService.selectEventOptionListByEventId({
          eventIdList,
        });

      eventList.forEach((item) => {
        const eventId = item.ID;
        const optionList = eventOptionList.filter(
          ({ EVENT_ID }) => EVENT_ID === eventId,
        );

        const options: EventOption = {};

        optionList.forEach((option) => {
          const key = option.OPTION_KEY;
          const isUsed = (option.IS_USED || 0) === 1;
          options[key] = isUsed;
        });

        item.OPTION_LIST = options;

        return item;
      });

      otaResponse.result = eventList;
      otaResponse.mappingData(EventVO);
      otaResponse.success = true;

      otaResponse.setPagination(currentPage, totalEventCount, returnCount);
      response.status(200).json(otaResponse);
    } catch (e) {
      const error = e as Error;
      console.error(error);
      otaResponse.success = false;
      otaResponse.message = error.message;
      response.status(500).json(otaResponse);
    }
  }

  protected async doPost(
    request: NextApiRequest,
    response: NextApiResponse<OTAResponse<ExcuteVO>>,
  ): Promise<void> {
    const otaResponse = new OTAResponse<ExcuteVO>();

    try {
      const { event }: EventPostParam = request.body;
      const resultCount = await EventService.insertEvent(event);
      const isSuccess = resultCount === 1;
      const result: ExcuteVO[] = new Array(resultCount).fill(
        new ExcuteVO('CREATED'),
      );
      otaResponse.result = result;
      otaResponse.success = isSuccess;
      response.status(200).json(otaResponse);
    } catch (e) {
      const error = e as Error;
      console.error(error);
      otaResponse.success = false;
      otaResponse.message = error.message;
      response.status(500).json(otaResponse);
    }
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
