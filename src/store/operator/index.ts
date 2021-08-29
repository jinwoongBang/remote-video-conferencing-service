import { AxiosResponse } from 'axios';
import { atom, selector, selectorFamily, useResetRecoilState } from 'recoil';
import * as _ from 'lodash';

/**
 * Common
 */
import HttpClient from 'src/common/framework/HttpClient';
import OTAResponse, {
  PaginationType,
  ReferenceType,
} from 'src/common/framework/OTAResponse';

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

/**
 * Get Operator
 */
export const OperatorListPaginationState = atom<number>({
  key: 'OperatorListPaginationState',
  default: 0,
});

export const forcedReloadOperatorListState = atom<Date>({
  key: 'forcedReloadOperatorListState',
  default: new Date(),
});
export interface GetOperatorListSelectorType {
  operatorList: OperatorVO[];
  pagination?: PaginationType;
}
export const getOperatorListSelector = selectorFamily({
  key: 'getOperatorListSelector',
  get:
    ({ page, returnCount }: { page: number; returnCount: number }) =>
    async ({ get }) => {
      const result: GetOperatorListSelectorType = {
        operatorList: [],
      };
      try {
        const { data, status }: AxiosResponse<OTAResponse<OperatorVO>> =
          await HttpClient.get('/operator', {
            params: { currentPage: page, returnCount },
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

/**
 * Delete Operator
 */
export const deleteOperatorSelector = selectorFamily({
  key: 'deleteOperatorSelector',
  get:
    ({ id }: { id: number }) =>
    async ({ get }) => {
      let result = 0;

      try {
        const {
          data,
          status,
        }: AxiosResponse<OTAResponse<OperatorResponseEntity>> =
          await HttpClient.delete('/operator', {
            params: { id },
          });
        const responseData = new OTAResponse<OperatorResponseEntity>(data);
        result = responseData.result.length;
      } catch (error) {
        console.error(error);
      }

      return result;
    },
});
