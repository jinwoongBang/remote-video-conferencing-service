/**
 * db
 */
import connectionPool from 'src/db';

abstract class OTAService {
  protected async getConnection() {
    return await connectionPool.getConnection();
  }

  protected async excuteQuery(query: string) {
    let error;
    let conn;
    let result;

    try {
      conn = await this.getConnection();
      result = conn.query(query);
    } catch (e) {
      console.error(e);
      error = e;
    } finally {
      conn && (await conn.release());
    }

    if (error) throw error;

    return result;
  }
}

export default OTAService;
