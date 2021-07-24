import { atom, selector } from 'recoil';
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

export default authState;
