import { atom, selector } from 'recoil';
import HttpClient from 'src/common/framework/HttpClient';
import OTAResponse from 'src/common/framework/OTAResponse';
import UserVO from '../vo/UserVO';

interface Auth {
  user: null | UserVO;
}

const authState = atom<Auth>({
  key: 'authState', // unique ID (with respect to other atoms/selectors)
  default: {
    user: new UserVO({
      userId: 'test',
      userName: 'test',
      userPassword: 'test',
    }),
    // user: null,
  }, // default value (aka initial value)
});

export const handleAuthentication = selector({
  key: 'handleAuthentication',
  get: async ({ get }) => {
    console.log('handleAuthentication() :: invoked');
    const { user } = get(authState);
    console.log({ auth: user });
    const id = user?.userId;
    const password = user?.userPassword;
    const body = {
      id,
      password,
    };
    const response = await HttpClient.post('/auth', body);
    const data: OTAResponse<UserVO> = await response.data;

    return data.success;
  },
});

export default authState;
