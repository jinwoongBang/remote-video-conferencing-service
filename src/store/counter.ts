import { atom, selector } from 'recoil';

const counterState = atom({
  key: 'couterState', // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
});

export const incrementCount = selector({
  key: 'incrementCount',
  get: ({ get }) => get(counterState),
  set: ({ set }) => set(counterState, (currCount) => currCount + 2),
});

export const decrementCount = selector({
  key: 'decrementCount',
  get: ({ get }) => get(counterState),
  set: ({ set }) => set(counterState, (currCount) => currCount - 1),
});

export default counterState;
