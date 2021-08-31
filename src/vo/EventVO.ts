import OnTheAirVO from 'src/vo/OnTheAirVO';

export interface EventVO {
  ID: number;
  SERVER_ID?: number;
  CODE?: string;
  NUMBER_OF_PEOPLE?: number;
  STATUS?: number;
  DATE_OF_STARTED?: string;
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
  [key: string]: any;
}

class EventVOImpl extends OnTheAirVO implements EventVO {
  [key: string]: any;
  ID!: number;
  SERVER_ID?: number;
  CODE?: string;
  NUMBER_OF_PEOPLE?: number;
  STATUS?: number;
  DATE_OF_STARTED?: string;
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

  constructor() {
    super();
  }
}

export default EventVOImpl;
