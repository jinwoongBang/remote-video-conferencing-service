import OnTheAirVO from 'src/vo/OnTheAirVO';

export interface EventOption {
  ID: number;
  EVENT_ID: number;
  OPTION_KEY: string;
  IS_USED?: number;
  DATE_OF_CREATED: number;
}

class EventOptionVO extends OnTheAirVO implements EventOption {
  ID!: number;
  EVENT_ID!: number;
  OPTION_KEY!: string;
  IS_USED?: number;
  DATE_OF_CREATED!: number;

  constructor() {
    super();
  }
}

export default EventOptionVO;
