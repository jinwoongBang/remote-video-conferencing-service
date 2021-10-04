import * as _ from 'lodash';
import OTAService from 'src/common/framework/OTAService';
import { User } from 'src/vo';
import OperatorVO from 'src/vo/OperatorVO';

export interface SelectOperatorListParam {
  type: number;
  currentPage: number;
  returnCount: number;
}
export interface SelectOperatorCountParam {
  type: number;
}
export interface SelectOperatorByUserIdParam {
  userId: string;
}

export type InsertOperatorParam = Partial<OperatorVO>;

export type UpdateOperatorParam = Partial<OperatorVO>;

export type DeleteOperatorParam = {
  id: number;
};

class ExcelService extends OTAService {
  async insertExcelFile(param: { [key: string]: any }) {
    return this.excuteInsertQuery('TB_USER_EXCEL', param);
  }
}
export default new ExcelService();
// class OperatorService extends OTAService {
//   async selectOperatorList({
//     type = 2,
//     currentPage = 0,
//     returnCount = 10,
//   }: SelectOperatorListParam): Promise<
//     (User & { EVENT_TITLE?: string; EVENT_CODE?: string })[]
//   > {
//     const result = await this.excuteQuery(
//       `
//       SELECT
//         user.*,
//         event.TITLE AS EVENT_TITLE,
//         event.CODE AS EVENT_CODE,
//         COUNT(log.ID) as LOG_COUNT
//       FROM
//         TB_USER user
//       LEFT OUTER JOIN
//         TB_USER_LOG log
//       ON
//         user.ID = log.USER_ID
//       LEFT OUTER JOIN
//         TB_EVENT event
//       ON
//         user.EVENT_ID = event.ID
//       WHERE
//         user.TYPE = ?
//       AND
//         user.IS_DELETED = 0
//       GROUP BY user.ID
//       ORDER BY user.ID ASC
//       LIMIT ?
//       OFFSET ?
//     `,
//       [type, returnCount, currentPage * returnCount],
//     );

//     return result;
//   }

//   async selectOperatorByUserId({
//     userId,
//   }: SelectOperatorByUserIdParam): Promise<User> {
//     const result = await this.excuteQuery(
//       `
//       SELECT
//         *
//       FROM
//         TB_USER
//       WHERE
//         TYPE = 2
//       AND
//         IS_DELETED = 0
//       AND
//         USER_ID = ?
//     `,
//       [userId],
//     );

//     return result;
//   }

//   async selectOperatorCount({
//     type,
//   }: SelectOperatorCountParam): Promise<number> {
//     const result = await this.excuteQuery(
//       `
//         SELECT
//           COUNT(*) as COUNT
//         FROM
//           TB_USER
//         WHERE
//           TYPE = ?
//         AND
//           IS_DELETED = 0
//     `,
//       [type],
//     );

//     return result[0].COUNT;
//   }

//   async insertOperator(param: InsertOperatorParam): Promise<number> {
//     const columns = this.createInsertColumn(param);
//     const questionMarks = this.createInsertValuesByQuestionMark(param);
//     const query = `INSERT INTO TB_USER (${columns}) VALUES (${questionMarks})`;

//     const result = await this.excuteQuery(query, Object.values(param));

//     return result.affectedRows;
//   }

//   async updateOperator(param: UpdateOperatorParam): Promise<number> {
//     const id = _.cloneDeep(param).ID;
//     delete param.ID;

//     console.log(`updateOperator :: ${JSON.stringify(param)}`);

//     const stringParam = this.createWhereClause(param, ', ');
//     console.log(`updateOperator :: ${stringParam}`);

//     const result = await this.excuteQuery(`
//       UPDATE
//         TB_USER
//       SET
//         ${stringParam},
//         DATE_OF_MODIFIED = NOW()
//       WHERE
//         ID = ${id}
//     `);

//     return result.affectedRows;
//   }

//   async deleteOperator(param: DeleteOperatorParam): Promise<number> {
//     const result = await this.excuteQuery(`
//       UPDATE
//         TB_USER
//       SET
//         IS_DELETED = 1,
//         DATE_OF_DELETED = NOW()
//       WHERE
//         ID = ${param.id}
//     `);

//     return result.affectedRows;
//   }
// }

// export default new OperatorService();
