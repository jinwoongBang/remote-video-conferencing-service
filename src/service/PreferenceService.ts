/**
 * db
 */
import connectionPool from 'src/db';
import { PreferenceVO } from 'src/vo';

class PreferenceService {
  async selectPreferenceListByGroupKey({
    preferenceKey,
  }: {
    preferenceKey: string;
  }) {
    const conn = await connectionPool.getConnection();
    const groupPreferenceList: PreferenceVO[] = await conn.query(`
      SELECT
        *
      FROM
        TB_PREFERENCE
      WHERE
        PREFERENCE_KEY = '${preferenceKey}'
    `);
    const groupId = groupPreferenceList[0].ID;

    const groupList = await conn.query(`
      SELECT
        *
      FROM
        TB_PREFERENCE
      WHERE
        PID = '${groupId}'
    `);

    const preferenceList: PreferenceVO[] = groupList.map((data: any) =>
      Object.assign(data, new PreferenceVO()),
    );

    const result = JSON.parse(JSON.stringify(preferenceList));

    await conn.release();

    return result;
  }
}

export default new PreferenceService();
