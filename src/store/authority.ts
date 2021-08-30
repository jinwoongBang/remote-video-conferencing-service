import { atom, selector, selectorFamily } from 'recoil';
import { AuthorityVO } from 'src/vo';

export const authorityState = atom<AuthorityVO[]>({
  key: 'authorityState',
  default: [],
});
