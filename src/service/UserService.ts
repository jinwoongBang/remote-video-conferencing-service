/**
 * db
 */
import connectionPool from 'src/db';
import { reqUser } from 'src/vo';
import UserVO from 'src/vo/UserVO';

type SelectUserProps = {
  id: string;
  password: string;
};
class UserService {
  async selectUserList() {
    const conn = await connectionPool.getConnection();
    const rows = await conn.query('SELECT * FROM TB_USER'); // 쿼리 실행
    const row = rows[0];

    const user = new UserVO({
      userName: row.AUTHORITIES,
      userId: row.USER_ID,
      userPassword: row.PASSWORD,
    });

    let userList: UserVO[] = [user];
    userList = JSON.parse(JSON.stringify(userList));

    await conn.release();

    return userList;
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

    const user = new UserVO({
      userName: row.NAME,
      userId: row.USER_ID,
      userPassword: row.PASSWORD,
    });

    const result = JSON.parse(JSON.stringify(user));

    await conn.release();

    return result;
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
}

export default new UserService();
