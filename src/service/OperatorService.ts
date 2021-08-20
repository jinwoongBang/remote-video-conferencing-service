import OTAService from 'src/common/framework/OTAService';
import { User } from 'src/vo';

export interface InsertOperatorParam {
  authorities: string;
  userId: string;
  password: string;
  name: string;
  phoneNumber: string;
  mail: string;
}

class OperatorService extends OTAService {
  async selectOperator(): Promise<User[]> {
    const result = await this.excuteQuery(`
      SELECT
        *
      FROM
        TB_USER
      WHERE
        TYPE = 2
      AND
        STATUS = 1;
    `);

    return result;
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
          TYPE
      ) VALUES (
          0,
          0,
          ${param.authorities ? `'${param.authorities}'` : null},
          '${param.userId}',
          '${param.password}',
          '${param.name}',
          '${param.phoneNumber}',
          '${param.mail}',
          2
      )
    `);

    return result.affectedRows;
  }
}

export default new OperatorService();
