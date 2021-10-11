import EventStatus from 'src/common/enum/event';
import DateUtils from 'src/common/utils/DateUtils';
import OnTheAirVO from 'src/vo/OnTheAirVO';

export type EventOption = {
  [key: string]: boolean;
};

export interface Event {
  ID: number;
  SERVER_ID?: number;
  SERVER_NAME?: string;
  CODE?: string;
  NUMBER_OF_PEOPLE?: number;
  STATUS?: number;
  DATE_OF_START?: string;
  TITLE?: string;
  ID_TEXT?: string;
  PASSWORD_TEXT?: string;
  JOB_TEXT?: string;

  BELONG_TO_TEXT?: string;
  LICENSE_NUMBER_TEXT?: string;
  SPECIALIST_NUMBER_TEXT?: string;
  SOCIETY_REQUEST_TEXT?: string;
  LOGIN_NOTICE?: string;
  PRE_REGISTRATION_TEXT?: string;
  INTRODUCTION_CONTENTS?: string;
  GIFT_CARD?: string;
  DATE_OF_CREATED?: string;
  DATE_OF_MODIFIED?: string;
  CREATOR?: string;

  OPTION_LIST: EventOption;

  USER_COUNT: number;

  [key: string]: any;
}

class EventVO extends OnTheAirVO implements Event {
  [key: string]: any;
  ID!: number;
  SERVER_ID?: number;
  SERVER_NAME?: string;
  CODE?: string;
  NUMBER_OF_PEOPLE?: number;
  STATUS?: number;
  DATE_OF_START?: string;
  TITLE?: string;
  ID_TEXT?: string;
  PASSWORD_TEXT?: string;
  JOB_TEXT?: string;
  BELONG_TO_TEXT?: string;
  LICENSE_NUMBER_TEXT?: string;
  SPECIALIST_NUMBER_TEXT?: string;
  SOCIETY_REQUEST_TEXT?: string;
  LOGIN_NOTICE?: string;
  PRE_REGISTRATION_TEXT?: string;
  INTRODUCTION_CONTENTS?: string;
  GIFT_CARD?: string;
  DATE_OF_CREATED?: string;
  DATE_OF_MODIFIED?: string;
  CREATOR?: string;

  OPTION_LIST!: EventOption;
  USER_COUNT = 0;

  constructor() {
    super();
  }

  get status() {
    switch (this.STATUS) {
      case EventStatus.PROGRESS:
        return '진행';
      case EventStatus.STOP:
        return '중지';
      case EventStatus.WAITING:
        return '대기';
    }

    return '-';
  }

  get dateOfStart() {
    const { DATE_OF_START } = this;

    if (DATE_OF_START) {
      return new DateUtils().format(DATE_OF_START);
    }

    return '-';
  }
}

export default EventVO;
