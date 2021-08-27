import OTAService from 'src/common/framework/OTAService';
import { User } from 'src/vo';

export interface SelectOperatorParam {
  currentPage: number;
  returnCount: number;
}
export interface InsertOperatorParam {
  authorities: string;
  userId: string;
  password: string;
  name: string;
  phoneNumber: string;
  mail: string;
}

class OperatorService extends OTAService {
  async selectOperator({
    currentPage = 0,
    returnCount = 10,
  }: SelectOperatorParam): Promise<User[]> {
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
      GROUP BY user.ID
      ORDER BY user.ID ASC
      LIMIT ${returnCount}
      OFFSET ${currentPage * returnCount};
    `,
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
}

export default new OperatorService();
