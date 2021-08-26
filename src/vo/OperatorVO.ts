import DateUtils from 'src/common/utils/DateUtils';
import OnTheAirVO from 'src/vo/OnTheAirVO';

class OperatorVO extends OnTheAirVO {
  ID?: number;
  STATUS?: number;
  USER_ID?: string;
  NAME?: string;
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
}

export default OperatorVO;
