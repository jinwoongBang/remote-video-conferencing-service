import OTAService from 'src/service/OTAService';
import { User } from 'src/vo';

class OperatorService extends OTAService {
  async insertOperator(user: User) {
    let conn;
    try {
      conn = await this.getConnection();
      conn.query(``);
    } catch (error) {
    } finally {
      conn && (await conn.release());
    }
  }
}

export default new OperatorService();
