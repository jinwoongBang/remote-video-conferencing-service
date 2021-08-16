/**
 * db
 */
import connectionPool from 'src/db';

class OTAService {
  async getConnection() {
    return await connectionPool.getConnection();
  }
}

export default OTAService;
