import { atom, selector, selectorFamily } from 'recoil';
import HttpClient from 'src/common/framework/HttpClient';
import OTAResponse from 'src/common/framework/OTAResponse';
import UserVO from '../vo/UserVO';

export interface Auth {
  isLoggedIn: boolean;
  user: null | UserVO;
}

const authState = atom<Auth>({
  key: 'authState',
  default: {
    isLoggedIn: false,
    user: null,
  },
});

export const handleAuthentication = selector({
  key: 'handleAuthentication',
  get: async ({ get }) => {
    console.log('handleAuthentication() get :: invoked');
    let data: OTAResponse<UserVO>;
    try {
      const response = await HttpClient.get('/auth');
      data = await response.data;
      console.log({ handleAuthentication: data });
    } catch (error) {
      console.error(error);
      return null;
    }

    return data.result[0];
  },
  set: async ({ set }, value) => {
    console.log(`handleAuthentication() get :: invoked :: ${value}`);
  },
});

export default authState;
