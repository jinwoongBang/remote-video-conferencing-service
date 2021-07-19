export interface OnTheAirResponse<T> {
  success: boolean;
  result: T[];
}

export default class OTAResponse<T> implements OnTheAirResponse<T> {
  success!: boolean;
  result!: T[];

  constructor() {
    this.success = true;
    this.result = [];
  }
}
