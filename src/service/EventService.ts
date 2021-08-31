import * as _ from 'lodash';
import OTAService from 'src/common/framework/OTAService';
import EventVO from 'src/vo/EventVO';

export interface SelectOperatorListParam {
  currentPage: number;
  returnCount: number;
}

class EventService extends OTAService {
  async selectAllEventList(): Promise<EventVO[]> {
    const result = await this.excuteQuery(`
      SELECT
        *
      FROM
        TB_EVENT
    `);

    return result;
  }
}

export default new EventService();
