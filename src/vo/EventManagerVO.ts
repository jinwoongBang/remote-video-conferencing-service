import DateUtils from 'src/common/utils/DateUtils';
import OnTheAirVO from 'src/vo/OnTheAirVO';
import AuthorityVO from './AuthorityVO';

class EventManagerVO extends OnTheAirVO {
  ID!: number;
  EVENT_ID?: number;
  EVENT_TITLE?: string;
  EVENT_CODE?: string;
  STATUS?: number;
  USER_ID?: string;
  PASSWORD?: string;
  NAME?: string;
  PHONE_NUMBER?: string;
  EMAIL?: string;
  AUTHORITIES?: string;
  TYPE?: number;

  // read-only
  DATE_OF_CREATED?: string;
  LOG_COUNT?: number;
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
}

export default EventManagerVO;
