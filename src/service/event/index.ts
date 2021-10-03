import * as _ from 'lodash';
import OTAService from 'src/common/framework/OTAService';
import EventVO, { EventOption } from 'src/vo/EventVO';
import { InsertEventParam } from 'src/service/event/type';
import EventOptionService from 'src/service/eventOption';
import EventOptionVO from 'src/vo/EventOptionVO';
import PreferenceService from '../PreferenceService';
import { PreferenceGroupKey } from 'src/common/enum/preference';

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

  async insertEvent(param: InsertEventParam): Promise<any> {
    const event = _.cloneDeep(param);
    delete event.OPTION_LIST;

    const columns = this.createInsertColumn(event);
    const questionMarks = this.createInsertValuesByQuestionMark(event);
    const tableName = 'TB_EVENT';
    const params = Object.values(event);

    const query = `INSERT INTO ${tableName} (${columns}) VALUES (${questionMarks})`;

    const { affectedRows, insertId, warningStatus } = await this.excuteQuery(
      query,
      params,
    );

    const eventOptionParams = await this.createEventOptionParam({
      eventId: insertId,
      eventOptions: param.OPTION_LIST || {},
    });

    console.log(eventOptionParams);

    const optionResult = await EventOptionService.insertEventOptionList(
      eventOptionParams,
    );

    return affectedRows;
  }

  private async createEventOptionParam({
    eventId,
    eventOptions,
  }: {
    eventId: number;
    eventOptions: { [key: string]: boolean };
  }) {
    const preferenceByEventOptionList =
      await PreferenceService.selectPreferenceListByGroupKey({
        preferenceKey: PreferenceGroupKey.EventOptions,
      });
    const eventOptionList = preferenceByEventOptionList
      .filter(({ PREFERENCE_VALUE }) => String(PREFERENCE_VALUE) === '1')
      .map(({ PREFERENCE_KEY }) => {
        const isUsed = eventOptions[PREFERENCE_KEY];
        const result = {
          EVENT_ID: eventId,
          OPTION_KEY: PREFERENCE_KEY,
          IS_USED: isUsed ? 1 : 0,
        };
        return result;
      });

    return eventOptionList;
  }
}

export default new EventService();
