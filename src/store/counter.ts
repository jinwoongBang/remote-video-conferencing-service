import { atom } from 'recoil';

const counterState = atom({
  key: 'couterState', // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
});

export default counterState;
