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
import EventVO from 'src/vo/EventVO';

/**
 * Get Event
 */
export interface GetEventListSelectorType {
  eventList: EventVO[];
  pagination?: PaginationType;
}

export const forcedReloadEventListState = atom<number>({
  key: 'forcedReloadEventListState',
  default: 0,
});

export const eventListPaginationState = atom({
  key: 'eventListPaginationState',
  default: {
    pageNumber: 0,
    returnCount: RETURN_COUNT,
    // pageCount: 0,
    // itemCount: 0,
  },
});

export const getEventListSelector = selectorFamily({
  key: 'getEventListSelector',
  get:
    ({ page, returnCount }: { page: number; returnCount: number }) =>
    async ({ get }) => {
      get(forcedReloadEventListState);
      const result: GetEventListSelectorType = {
        eventList: [],
      };
      try {
        const { data, status }: AxiosResponse<OTAResponse<EventVO>> =
          await HttpClient.get('/event', {
            params: { type: 1, currentPage: page, returnCount },
          });
        const responseData = new OTAResponse(data);
        responseData.mappingData(EventVO);
        result.eventList = responseData.result;

        if (responseData.reference) {
          result.pagination = responseData.reference;
        }
      } catch (error) {
        console.error(error);
      }

      return result;
    },
});
