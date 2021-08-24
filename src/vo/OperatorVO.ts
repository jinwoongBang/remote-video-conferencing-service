import OnTheAirVO from 'src/vo/OnTheAirVO';

class OperatorVO extends OnTheAirVO {
  ID?: number;
  STATUS?: number;
  USER_ID?: string;
  NAME?: string;
  AUTHORITIES?: string;
  DATE_OF_CREATED?: Date;
  LOG_COUNT?: number;

  get AUTH_USER() {
    return 'true';
  }
}

export default OperatorVO;
