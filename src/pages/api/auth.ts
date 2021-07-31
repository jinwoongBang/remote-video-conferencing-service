import OTAResponse from 'src/common/framework/OTAResponse';
import withSession from 'src/common/utils/session';
import UserVO from 'src/vo/UserVO';

export default withSession(async (req, res) => {
  const user: UserVO | undefined = req.session.get('user');
  // const user: UserVO = new UserVO({
  //   userId: 'test',
  //   userName: 'test',
  //   userPassword: 'test',
  // });

  const response = new OTAResponse<UserVO>();

  const isSuccess = Boolean(user);

  if (user) {
    res.statusCode = 200;
    response.result.push(user);
  } else {
    res.statusCode = 401;
    response.success = false;
    response.code = 401;
  }

  console.log(`withSession() API :: invoked :: ${isSuccess}`);

  res.send(response);
});
