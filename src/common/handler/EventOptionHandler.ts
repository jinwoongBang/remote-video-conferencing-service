import * as _ from 'lodash';

import EventVO, { EventOption } from 'src/vo/EventVO';
import EventOptionService from 'src/service/eventOption';
import EventOptionVO from 'src/vo/EventOptionVO';

interface EventOptionHandlerProps {
  eventList: EventVO[];
}

class EventOptionHandler {
  private eventList: EventVO[];
  private eventIdList: number[];

  constructor({ eventList }: EventOptionHandlerProps) {
    this.eventList = _.cloneDeep(eventList);
    this.eventIdList = eventList.map((item) => item.ID);
  }

  private async getEventOptions() {
    const eventOptionList =
      await EventOptionService.selectEventOptionListByEventId({
        eventIdList: this.eventIdList,
      });

    return eventOptionList;
  }

  public async addEventOptions() {
    const eventOptionList = await this.getEventOptions();

    this.eventList.forEach((item) => {
      const eventId = item.ID;
      const optionList = eventOptionList.filter(
        ({ EVENT_ID }) => EVENT_ID === eventId,
      );

      const options: EventOption = {};

      optionList.forEach((option) => {
        const key = option.OPTION_KEY;
        const value = option.IS_USED === 1;
        options[key] = value;
      });

      item.OPTION_LIST = options;

      return item;
    });

    return this;
  }

  public getEventListInstance() {
    return _.cloneDeep(this.eventList);
  }
}

export default EventOptionHandler;
