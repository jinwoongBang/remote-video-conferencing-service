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

    let preferenceList = [];
    try {
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

      preferenceList = groupList.map((data: any) =>
        Object.assign(new PreferenceVO(), data),
      );
    } catch (e) {
      console.error(e);
    } finally {
      await conn.release();
    }

    const result = JSON.parse(JSON.stringify(preferenceList));

    return result;
  }

  async insertSiteInformation(preferenceList: PreferenceVO[]): Promise<number> {
    const conn = await connectionPool.getConnection();

    let resultCount = 0;

    preferenceList.forEach(async (preference, index) => {
      try {
        const queryResult = await conn.query(`
          UPDATE
            TB_PREFERENCE
          SET
            PREFERENCE_VALUE = "${preference.PREFERENCE_VALUE}"
          WHERE
            PREFERENCE_KEY = '${preference.PREFERENCE_KEY}'
        `);
        resultCount = resultCount + queryResult.affectedRows;
      } catch (e) {
        console.error(e);
      } finally {
        await conn.release();
      }
    });

    return resultCount;
  }
}

export default new PreferenceService();
