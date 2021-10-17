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
import EventStatus from 'src/common/enum/event';

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

export const eventListSearchConditionState = atom<{
  fromDate?: string;
  toDate?: string;
  status?: EventStatus;
  code?: string;
  title?: string;
}>({
  key: 'eventListSearchConditionState',
  default: {
    fromDate: '',
    toDate: '',
    status: EventStatus.ALL,
    code: '',
    title: '',
  },
});

export const eventListPaginationState = atom({
  key: 'eventListPaginationState',
  default: {
    pageNumber: 0,
    returnCount: RETURN_COUNT,
  },
});

export const getEventListSelector = selectorFamily({
  key: 'getEventListSelector',
  get:
    ({ page, returnCount }: { page: number; returnCount: number }) =>
    async ({ get }) => {
      get(forcedReloadEventListState);
      const {
        fromDate,
        toDate,
        code,
        status: eventStatus,
        title,
      } = get(eventListSearchConditionState);
      const result: GetEventListSelectorType = {
        eventList: [],
      };
      try {
        const params = {
          currentPage: page,
          returnCount,
          fromDate,
          toDate,
          code,
          title,
          status: eventStatus,
        };
        eventStatus === EventStatus.ALL && delete params.status;
        const { data, status }: AxiosResponse<OTAResponse<EventVO>> =
          await HttpClient.get('/event', {
            params,
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
