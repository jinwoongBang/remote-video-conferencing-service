class UserVO {
  userName: string;
  userPassword: string;
  userId: string;

  constructor(data: any) {
    this.userName = data.userName;
    this.userPassword = data.userPassword;
    this.userId = data.userId;
  }
}

export default UserVO;
