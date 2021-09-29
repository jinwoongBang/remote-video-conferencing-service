import OnTheAirVO from './OnTheAirVO';

class ExcuteVO extends OnTheAirVO implements ResponseEntity {
  excute!: ExcuteType;

  constructor(excute: ExcuteType) {
    super();
    this.excute = excute;
  }
}

export default ExcuteVO;
