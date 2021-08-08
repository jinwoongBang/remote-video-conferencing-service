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
  }): Promise<PreferenceVO[]> {
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
    console.log({ groupId });

    const groupList = await conn.query(`
      SELECT
        *
      FROM
        TB_PREFERENCE
      WHERE
        PID = '${groupId}'
    `);

    const preferenceList: PreferenceVO[] = groupList.map((data: any) =>
      Object.assign(new PreferenceVO(), data),
    );

    const result = JSON.parse(JSON.stringify(preferenceList));

    await conn.release();

    return result;
  }

  async insertSiteInformation(preferenceList: PreferenceVO[]): Promise<number> {
    const conn = await connectionPool.getConnection();

    let resultCount = 0;

    preferenceList.forEach(async (preference) => {
      try {
        await conn.query(`
          UPDATE
            TB_PREFERENCE
          SET
            PREFERENCE_VALUE = '${preference.PREFERENCE_VALUE}'
          WHERE
            PREFERENCE_KEY = '${preference.PREFERENCE_KEY}'
        `);
        resultCount += 1;
      } catch (e) {
        console.error(e);
      }
    });

    const result = JSON.parse(JSON.stringify(resultCount));

    await conn.release();

    return result;
  }
}

export default new PreferenceService();
