/**
 * db
 */
import connectionPool from 'src/db';
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
    const rows = await conn.query(
      `SELECT * FROM TB_USER WHERE USER_ID = '${userId}' AND PASSWORD = '${userPassword}'`,
    ); // 쿼리 실행
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

  async insertUser() {
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
}

export default new UserService();
