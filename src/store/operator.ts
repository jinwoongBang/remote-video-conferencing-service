import { AxiosResponse } from 'axios';
import { atom, selector, selectorFamily } from 'recoil';
import * as _ from 'lodash';

/**
 * Common
 */
import HttpClient from 'src/common/framework/HttpClient';
import OTAResponse from 'src/common/framework/OTAResponse';

/**
 * Service
 */
import { InsertOperatorParam } from 'src/service/OperatorService';

export type InsertOperatorProps = {
  isInit?: boolean;
  userId: string;
  name: string;
  password: string;
  phoneNumber: string;
  mail: string;
  authorities: string;
};

export const insertOperatorState = atom<InsertOperatorProps>({
  key: 'siteInformationState',
  default: {
    isInit: false,
    userId: '',
    name: '',
    password: '',
    phoneNumber: '',
    mail: '',
    authorities: '',
  },
});

export const insertOperatorSelector = selector<{ method: string }[]>({
  key: 'insertOperatorSelector',
  get: async ({ get }) => {
    let result: { method: string }[] = [];
    const param = _.cloneDeep(get(insertOperatorState));

    if (!param.isInit) {
      return result;
    }

    try {
      delete param.isInit;
      const { data, status }: AxiosResponse<OTAResponse<{ method: string }>> =
        await HttpClient.post('/operator', { user: param });
      result = data.result;
    } catch (error) {
      console.error(error);
    }

    return result;
  },
});
