import * as _ from 'lodash';
import OTAService from 'src/common/framework/OTAService';
import EventVO from 'src/vo/EventVO';
import {
  InsertEventOptionParam,
  SelectEventOptionListByEventIdListParam,
} from 'src/service/eventOption/type';
import PreferenceService from '../PreferenceService';
import EventOptionVO, { EventOption } from 'src/vo/EventOptionVO';

class EventOptionService extends OTAService {
  async selectEventOptionListByEventId(
    param: SelectEventOptionListByEventIdListParam,
  ): Promise<EventOption[]> {
    const { eventIdList } = param;
    if (eventIdList.length === 0)
      throw new Error('이벤트 아이디 리스트가 필요합니다.');

    const questionMarks = eventIdList.reduce(
      (acc, currentValue, currentIndex) => {
        const isFirst = currentIndex === 0;
        return isFirst ? '?' : acc + ', ?';
      },
      '',
    );

    const query = `
      SELECT
        *
      FROM
        TB_EVENT_OPTION
      WHERE
        EVENT_ID IN (${questionMarks})
    `;

    const eventOptionList = await this.excuteQuery(query, eventIdList);

    return eventOptionList;
  }

  async insertEventOptionList(param: InsertEventOptionParam): Promise<any> {
    let rows = 0;

    param.forEach(async (item, index) => {
      const columns = this.createInsertColumn(item);
      const questionMarks = this.createInsertValuesByQuestionMark(item);
      const values = Object.values(item);
      const query = `INSERT TB_EVENT_OPTION (${columns}) VALUES (${questionMarks})`;
      const result = await this.excuteQuery(query, values);
      rows += result.affectedRows;
    });

    return rows;
  }
}

export default new EventOptionService();
