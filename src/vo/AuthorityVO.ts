import OnTheAirVO from 'src/vo/OnTheAirVO';

interface Authority {
  ID: number;
  NAME?: string;
  AUTHORITY_KEY: string;
  IS_DELETED: number;
  DATE_OF_CREATED: number;
  DATE_OF_MODIFIED?: number;
  DATE_OF_DELETED?: number;
}

class AuthorityVO extends OnTheAirVO implements Authority {
  ID!: number;
  NAME?: string;
  AUTHORITY_KEY!: string;
  IS_DELETED!: number;
  DATE_OF_CREATED!: number;
  DATE_OF_MODIFIED?: number;
  DATE_OF_DELETED?: number;

  constructor() {
    super();
  }
}

export default AuthorityVO;
