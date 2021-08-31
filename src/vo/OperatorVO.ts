import DateUtils from 'src/common/utils/DateUtils';
import OnTheAirVO from 'src/vo/OnTheAirVO';
import AuthorityVO from './AuthorityVO';

class OperatorVO extends OnTheAirVO {
  ID!: number;
  STATUS?: number;
  USER_ID?: string;
  PASSWORD?: string;
  NAME?: string;
  PHONE_NUMBER?: string;
  EMAIL?: string;
  AUTHORITIES?: string;
  DATE_OF_CREATED?: string;
  LOG_COUNT?: number;
  PREFERENCE_ROLE!: boolean;
  USER_ROLE!: boolean;
  EVENT_ROLE!: boolean;
  SPECIAL_ROLE!: boolean;
  [key: string]: any;

  constructor() {
    super();
  }

  get dateOfCreated() {
    const { DATE_OF_CREATED } = this;

    if (DATE_OF_CREATED) {
      return new DateUtils().format(DATE_OF_CREATED);
    }

    return '-';
  }

  createAuthorityIdList(
    authorityList: AuthorityVO[],
    checkedList: { [key: string]: boolean },
  ) {
    const authKeyList = Object.keys(checkedList);
    const authIdList: number[] = [];

    authKeyList.forEach((authKey) => {
      const hasAuth = checkedList[authKey];

      if (hasAuth) {
        const auth = authorityList.find(
          ({ AUTHORITY_KEY }) => AUTHORITY_KEY === authKey,
        );
        const authId = auth?.ID;
        authId && authIdList.push(authId);
      }
    });

    return authIdList.join('-');
  }
}

export default OperatorVO;
