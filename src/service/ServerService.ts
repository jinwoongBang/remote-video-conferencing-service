import * as _ from 'lodash';
import OTAService from 'src/common/framework/OTAService';
import ServerVO from 'src/vo/ServerVO';

class ServerService extends OTAService {
  async selectAllServerList(): Promise<ServerVO[]> {
    const result = await this.excuteQuery(
      `
      SELECT
        *
      FROM
        TB_SERVER
    `,
    );

    return result;
  }
}

export default new ServerService();
