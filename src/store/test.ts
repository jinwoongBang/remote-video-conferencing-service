import { atom, selector } from 'recoil';

export const tempFahrenheit = atom({
  key: 'tempFahrenheit',
  default: 32,
});

export const tempCelsius = selector({
  key: 'tempCelsius',
  get: ({ get }) => ((get(tempFahrenheit) - 32) * 5) / 9,
  set: async ({ set }, newValue: any) => {
    console.log(newValue);
  },
});
