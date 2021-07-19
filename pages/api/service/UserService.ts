/**
 * db
 */
import connectionPool from 'database';
import UserVO from 'src/vo/UserVO';

class UserService {
  async selectUser() {
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
