/**
 * db
 */
import connectionPool from 'src/db';
import { AuthorityVO } from 'src/vo';

class AuthorityService {
  async selectAuthorityListByKeys({
    authorityKeys,
  }: {
    authorityKeys: string[];
  }): Promise<AuthorityVO[]> {
    const conn = await connectionPool.getConnection();

    let authorityList: AuthorityVO[] = [];

    try {
      const list: AuthorityVO[] = await conn.query(`
      SELECT
        *
      FROM
        TB_AUTHORITY
      WHERE
        AUTHORITY_KEY in (${authorityKeys
          .map((authorityKey) => `'${authorityKey}'`)
          .join(',')})
    `);

      authorityList = list.map((data: any) =>
        Object.assign(new AuthorityVO(), data),
      );
    } catch (e) {
      console.error(e);
    } finally {
      await conn.release();
    }

    return JSON.parse(JSON.stringify(authorityList));
  }
}

export default new AuthorityService();
