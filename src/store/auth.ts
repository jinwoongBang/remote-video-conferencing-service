import { atom, selector } from 'recoil';
import HttpClient from 'src/common/framework/HttpClient';
import UserVO from '../vo/UserVO';

interface Auth {
  user: null | UserVO;
}

const authState = atom<Auth>({
  key: 'authState', // unique ID (with respect to other atoms/selectors)
  default: {
    user: null,
  }, // default value (aka initial value)
});

export const getCurrentUser = selector({
  key: 'CurrentUserName',
  get: async ({ get }) => {
    const response = await HttpClient.get('/user');
    console.log({ CurrentUserName: response });
    const data = await response.data;
    // const response = await fetch('http://localhost:3000/api/user');
    // const result = await response.json();

    return data;
  },
});

export default authState;
