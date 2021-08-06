/**
 * db
 */
import connectionPool from 'src/db';
import { PreferenceVO } from 'src/vo';

class PreferenceService {
  async selectPreferenceListByGroupKey({ preferenceKey }: PreferenceVO) {
    const conn = await connectionPool.getConnection();
    const rows = await conn.query(`
      SELECT
        *
      FROM
        TB_PREFERENCE
      WHERE
        PREFERENCE_KEY = '${preferenceKey}'
    `);
    const row = rows[0];

    const preference = new PreferenceVO(row);

    const result = JSON.parse(JSON.stringify(preference));

    await conn.release();

    return result;
  }
}
