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
export interface InsertOperatorParam {
  authorities?: string;
  userId: string;
  password: string;
  name: string;
  phoneNumber: string;
  mail: string;
}
export type UpdateOperatorParam = Partial<OperatorVO>;

export type DeleteOperatorParam = {
  id: number;
};

class OperatorService extends OTAService {
  async selectOperatorList({
    currentPage = 0,
    returnCount = 10,
  }: SelectOperatorListParam): Promise<User[]> {
    const result = await this.excuteQuery(
      `
      SELECT
        user.*,
        COUNT(log.ID) as LOG_COUNT
      FROM
        TB_USER user
      LEFT OUTER JOIN
        TB_USER_LOG log
      ON
        user.ID = log.USER_ID
      WHERE
        user.TYPE = 2
      AND
        user.IS_DELETED = 0
      GROUP BY user.ID
      ORDER BY user.ID ASC
      LIMIT ${returnCount}
      OFFSET ${currentPage * returnCount}
    `,
    );

    return result;
  }

  async selectOperatorByUserId({
    userId,
  }: SelectOperatorByUserIdParam): Promise<User> {
    const result = await this.excuteQuery(
      `
      SELECT
        *
      FROM
        TB_USER
      WHERE
        TYPE = 2
      AND
        IS_DELETED = 0
      AND
        USER_ID = ?
    `,
      [userId],
    );

    return result;
  }

  async selectOperatorCount(): Promise<number> {
    const result = await this.excuteQuery(
      `
        SELECT
          COUNT(*) as COUNT
        FROM
          TB_USER
        WHERE
          TYPE = 2
        AND
          IS_DELETED = 0
    `,
    );

    return result[0].COUNT;
  }

  async insertOperator(param: InsertOperatorParam): Promise<number> {
    const result = await this.excuteQuery(`
      INSERT INTO TB_USER(
          ROOM_ID,
          EVENT_ID,
          AUTHORITIES,
          USER_ID,
          PASSWORD,
          NAME,
          PHONE_NUMBER,
          EMAIL,
          TYPE,
          STATUS
      ) VALUES (
          0,
          0,
          ${param.authorities ? `'${param.authorities}'` : null},
          '${param.userId}',
          '${param.password}',
          '${param.name}',
          '${param.phoneNumber}',
          '${param.mail}',
          2,
          1
      )
    `);

    return result.affectedRows;
  }

  async updateOperator(param: UpdateOperatorParam): Promise<number> {
    const id = _.cloneDeep(param).ID;
    delete param.ID;

    const stringParam = this.createWhereClause(param, ', ');

    const result = await this.excuteQuery(`
      UPDATE
        TB_USER
      SET
        ${stringParam},
        DATE_OF_MODIFIED = NOW()
      WHERE
        ID = ${id}
    `);

    return result.affectedRows;
  }

  async deleteOperator(param: DeleteOperatorParam): Promise<number> {
    const result = await this.excuteQuery(`
      UPDATE
        TB_USER
      SET
        IS_DELETED = 1,
        DATE_OF_DELETED = NOW()
      WHERE
        ID = ${param.id}
    `);

    return result.affectedRows;
  }
}

export default new OperatorService();
