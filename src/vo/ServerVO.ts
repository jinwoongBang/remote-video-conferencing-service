import OnTheAirVO from 'src/vo/OnTheAirVO';

class ServerVO extends OnTheAirVO {
  ID!: number;
  IP!: string;
  PORT?: string;
  NAME?: string;
  DESCRIPTION?: string;

  [key: string]: any;

  constructor() {
    super();
  }
}

export default ServerVO;
