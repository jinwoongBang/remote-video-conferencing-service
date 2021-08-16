/**
 * db
 */
import connectionPool from 'src/db';

class OTAService {
  protected async getConnection() {
    return await connectionPool.getConnection();
  }
}

export default OTAService;
