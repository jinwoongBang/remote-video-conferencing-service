import OTAService from 'src/common/framework/OTAService';
import { User } from 'src/vo';

export interface InsertUserLogParam {
  userId: number;
  accessToken: string;
  accessIp: string;
  accessEnv: string;
  message: string;
}
export interface UpdateUserLogParam {
  userId: number;
  status: number;
  message: string;
}
export interface SelectUserLogParam {}
class UserLogService extends OTAService {
  async insertUserLog(param: InsertUserLogParam): Promise<number> {
    const result = await this.excuteQuery(
      `
      INSERT INTO TB_USER_LOG(
          USER_ID,
          STATUS,
          ACCESS_TOKEN,
          ACCESS_IP,
          ACCESS_ENV,
          MESSAGE
      ) VALUES (
        ?,
        1,
        ?,
        ?,
        ?,
        ?
      )
      `,
      [
        param.userId,
        param.accessToken,
        param.accessIp,
        param.accessEnv,
        param.message,
      ],
    );

    return result.affectedRows;
  }
  // async updateUserLog(param: UpdateUserLogParam): Promise<number> {
  //   const result = await this.excuteQuery(`
  //     UPDATE
  //       TB_USER_LOG
  //     SET
  //       STATUS = ${param.status}
  //     WHERE
  //       ID = (
  //         SELECT
  //           ID
  //         FROM
  //           TB_USER_LOG
  //         WHERE
  //           USER_ID = ${param.userId}
  //         ORDER BY DATE_OF_CREATED DESC
  //       )
  //   `);

  //   return result.affectedRows;
  // }
}

export default new UserLogService();
