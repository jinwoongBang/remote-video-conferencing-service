import * as _ from 'lodash';
import OTAService from 'src/common/framework/OTAService';
import EventVO, { EventOption } from 'src/vo/EventVO';
import { InsertEventParam } from 'src/service/event/type';
import PreferenceService from '../PreferenceService';

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
    const eventOption = _.cloneDeep(param).OPTION_LIST;
    delete param.OPTION_LIST;

    const columns = this.createInsertColumn(param);
    const questionMarks = this.createInsertValuesByQuestionMark(param);
    const tableName = 'TB_EVENT';
    const params = Object.values(param);

    const query = `INSERT INTO ${tableName} (${columns}) VALUES (${questionMarks})`;

    const result = await this.excuteQuery(query, params);

    return result.affectedRows;
  }
}

export default new EventService();
