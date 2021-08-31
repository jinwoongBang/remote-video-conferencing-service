/**
 * db
 */
import OTAService from 'src/common/framework/OTAService';
import connectionPool from 'src/db';
import { AuthorityVO } from 'src/vo';

class AuthorityService extends OTAService {
  async selectAuthorityListByKeys({
    authorityKeys,
  }: {
    authorityKeys: string[];
  }): Promise<AuthorityVO[]> {
    const list = await this.excuteQuery(`
      SELECT
        *
      FROM
        TB_AUTHORITY
      WHERE
        AUTHORITY_KEY in (${authorityKeys
          .map((authorityKey) => `'${authorityKey}'`)
          .join(',')})
  `);

    return list;
  }

  async selectAuthorityListByParents({
    authorityKeys,
  }: {
    authorityKeys: string[];
  }): Promise<AuthorityVO[]> {
    const list = await this.excuteQuery(`
      SELECT
        *
      FROM
        TB_AUTHORITY
      WHERE
        PID IN (
          SELECT
            ID
          FROM
            TB_AUTHORITY
          WHERE
            AUTHORITY_KEY in (${authorityKeys
              .map((authorityKey) => `'${authorityKey}'`)
              .join(',')})
        )
  `);

    return list;
  }
}

export default new AuthorityService();
