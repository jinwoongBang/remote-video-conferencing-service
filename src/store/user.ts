// import { AxiosResponse } from 'axios';
import { AxiosResponse } from 'axios';
import { atom, selector, selectorFamily } from 'recoil';
import * as _ from 'lodash';

/**
 * Common
 */
import HttpClient from 'src/common/framework/HttpClient';
import OTAResponse from 'src/common/framework/OTAResponse';

import { User } from 'src/vo/UserVO';

export interface UserSearch {
  userId?: string;
  name?: string;
  phoneNumber?: string;
  eventCode?: string;
  eventName?: string;
  status?: string;
}

//가입 날짜
//상태 - 심사중 활동 정지
//이벤트명
//이벤트코드
//검색어 - 회원명, 회원아이디, 핸드폰 번호
//검색버튼 - 검색, 초기화, 엑셀
export const userSearchState = atom<UserSearch>({
  key: 'userSearchState',
  default: {
    userId: '',
    name: '',
  },
});

export const forceReloadUserListState = atom({
  key: 'forceReloadUserListState',
  default: 0,
});

export const userListSelector = selector({
  key: 'userListSelector',
  get: async ({ get }) => {
    get(forceReloadUserListState);
    const searchParams = get(userSearchState);
    console.log('userListSelector: ' + searchParams.userId);
    const { data, status }: AxiosResponse<OTAResponse<User>> =
      await HttpClient.get('/user', {
        params: searchParams,
      });

    return data;
  },
  set: ({ set }) => {
    set(forceReloadUserListState, Math.random());
  },
});
