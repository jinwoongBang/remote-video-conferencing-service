import { AxiosResponse } from 'axios';
import { atom, selector, selectorFamily, useResetRecoilState } from 'recoil';
import * as _ from 'lodash';

/**
 * Common
 */
import HttpClient from 'src/common/framework/HttpClient';
import OTAResponse from 'src/common/framework/OTAResponse';
import { PaginationType, RETURN_COUNT } from 'src/common/enum/pagination';
import { UserType } from 'src/common/enum/user';

/**
 * Service
 */
import { InsertOperatorParam } from 'src/service/OperatorService';
import { User } from 'src/vo';
import OnTheAirVO from 'src/vo/OnTheAirVO';
import OperatorVO from 'src/vo/OperatorVO';
import { OperatorResponseEntity } from 'src/pages/api/operator';

export const insertOperatorState = atom<InsertOperatorState>({
  key: 'insertOperatorState',
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

export const insertOperatorSelector = selector({
  key: 'insertOperatorSelector',
  get: async ({ get }) => {
    let result: { method: string }[] = [];
    const param = get(insertOperatorState);

    if (!param.isInit) {
      return result;
    }

    try {
      const operator = new OperatorVO();
      operator.USER_ID = param.userId;
      operator.NAME = param.name;
      operator.PASSWORD = param.password;
      operator.PHONE_NUMBER = param.phoneNumber;
      operator.EMAIL = param.mail;
      operator.AUTHORITIES = param.authorities;
      operator.TYPE = UserType.OPERATOR;

      const { data, status }: AxiosResponse<OTAResponse<{ method: string }>> =
        await HttpClient.post('/operator', { user: operator });
      result = data.result;
    } catch (error) {
      console.error(error);
    }

    return result;
  },
});

/**
 * Get Operator
 */
export interface GetOperatorListSelectorType {
  operatorList: OperatorVO[];
  pagination?: PaginationType;
}

export const forcedReloadOperatorListState = atom<number>({
  key: 'forcedReloadOperatorListState',
  default: 0,
});

export const operatorListPaginationState = atom({
  key: 'operatorListPaginationState',
  default: {
    pageNumber: 0,
    returnCount: RETURN_COUNT,
    // pageCount: 0,
    // itemCount: 0,
  },
});

export const getOperatorListSelector = selectorFamily({
  key: 'getOperatorListSelector',
  get:
    ({ page, returnCount }: { page: number; returnCount: number }) =>
    async ({ get }) => {
      get(forcedReloadOperatorListState);
      const result: GetOperatorListSelectorType = {
        operatorList: [],
      };
      try {
        const { data, status }: AxiosResponse<OTAResponse<OperatorVO>> =
          await HttpClient.get('/operator', {
            params: { type: 2, currentPage: page, returnCount },
          });
        const responseData = new OTAResponse(data);
        responseData.mappingData(OperatorVO);
        result.operatorList = responseData.result;

        if (responseData.reference) {
          result.pagination = responseData.reference;
        }
      } catch (error) {
        console.error(error);
      }

      return result;
    },
});
