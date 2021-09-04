import * as _ from 'lodash';
import OTAService from 'src/common/framework/OTAService';
import { User } from 'src/vo';
import OperatorVO from 'src/vo/OperatorVO';

export interface SelectOperatorListParam {
  currentPage: number;
  returnCount: number;
}
export interface SelectOperatorByUserIdParam {
  userId: string;
}
export type InsertOperatorParam = Partial<OperatorVO>;

export type UpdateOperatorParam = Partial<OperatorVO>;

export type DeleteOperatorParam = {
  id: number;
};

class OperatorService extends OTAService {
  async selectEventManagerList({
    currentPage = 0,
    returnCount = 10,
  }: SelectOperatorListParam): Promise<User[]> {
    const result = await this.excuteQuery(`
      SELECT
        user.*
      FROM
        TB_USER user
      INNER JOIN
        TB_EVENT event
      ON
        user.EVENT_ID = event.ID
      WHERE
        user.TYPE = 1
      AND
        user.IS_DELETED = 0
      GROUP BY user.ID
      ORDER BY user.ID ASC
      LIMIT ?
      OFFSET ?
    `);
    // const result = await this.excuteQuery(`
    //   SELECT
    //     user.*
    //   FROM
    //     TB_USER user
    //   INNER JOIN
    //     TB_EVENT event
    //   ON
    //     user.EVENT_ID = event.ID
    //   WHERE
    //     user.TYPE = 1
    //   AND
    //     user.IS_DELETED = 0
    //   GROUP BY user.ID
    //   ORDER BY user.ID ASC
    //   LIMIT ${returnCount}
    //   OFFSET ${currentPage * returnCount}
    // `);

    return result;
  }
}

export default new OperatorService();
