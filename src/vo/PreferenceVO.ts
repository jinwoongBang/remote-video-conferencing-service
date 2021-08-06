import OnTheAirVO from 'src/vo/OnTheAirVO';

interface Preference {
  ID: number;
  PID: number;
  NAME: string;
  PREFERENCE_KEY: string;
  PREFERENCE_VALUE: string;
  DATE_OF_CREATED: number;
  DATE_OF_MODIFIED: number;
  DESCRIPTION: string;
}

class PreferenceVO extends OnTheAirVO {
  id: number;
  pid: number;
  name: string;
  preferenceKey: string;
  preferenceValue: string;
  dateOfCreated: number;
  dateOfModified: number;
  description: string;

  constructor(data: Preference) {
    super();
    this.id = data.ID;
    this.pid = data.PID;
    this.name = data.NAME;
    this.preferenceKey = data.PREFERENCE_KEY;
    this.preferenceValue = data.PREFERENCE_VALUE;
    this.dateOfCreated = data.DATE_OF_CREATED;
    this.dateOfModified = data.DATE_OF_MODIFIED;
    this.description = data.DESCRIPTION;
  }
}

export default PreferenceVO;
