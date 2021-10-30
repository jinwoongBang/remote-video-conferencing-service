import * as _ from 'lodash';
import OTAService from 'src/common/framework/OTAService';
import EventVO, { EventOption } from 'src/vo/EventVO';
import {
  InsertEventParam,
  SelectEventListParam,
  SelectOneEventParam,
} from 'src/service/event/type';
import EventOptionService from 'src/service/eventOption';
import EventOptionVO from 'src/vo/EventOptionVO';
import PreferenceService from '../PreferenceService';
import { PreferenceGroupKey } from 'src/common/enum/preference';

class EventService extends OTAService {
  async selectAllEventList(param?: SelectEventListParam): Promise<EventVO[]> {
    const paramList = param ? param.getParamList() : [];
    const query = this.getSelectAllEventListQuery(param);

    const result = await this.excuteQuery(query, paramList);

    return result;
  }

  async selectOneEvent(param: SelectOneEventParam): Promise<EventVO> {
    const { id } = param;

    const result = await this.excuteQuery(
      `
      SELECT
        event.*,
        server.NAME AS SERVER_NAME,
        COUNT(user.EVENT_ID) as USER_COUNT
      FROM
        TB_EVENT event
      LEFT OUTER JOIN
        TB_SERVER server
      ON
        server.ID = event.SERVER_ID
      LEFT OUTER JOIN 
	      TB_USER user
      ON
        user.EVENT_ID = event.CODE
      WHERE
      event.ID = ?
      GROUP BY event.ID
    `,
      [id],
    );

    return result[0];
  }

  async selectAllEventIdList(): Promise<number[]> {
    const result = await this.excuteQuery(`
      SELECT
        ID
      FROM
        TB_EVENT
    `);
    return result;
  }

  async selectAllEventCount(param: SelectEventListParam): Promise<number> {
    const result = await this.excuteQuery(
      `
        SELECT
          COUNT(*) as COUNT
        FROM
          TB_EVENT
        WHERE
          1 = 1
        ${param.fromDate ? `AND DATE_OF_START >= ?` : ''}
        ${param.toDate ? `AND DATE_OF_START <= ?` : ''}
        ${param.status < 2 ? 'AND STATUS = ?' : ''}
        ${param.code ? 'AND CODE = ?' : ''}
        ${param.title ? `AND TITLE LIKE ?` : ''}
      `,
      param.getParamList(),
    );

    return result[0].COUNT;
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

  private getSelectAllEventListQuery(param?: SelectEventListParam) {
    const baseQuery = `
      SELECT
        event.*,
        server.NAME AS SERVER_NAME,
        COUNT(user.EVENT_ID) as USER_COUNT
      FROM
        TB_EVENT event
      LEFT OUTER JOIN
        TB_SERVER server
      ON
        server.ID = event.SERVER_ID
      LEFT OUTER JOIN 
        TB_USER user
      ON
        user.EVENT_ID = event.CODE
    `;

    const queryWithParam = `
      ${baseQuery}
      WHERE
        1 = 1
      ${param?.fromDate ? `AND event.DATE_OF_START >= ?` : ''}
      ${param?.toDate ? `AND event.DATE_OF_START <= ?` : ''}
      ${param && param.status < 2 ? 'AND event.STATUS = ?' : ''}
      ${param?.code ? 'AND event.CODE = ?' : ''}
      ${param?.title ? `AND event.TITLE LIKE ?` : ''}
      GROUP BY event.ID
      ORDER BY ID ASC
      LIMIT ?
      OFFSET ?
    `;

    const queryWithoutParam = `
      ${baseQuery}
      GROUP BY event.ID
      ORDER BY ID ASC
    `;

    return param ? queryWithParam : queryWithoutParam;
  }
}

export default new EventService();
