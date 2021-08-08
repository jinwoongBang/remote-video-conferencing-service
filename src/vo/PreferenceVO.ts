import OnTheAirVO from 'src/vo/OnTheAirVO';

interface Preference {
  ID: number;
  PID?: number;
  NAME: string;
  PREFERENCE_KEY: string;
  PREFERENCE_VALUE: string;
  DATE_OF_CREATED: number;
  DATE_OF_MODIFIED?: number;
  DESCRIPTION?: string;
}

class PreferenceVO extends OnTheAirVO implements Preference {
  ID!: number;
  PID?: number;
  NAME!: string;
  PREFERENCE_KEY!: string;
  PREFERENCE_VALUE!: string;
  DATE_OF_CREATED!: number;
  DATE_OF_MODIFIED?: number;
  DESCRIPTION?: string;

  constructor() {
    super();
  }
}

export default PreferenceVO;
