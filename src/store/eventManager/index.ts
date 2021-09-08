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
import EventManagerVO from 'src/vo/EventManagerVO';

/**
 * Get Operator
 */
export interface GetEventManagerListSelectorType {
  eventManagerList: EventManagerVO[];
  pagination?: PaginationType;
}

export const forcedReloadEventManagerListState = atom<number>({
  key: 'forcedReloadEventManagerListState',
  default: 0,
});

export const eventManagerListPaginationState = atom({
  key: 'eventManagerListPaginationState',
  default: {
    pageNumber: 0,
    returnCount: RETURN_COUNT,
    // pageCount: 0,
    // itemCount: 0,
  },
});

export const getEventManagerListSelector = selectorFamily({
  key: 'getEventManagerListSelector',
  get:
    ({ page, returnCount }: { page: number; returnCount: number }) =>
    async ({ get }) => {
      get(forcedReloadEventManagerListState);
      const result: GetEventManagerListSelectorType = {
        eventManagerList: [],
      };
      try {
        const { data, status }: AxiosResponse<OTAResponse<EventManagerVO>> =
          await HttpClient.get('/operator', {
            params: { type: 1, currentPage: page, returnCount },
          });
        const responseData = new OTAResponse(data);
        responseData.mappingData(EventManagerVO);
        result.eventManagerList = responseData.result;

        if (responseData.reference) {
          result.pagination = responseData.reference;
        }
      } catch (error) {
        console.error(error);
      }

      return result;
    },
});
