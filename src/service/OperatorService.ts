import OTAService from 'src/service/OTAService';
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
  async insertOperator(param: InsertOperatorParam) {
    let conn;
    let resultCount = 0;
    let error;

    try {
      conn = await this.getConnection();
      const queryResult = await conn.query(`
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
            '${param.authorities}',
            '${param.userId}',
            '${param.password}',
            '${param.name}',
            '${param.phoneNumber}',
            '${param.mail}',
            2
        )
      `);
      resultCount = queryResult.affectedRows;
    } catch (e) {
      console.error(e);
      error = e;
    } finally {
      conn && (await conn.release());
    }

    if (error) throw new Error(error.message);

    return resultCount;
  }
}

export default new OperatorService();
