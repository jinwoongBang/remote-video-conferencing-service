import * as _ from 'lodash';
import OTAService from 'src/common/framework/OTAService';
import EventVO, { EventOption } from 'src/vo/EventVO';
import { InsertEventOptionParam } from 'src/service/eventOption/type';
import PreferenceService from '../PreferenceService';

class EventOptionService extends OTAService {
  async insertEventOptionList(param: InsertEventOptionParam): Promise<any> {
    let rows = 0;

    param.forEach(async (item, index) => {
      const columns = this.createInsertColumn(item);
      const questionMarks = this.createInsertValuesByQuestionMark(item);
      const values = Object.values(item);
      const query = `INSERT TB_EVENT_OPTION (${columns}) VALUES (${questionMarks})`;
      console.log(query);
      console.log(values);
      const result = await this.excuteQuery(
        `INSERT TB_EVENT_OPTION (${columns}) VALUES (${questionMarks});`,
        values,
      );
      rows += result.affectedRows;
    });

    return rows;
  }
}

export default new EventOptionService();
