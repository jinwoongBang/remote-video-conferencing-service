// import { AxiosResponse } from 'axios';
import { AxiosResponse } from 'axios';
import { atom, selector, selectorFamily } from 'recoil';
import * as _ from 'lodash';

/**
 * Common
 */
import HttpClient from 'src/common/framework/HttpClient';
import OTAResponse from 'src/common/framework/OTAResponse';

import { IExcel } from 'src/vo/ExcelVO';

export const forceReloadExcelListState = atom({
  key: 'forceReloadExcelListState',
  default: 0,
});

export const excelListSelector = selector({
  key: 'excelListSelector',
  get: async ({ get }) => {
    get(forceReloadExcelListState);
    const { data, status }: AxiosResponse<OTAResponse<IExcel>> =
      await HttpClient.get('/excel', {});

    console.log('-----data: ', data);
    console.log('-----status: ', status);

    return data;
  },
  set: ({ set }) => {
    set(forceReloadExcelListState, Math.random());
  },
});
