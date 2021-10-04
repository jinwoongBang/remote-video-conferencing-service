/**
 * db
 */
import OTAService from 'src/common/framework/OTAService';
import connectionPool from 'src/db';
import { UserSearch } from 'src/store/user';
import { reqUser } from 'src/vo';
import UserVO from 'src/vo/UserVO';

type SelectUserProps = {
  id: string;
  password: string;
};
class UserService extends OTAService {
  async selectUserList(query?: UserSearch) {
    const conn = await connectionPool.getConnection();
    let queryName = '';
    if (query?.name != null && query.name != '') {
      queryName = `AND NAME LIKE '%${query?.name ?? ''}%'`;
    }

    let queryPhoneNumber = '';
    if (query?.phoneNumber != null && query.phoneNumber != '') {
      queryName = `AND PHONE_NUMBER LIKE '%${query?.phoneNumber ?? ''}%'`;
    }

    let queryEventCode = '';
    if (query?.eventCode != null && query.eventCode != '') {
      queryName = `AND NAME EVENT_ID '%${query?.eventCode ?? ''}%'`;
    }

    let queryEventName = '';
    if (query?.eventName != null && query.eventName != '') {
      queryName = `AND NAME EVENT_ID '%${query?.eventName ?? ''}%'`;
    }

    console.log('queryName: ', queryName);

    const rows = await conn.query(`
      SELECT
        * 
      FROM 
        TB_USER
      WHERE
        USER_ID LIKE '%${query?.userId ?? ''}%' 
        ${queryName}  
        ${queryPhoneNumber}  
        ${queryEventCode}  
        ${queryEventName}  
      `);
    let userList2: UserVO[] = rows;
    console.log('selectUserList:: ', userList2);
    await conn.release();

    return JSON.parse(JSON.stringify(userList2));
  }

  async selectUser({ userId, userPassword }: UserVO) {
    const conn = await connectionPool.getConnection();
    const rows = await conn.query(`
      SELECT
        *
      FROM
        TB_USER
      WHERE
        USER_ID = '${userId}'
      AND
        PASSWORD = '${userPassword}'
      `);
    const row = rows[0];

    // const user = new UserVO({
    //   userName: row.NAME,
    //   userId: row.USER_ID,
    //   userPassword: row.PASSWORD,
    // });

    // const result = JSON.parse(JSON.stringify(user));

    await conn.release();

    return row;
  }

  async selectUserIdCheck(userId: String) {
    console.log('selectUserIdCheck userId: ' + userId);
    const conn = await connectionPool.getConnection();
    const rows = await conn.query(
      `SELECT * FROM TB_USER WHERE USER_ID = '${userId}'`,
    ); // 쿼리 실행
    const row = rows[0];
    let check = true;
    if (row) {
      check = false;
    } else {
      check = true;
    }

    await conn.release();

    return check;
  }

  async insertUser(req: reqUser) {
    const conn = await connectionPool.getConnection();
    const rows = await conn.query(
      `INSERT INTO TB_USER(ROOM_ID, EVENT_ID, AUTHORITIES, USER_ID, PASSWORD, NAME, STATUS, PHONE_NUMBER, EMAIL, JOB, BELONG_TO, IS_USED_RECEIPT, NATIONALITY, LICENSE_NUMBER, SPECIALIST_NUMBER, SOCIETY_REQUEST, DEPOSIT_AMOUNT)` +
        `VALUES (0, ${req.event}, 'user', '${req.userId}', '${req.userPassword}', '${req.userName}', ${req.status}, '${req.phone}', '${req.email}', '${req.job}', '${req.belongTo}', ${req.isUsedRecipt}, '${req.nationality}', ${req.licenseNumber}, '${req.specialListNumber}', '${req.societyRrequest}', ${req.depositAmount})`,
    ); // 쿼리 실행
    const row = rows[0];
    console.log('row: ' + row);
    await conn.release();

    return null;
  }

  async inserExcelUser(params: { [key: string]: any }[]) {
    return this.excuteMultiInsertQuery('TB_USER', params);
  }
}

export default new UserService();
