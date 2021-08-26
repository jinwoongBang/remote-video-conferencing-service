import { atom, selector, selectorFamily } from 'recoil';
import HttpClient from 'src/common/framework/HttpClient';
import OTAResponse from 'src/common/framework/OTAResponse';
import UserVO, { User } from '../vo/UserVO';

export interface Auth {
  isLoggedIn: boolean;
  user: null | User;
}

const authState = atom<Auth>({
  key: 'authState',
  default: {
    isLoggedIn: true,
    user: null,
  },
});

export const forcedReloadAuthenticationState = atom({
  key: 'forcedReloadAuthenticationState',
  default: 0,
});

export const authenticationSelector = selector<User | null>({
  key: 'authenticationSelector',
  get: async ({ get }) => {
    get(forcedReloadAuthenticationState);
    let data: OTAResponse<User>;

    try {
      const response = await HttpClient.get('/auth');
      data = await response.data;
    } catch (error) {
      console.error(error);

      return null;
    }

    return data.result[0];
  },
  set: ({ set }) => {
    set(forcedReloadAuthenticationState, Math.random());
  },
});

export default authState;
