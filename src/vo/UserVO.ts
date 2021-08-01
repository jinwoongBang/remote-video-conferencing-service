class UserVO {
  userName: string;
  userPassword: string;
  userId: string;
  status: number;
  event: String;
  phone: String;
  email: String;
  job: String;
  belongTo: String;
  isUsedRecipt: String;
  nationality: null | String;
  licenseNumber: null | String;
  specialListNumber: null | String;
  societyRrequest: null | String;
  depositAmount: null | String;

  constructor(data: any) {
    this.userName = data.userName;
    this.userPassword = data.userPassword;
    this.userId = data.userId;
    this.status = data.status;
    this.event = data.event;
    this.phone = data.phone;
    this.email = data.email;
    this.job = data.job;
    this.belongTo = data.belongTo;
    this.isUsedRecipt = data.isUsedRecipt;
    this.nationality = data.nationality;
    this.licenseNumber = data.licenseNumber;
    this.specialListNumber = data.specialListNumber;
    this.societyRrequest = data.societyRrequest;
    this.depositAmount = data.depositAmount;
  }
}

export default UserVO;
