import OTAService from 'src/service/OTAService';
import { User } from 'src/vo';

class OperatorService extends OTAService {
  async insertOperator(param: User) {
    let conn;
    let resultCount = 0;

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
            ${param.AUTHORITIES},
            ${param.USER_ID},
            ${param.PASSWORD},
            ${param.NAME},
            ${param.PHONE_NUMBER},
            ${param.EMAIL},
            2
        )
      `);
      resultCount = queryResult.affectedRows;
    } catch (error) {
      console.error(error);
    } finally {
      conn && (await conn.release());
    }

    return resultCount;
  }
}

export default new OperatorService();
